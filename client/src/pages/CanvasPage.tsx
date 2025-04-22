import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import React, { useRef } from "react";

export default function CanvasPage() {
  const API_URL = "http://localhost:8000";

  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  const handleSubmit = async () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    try {
      const base64Data = await canvas.exportImage("png");

      const res = await fetch(base64Data);
      const blob = await res.blob();

      const formData = new FormData();
      formData.append("file", blob, "sketch.png");

      const response = await fetch(`${API_URL}/process`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
      } else {
        console.error("Server Error:", await response.text());
      }
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Canvas Notes</h1>
      <ReactSketchCanvas
        ref={canvasRef}
        strokeWidth={3}
        strokeColor="black"
        width="100%"
        height="400px"
        style={{ border: "1px solid #ccc" }}
      />
      <button
        onClick={handleSubmit}
        className="mt-4 p-2 bg-blue-600 text-white rounded hover:-translate-1"
      >
        Save & Convert
      </button>
    </div>
  );
}
