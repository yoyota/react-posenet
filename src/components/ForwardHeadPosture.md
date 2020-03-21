If your device dose not have camera, you will see error message like  
<font color="red">Requested device not found</font>

```jsx
import React, { useState } from "react"

const [score, setScore] = useState(0)

;<>
  <h1 className={score < 0 ? "text-danger" : ""}>score: {Math.round(score)}</h1>
  <ForwardHeadPosture
    style={{ width: "100%" }}
    onEstimate={setScore}
    frameRate={30}
  />
</>
```
