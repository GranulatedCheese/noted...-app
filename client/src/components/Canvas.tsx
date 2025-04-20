import { ReactSketchCanvas } from "react-sketch-canvas";

export default function Canvas() {
  return (
    <div>
      <ReactSketchCanvas
        width="100%"
        height="150px"
        canvasColor="transparent"
        strokeColor="#a855f7"
      />
    </div>
  );
}
