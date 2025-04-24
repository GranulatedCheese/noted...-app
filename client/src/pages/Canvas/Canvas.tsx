import React, { useRef, useState, useEffect, ChangeEvent } from "react";
import {
  type ReactSketchCanvasRef,
  ReactSketchCanvas,
} from "react-sketch-canvas";
import { FiEdit2, FiMinusSquare, FiChrome } from "react-icons/fi";
import "./canvas.css";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function Canvas() {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [isColorWheelOpen, setIsColorWheelOpen] = useState(false);
  const [isStrokeMenuOpen, setIsStrokeMenuOpen] = useState(false);
  const [isEraserMenuOpen, setIsEraserMenuOpen] = useState(false);

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

  const closeAllMenus = () => {
    setIsColorWheelOpen(false);
    setIsEraserMenuOpen(false);
    setIsStrokeMenuOpen(false);
  };

  const handleColorWheel = () => {
    setIsColorWheelOpen(!isColorWheelOpen);
    setIsEraserMenuOpen(false);
    setIsStrokeMenuOpen(false);
  };

  const handleEraserClick = () => {
    setIsEraserMenuOpen(!isEraserMenuOpen);
    setIsStrokeMenuOpen(false);
    setIsColorWheelOpen(false);
    canvasRef.current?.eraseMode(true);
  };

  const handlePenClick = () => {
    setIsEraserMenuOpen(false);
    setIsStrokeMenuOpen(!isStrokeMenuOpen);
    setIsColorWheelOpen(false);
    canvasRef.current?.eraseMode(false);
  };

  const radiusRef = useRef(300);

  useEffect(() => {
    if (!isVisible) {
      closeAllMenus();
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

  const iconSize = 30;

  return (
    <div>
      <div
        className={
          "fixed left-1/2 top-0 transform -translate-x-1/2" +
          "transition-all duration-300 delay-75 ease-in-out" +
          (isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0")
        }
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
        </div>

        {isColorWheelOpen && (
          <input
            type="color"
            value={strokeColor}
            onChange={handleStrokeColorChange}
            className="flex justify-self-end mr-1"
          />
        )}

        {isEraserMenuOpen && (
          <input
            type="range"
            min="1"
            max="20"
            step="1"
            value={eraserWidth}
            onChange={handleEraserWidthChange}
            className="flex justify-self-center mx-1"
          />
        )}

        {isStrokeMenuOpen && (
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
      </div>
      <Sidebar />
    </div>
  );
}
