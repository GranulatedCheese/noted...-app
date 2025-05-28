import React, { useRef, useState, useEffect, ChangeEvent } from "react";
import {
  type ReactSketchCanvasRef,
  ReactSketchCanvas,
} from "react-sketch-canvas";
import {
  FiEdit2,
  FiMinusSquare,
  FiChrome,
  FiCornerUpLeft,
  FiCornerUpRight,
  FiRefreshCcw,
} from "react-icons/fi";
import "./canvas.css";
import { base64ToBlob } from "../../utils/Base64Blob";
import Loading from "../../components/LoadingComponent/Loading";
import { Buffer } from "buffer";
import useAuth from "../../hooks/useAuth";

const iconSize = 40;

export default function Canvas() {
  const auth = useAuth();
  const API_URL = auth.API_URL;

  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [isVisible, setIsVisible] = useState(false);

  type MenuType = "color" | "stroke" | "eraser" | null;
  const [isMenuOpen, setIsMenuOpen] = useState<MenuType>(null);

  const [strokeColor, setStrokeColor] = useState("#f0be0c");
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [eraserWidth, setEraserWidth] = useState(10);

  const handleStrokeColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStrokeColor(event.target.value);
  };

  const handleStrokeWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStrokeWidth(+event.target.value);
  };

  const handleEraserWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEraserWidth(+event.target.value);
  };

  const toggleMenu = (menuName: MenuType) => {
    setIsMenuOpen((prevMenu) => (prevMenu === menuName ? null : menuName));
  };

  const handleColorWheel = () => {
    toggleMenu("color");
  };

  const handleEraserClick = () => {
    canvasRef.current?.eraseMode(true);
    toggleMenu("eraser");
  };

  const handlePenClick = () => {
    canvasRef.current?.eraseMode(false);
    toggleMenu("stroke");
  };

  const handleUndoClick = () => {
    canvasRef.current?.undo();
  };

  const handleRedoClick = () => {
    canvasRef.current?.redo();
  };

  const handleClearClick = () => {
    canvasRef.current?.clearCanvas();
  };

  const toolbarClasses = `
  fixed left-[20%] md:left-[50%] top-0 transform -translate-x-1/2
  transition-all duration-300 delay-75 ease-in-out
  ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
`;

  const radiusRef = useRef(300);

  useEffect(() => {
    if (!isVisible) {
      setIsMenuOpen(null);
    }
  }, [isVisible]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY;
      const dist = Math.hypot(dx, dy);

      setIsVisible(dist < radiusRef.current);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleImageSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    auth.setIsLoading(true);

    const fileExt: any = "png";

    if (canvasRef.current) {
      try {
        const imageDataUrl: string = await canvasRef.current.exportImage(
          fileExt
        ); // Save image as base64

        // Splits ImageDataURL into 2 parts. "data:image/${fileExt};base64" and "ygsz=="
        const imageParts: string[] = imageDataUrl.split(",");
        if (
          imageParts.length !== 2 ||
          !imageParts[0]
            .toLowerCase()
            .startsWith(`data:image/${fileExt};base64`)
        ) {
          console.error("Invalid data URL:", imageDataUrl);
          throw new Error(
            `Invalid data URL format: Expected 'data:image/${fileExt};base64,...'`
          );
        }

        // Using buffer because atob never worked
        const imageBase64: string = Buffer.from(
          imageParts[1],
          "base64"
        ).toString("binary");

        const imageBlob: Blob = base64ToBlob(imageBase64, `image/${fileExt}`);
        if (!imageBlob) {
          throw new Error("Failed to create Blob from image data.");
        }

        const formData = new FormData();
        formData.append("file", imageBlob, `canvas_sketch.${fileExt}`);

        const response = await fetch(`${API_URL}/images/upload`, {
          // Requires binary form data
          method: "POST",
          body: formData,
        });
        auth.setIsLoading(false);

        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            "Error uploading image...",
            response.status,
            response.statusText,
            errorText
          );
          return;
        }
      } catch (error) {
        auth.setIsLoading(false);
        console.error("Client-side error:", error);
      }
    }
  };

  return (
    <div>
      {auth.isLoading && <Loading />}
      <div
        className={toolbarClasses.trim()}
        style={{ pointerEvents: isVisible ? "auto" : "none" }}
      >
        <div className="toolbar-div">
          <button type="button" onClick={handlePenClick}>
            <FiEdit2 size={iconSize} />
          </button>

          <button type="button" onClick={handleEraserClick}>
            <FiMinusSquare size={iconSize} />
          </button>

          <button type="button" onClick={handleColorWheel}>
            <FiChrome size={iconSize} />
          </button>

          <button type="button" onClick={handleUndoClick}>
            <FiCornerUpLeft size={iconSize} />
          </button>

          <button type="button" onClick={handleRedoClick}>
            <FiCornerUpRight size={iconSize} />
          </button>

          <button type="button" onClick={handleClearClick}>
            <FiRefreshCcw size={iconSize} />
          </button>
        </div>

        {isMenuOpen === "color" && (
          <input
            type="color"
            value={strokeColor}
            onChange={handleStrokeColorChange}
            className="flex justify-self-center mr-1"
          />
        )}

        {isMenuOpen === "eraser" && (
          <input
            type="range"
            min="1"
            max="20"
            step="1"
            value={eraserWidth}
            onChange={handleEraserWidthChange}
            className="fixed left-16 mx-1"
          />
        )}

        {isMenuOpen === "stroke" && (
          <input
            type="range"
            min="1"
            max="20"
            step="1"
            value={strokeWidth}
            onChange={handleStrokeWidthChange}
            className="flex justify-self-start ml-1"
          />
        )}
      </div>

      <div>
        <ReactSketchCanvas
          canvasColor="transparent"
          width="100%"
          height="100vh"
          ref={canvasRef}
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
          eraserWidth={eraserWidth}
        />
        <button
          className="fixed left-0 bottom-0 z-1000 m-10 text-2xl p-3 rounded-full bg-black/50"
          onClick={(e) => handleImageSubmit(e)}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
