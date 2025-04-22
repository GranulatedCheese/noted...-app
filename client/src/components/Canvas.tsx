import { ReactSketchCanvas } from "react-sketch-canvas";
import "../styles/canvas.css";

export default function Canvas() {
  return (
    <div>
      <ReactSketchCanvas
        width="100%"
        canvasColor="transparent"
        strokeColor="#a855f7"
      />
    </div>
  );
}
