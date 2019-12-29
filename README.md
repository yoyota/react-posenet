# React PoseNet

React PoseNet is a handy wrapper component for [tfjs-models/posenet](https://github.com/tensorflow/tfjs-models/tree/master/posenet)

## Documentation
examples are editable  
https://react-posenet.yoyota.dev

## Installation

```bash
npm install --save react-posenet
```

### Usage

```jsx
import PoseNet from "react-posenet"

export default function App() {
  return <PoseNet />
}
```

## Core Feautres

### onEstimate

callback will be called after estimation. returned output [poses](https://github.com/tensorflow/tfjs-models/tree/master/posenet#keypoints) is a parameter

### input

one of ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement [tfjs-posenet document](https://github.com/tensorflow/tfjs-models/tree/master/posenet#params-in-estimatesinglepose)  

If input is not specified react-posenet try to [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)