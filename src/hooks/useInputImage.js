import to from "await-to-js"
import { useState, useEffect } from "react"
import { checkUserMediaError, getMediaStreamConstraints } from "../util"

export default function useInputImage({
  input,
  width,
  height,
  videoRef,
  facingMode,
  frameRate
}) {
  const [image, setImage] = useState()
  useEffect(() => {
    if (typeof input === "object") {
      input.width = width
      input.height = height
    }
    if (input) {
      setImage(input)
      return () => {}
    }
    if (!videoRef.current) {
      return () => {}
    }
    const userMediaError = checkUserMediaError()
    if (userMediaError) {
      setImage(userMediaError)
      return () => {}
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
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const stream = videoRef.current.srcObject
      stream.getTracks().forEach(track => track.stop())
    }
  }, [facingMode, frameRate, height, input, videoRef, width])
  return image
}
