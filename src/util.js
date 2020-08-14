

export function getMediaStreamConstraints(facingMode, frameRate) {
  return {
    audio: false,
    video: {
      facingMode,
      frameRate
    }
  }
}

export function getConfidentPoses(poses, minPoseConfidence) {
  return poses
    .filter(({ score }) => score > minPoseConfidence)
   // .map(pose => ({
    //...pose,
   //  keypoints: pose.keypoints.filter(({ score }) => score > minPartConfidence)
   // }))
}

// Draws lines between points of the body to form a wire-frame of sorts to better understand the poses
export function drawSegment([ay, ax], [by, bx], color, scale, ctx) {
  ctx.beginPath();
  ctx.moveTo(ax * scale, ay * scale);
  ctx.lineTo(bx * scale, by * scale);
  ctx.lineWidth = 3;
  ctx.strokeStyle = color;
  ctx.stroke();

}

const MIN_CONFIDENCE = .2;

export function drawKeypoints(ctx, keypoints) {
  const minConfidence = MIN_CONFIDENCE;
  const adjacentKeyPoints = getAdjacentKeyPoints(keypoints, minConfidence);
  keypoints.forEach(({ position }) => {
    const { x, y } = position

    ctx.beginPath()
    ctx.arc(x, y, 5, 0, 2 * Math.PI, false)
    ctx.fillStyle = "aqua"
    ctx.fill()
  })


  adjacentKeyPoints.forEach((keypoints) => {
    drawSegment(
        toTuple(keypoints[0].position), toTuple(keypoints[1].position), 'aqua',
        1, ctx);
  });
}
// these arrays of part names can be used in the future to add labels to the parts in real-time
export const partNames = [
  'nose', 'leftEye', 'rightEye', 'leftEar', 'rightEar', 'leftShoulder',
  'rightShoulder', 'leftElbow', 'rightElbow', 'leftWrist', 'rightWrist',
  'leftHip', 'rightHip', 'leftKnee', 'rightKnee', 'leftAnkle', 'rightAnkle'
];

const connectedPartNames = [
  ['leftHip', 'leftShoulder'], ['leftElbow', 'leftShoulder'],
  ['leftElbow', 'leftWrist'], ['leftHip', 'leftKnee'],
  ['leftKnee', 'leftAnkle'], ['rightHip', 'rightShoulder'],
  ['rightElbow', 'rightShoulder'], ['rightElbow', 'rightWrist'],
  ['rightHip', 'rightKnee'], ['rightKnee', 'rightAnkle'],
  ['leftShoulder', 'rightShoulder'], ['leftHip', 'rightHip']
];

export const partIds =
  partNames.reduce((result, jointName, i) => {
    result[jointName] = i;
    return result;
  }, {});
//mapping the parts to their ids to be later used to draw the segments
const connectedPartIndices = connectedPartNames.map(
  ([jointNameA, jointNameB]) => ([partIds[jointNameA], partIds[jointNameB]]));

//function to get the adjacentPoints 
export function getAdjacentKeyPoints(keypoints, minConfidence) {
  return connectedPartIndices.reduce(
    (result, [leftJoint, rightJoint]) => {
      if (eitherPointDoesntMeetConfidence(
              keypoints[leftJoint].score, keypoints[rightJoint].score,
              minConfidence)) {
        return result;
      }

      result.push([keypoints[leftJoint], keypoints[rightJoint]]);

      return result;
    }, []);
}


function eitherPointDoesntMeetConfidence(
  a, b, minConfidence) {
  return (a < minConfidence || b < minConfidence);
}

function toTuple({y, x}) {
  return [y, x];
}
