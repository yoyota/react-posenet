import React, { useRef, useState, useEffect } from "react"
import PropTypes from "prop-types"
import useInputImage from "../hooks/useInputImage"

export default function PoseNet({
  id,
  className,
  facingMode,
  frameRate,
  input,
  onEstimate,
  width,
  height
}) {
  const videoRef = useRef()
  const canvasRef = useRef()
  const [errorMessage, setErrorMessage] = useState()
  const onEstimateRef = useRef()
  onEstimateRef.current = onEstimate
  const image = useInputImage({
    input,
    width,
    height,
    videoRef,
    facingMode,
    frameRate
  })

  useEffect(() => {
    // if (!net || !image) return () => {}
    // if ([net, image].some(elem => elem instanceof Error)) return () => {}
    if (!image) return () => {}

    const ctx = canvasRef.current.getContext("2d")
    const intervalID = setInterval(async () => {
      try {
        // const poses = await net.estimatePoses(image, inferenceConfigRef.current)
        ctx.drawImage(image, 0, 0, width, height)
        // onEstimateRef.current(confidentPoses)
        // confidentPoses.forEach(({ keypoints }) => drawKeypoints(ctx, keypoints))
      } catch (err) {
        clearInterval(intervalID)
        setErrorMessage(err.message)
      }
    }, Math.round(1000 / frameRate))

    return () => clearInterval(intervalID)
  }, [frameRate, height, image, width])
  return (
    <>
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

PoseNet.propTypes = {
  /** canvas id */
  id: PropTypes.string,
  /** canvas className */
  className: PropTypes.string,
  /** @see https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode  */
  facingMode: PropTypes.string,
  /** First of all frameRate is parameter of [getUserMedia()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
   *  see [MediaTrackConstraints.frameRate](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/frameRate)
   *  <br/>
   *  second frameRate affects how often estimation occurs. react-posenet internally <br/>
   *  [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval)(() => { estimatePose() } , (1000 / framerate))
   *  to estimate image continuously */
  frameRate: PropTypes.number,
  /**
   * the input image to feed through the network. <br/>
   * If input is not specified react-posenet try to [getUserMedia](https:/developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)<br/>
   * @see [tfjs-posenet document](https://github.com/tensorflow/tfjs-models/tree/master/posenet#params-in-estimatesinglepose)
   */
  input: PropTypes.element,
  /**
   * gets called after estimation. [poses](https://github.com/tensorflow/tfjs-models/tree/master/posenet#keypoints) is a passed parameter
   */
  onEstimate: PropTypes.func,
  width: PropTypes.number,
  /** canvas height */
  height: PropTypes.number
}

PoseNet.defaultProps = {
  id: "",
  className: "",
  facingMode: "user",
  frameRate: 20,
  input: undefined,
  onEstimate: () => {},
  width: 600,
  height: 500
}
