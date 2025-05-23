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
} from "react-icons/fi";
import "./canvas.css";

const iconSize = 30;
const API_URL = "http://localhost:8000/api";

export default function Canvas() {
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

  return (
    <div>
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
        <button>Submit</button>
      </div>
    </div>
  );
}
