#### PoseNet

```jsx
import { useState } from "react";
import PoseNet from "react-posenet";

const [posesString, setPosesString] = useState([]);

<>
  <PoseNet
    inferenceConfig={{ decodingMethod: "single-person" }}
    onEstimate={poses => {
      setPosesString(JSON.stringify(poses));
    }}
  />
  <p>{posesString}</p>
</>;
```

<!-- #### PoseNet with image prop

````jsx
import { useState } from "react";
import PoseNet from "react-posenet";

function getVideo() {
  const src = "https://i.imgur.com/EjsdjeQ.mp4";
  const video = document.createElement("video");
  video.src = src;
  video.muted = true;
  video.autoplay = true;
  video.loop = true;
  video.crossOrigin = "";
  return video;
}

const [video] = useState(getVideo());

<PoseNet image={video} />;
```` -->
