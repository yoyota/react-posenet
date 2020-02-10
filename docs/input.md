```jsx
import { useMemo } from "react"
import PoseNet from "react-posenet"

const input = useMemo(() => {
  const image = new Image()
  image.crossOrigin = ""
  image.src = "https://i.imgur.com/oV2ZNuD.jpg"
  return image
}, [])

;<PoseNet input={input} />
```
