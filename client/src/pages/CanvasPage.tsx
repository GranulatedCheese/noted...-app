import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import React, { useRef } from "react";

export default function CanvasPage() {
  console.log("🧠 Submit button clicked");
  const API_URL = "http://localhost:8000";

  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  const handleSubmit = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const base64Data = await canvas.exportImage("png");

      // Fix: convert base64 directly to Blob
      const base64 = base64Data.split(",")[1];
      const binary = atob(base64);
      const array = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        array[i] = binary.charCodeAt(i);
      }
      const blob = new Blob([array], { type: "image/png" });

      const formData = new FormData();
      formData.append("file", blob, "sketch.png");

      const response = await fetch(`${API_URL}/process`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("✅ Image successfully sent to backend!");
      } else {
        console.error("❌ Server Error:", await response.text());
      }
    } catch (error) {
      console.error("❌ Export failed:", error);
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
