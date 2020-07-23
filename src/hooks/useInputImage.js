import { useState, useEffect } from "react"
import { useUserMediaVideo } from "use-user-media"
import { getMediaStreamConstraints } from "../util"

export default function useInputImage({
  input,
  width,
  height,
  facingMode,
  frameRate
}) {
  const [image, setImage] = useState()
  const userMediaDisabled = typeof input === "object"
  const constraints = userMediaDisabled
    ? { video: false, audio: false }
    : getMediaStreamConstraints(facingMode, frameRate)
  const [userMediaError, video] = useUserMediaVideo(constraints)

  useEffect(() => {
    if (userMediaDisabled) {
      input.width = width
      input.height = height
      setImage(input)
      return
    }
    if (userMediaError) {
      setImage(userMediaError)
      return
    }
    if (video) {
      video.width = width
      video.height = height
      setImage(video)
    }
  }, [userMediaDisabled, userMediaError, height, input, video, width])
  return image
}
