# React PoseNet

React PoseNet is a handy wrapper component for [tfjs-models/posenet](https://github.com/tensorflow/tfjs-models/tree/master/posenet)

## Documentation

https://react-posenet.yoyota.dev

## Example

[pull up counter](https://github.com/yoyota/react-posenet-pull-up)  
<img src="https://i.imgur.com/xTP8Otx.gif" width=300 height=300 />

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

### [onEstimate](https://react-posenet.yoyota.dev/#/Props%20examples?id=section-onestimate)

gets called after estimation. [poses](https://github.com/tensorflow/tfjs-models/tree/master/posenet#keypoints) is a passed parameter  

### [input](https://react-posenet.yoyota.dev/#/Props%20examples?id=section-input)
the input image to feed through the network. see
[tfjs-posenet document](https://github.com/tensorflow/tfjs-models/tree/master/posenet#params-in-estimatesinglepose)  
If input is not specified react-posenet try to [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)  