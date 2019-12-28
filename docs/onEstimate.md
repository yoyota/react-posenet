If your device dose not have camera, you will see error message like  
<font color="red">Requested device not found</font>

```jsx
import { useState } from "react"
import PoseNet from "react-posenet"

const [posesString, setPosesString] = useState([])

;<>
  <PoseNet
    inferenceConfig={{ decodingMethod: "single-person" }}
    onEstimate={poses => {
      setPosesString(JSON.stringify(poses))
    }}
  />
  <p>{posesString}</p>
</>
```
