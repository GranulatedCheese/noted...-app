import React, { useRef, useState, useEffect } from "react";
import "../styles/toolbar.css";

export default function Toolbar() {
  const [isVisible, setIsVisible] = useState(false);

  const radiusRef = useRef(100);

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
    <div
      className={
        "fixed left-1/2 top-0 transform -translate-x-1/2" +
        "transition-all duration-300 ease-in-out" +
        (isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0")
      }
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
    >
      <div className="bg-white p-4 rounded shadow-lg">Hovered in range!</div>
    </div>
  );
}
