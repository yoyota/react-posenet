import React, { useRef, useState, useEffect } from "react"
import to from "await-to-js"
import Loading from "./Loading"
import useLoadPoseNet from "../hooks/useLoadPoseNet"
import {
  checkUserMediaError,
  drawKeypoints,
  getConfidentPoses,
  getMediaStreamConstraints
} from "../util"

export default function PoseNet({
  id = "",
  className = "",
  facingMode = "user",
  frameRate = 20,
  input = undefined,
  onEstimate = () => {},
  inferenceConfig = {},
  modelConfig = {},
  minPoseConfidence = 0.1,
  minPartConfidence = 0.5,
  width = 600,
  height = 500
}) {
  const videoRef = useRef()
  const canvasRef = useRef()
  const net = useLoadPoseNet(modelConfig)
  const [image, setImage] = useState()
  const [errorMessage, setErrorMessage] = useState()

  const onEstimateRef = useRef()
  const inferenceConfigRef = useRef()
  onEstimateRef.current = onEstimate
  inferenceConfigRef.current = inferenceConfig

  useEffect(() => {
    if (typeof input === "object") {
      input.width = width
      input.height = height
    }
    if (input) {
      setImage(input)
      return
    }
    if (!videoRef.current) return
    const userMediaError = checkUserMediaError()
    if (userMediaError) {
      setImage(userMediaError)
      return
    }
    async function setupCamera() {
      const [err, stream] = await to(
        navigator.mediaDevices.getUserMedia(
          getMediaStreamConstraints(facingMode, frameRate)
        )
      )
      if (err) {
        setImage(err)
        return
      }
      const video = videoRef.current
      video.srcObject = stream
      video.onloadedmetadata = () => {
        video.play()
        setImage(video)
      }
    }
    setupCamera()
  }, [facingMode, frameRate, height, input, width])

  useEffect(() => {
    if (!net || !image) return () => {}
    if ([net, image].some(elem => elem instanceof Error)) return () => {}

    const ctx = canvasRef.current.getContext("2d")
    const intervalID = setInterval(async () => {
      try {
        const date = new Date()
        const poses = await net.estimatePoses(image, inferenceConfigRef.current)
        const confidentPoses = getConfidentPoses(
          poses,
          minPoseConfidence,
          minPartConfidence
        )
        ctx.drawImage(image, 0, 0, width, height)
        onEstimateRef.current(confidentPoses, date)
        confidentPoses.forEach(({ keypoints }) => drawKeypoints(ctx, keypoints))
      } catch (err) {
        clearInterval(intervalID)
        setErrorMessage(err.message)
      }
    }, Math.round(1000 / frameRate))

    return () => clearInterval(intervalID)
  }, [
    frameRate,
    height,
    image,
    minPartConfidence,
    minPoseConfidence,
    net,
    width
  ])

  return (
    <>
      <Loading name="model" target={net} />
      <Loading name="input" target={image} />
      <font color="red">{errorMessage}</font>
      <div>
        <video
          playsInline
          ref={videoRef}
          style={{ width: "0", height: "0" }}
          width={width}
          height={height}
        />
        <canvas
          ref={canvasRef}
          id={id}
          className={className}
          width={width}
          height={height}
        />
      </div>
    </>
  )
}
