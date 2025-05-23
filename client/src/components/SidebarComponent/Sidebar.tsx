import "./sidebar.css";
import React, { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import Theme from "../ThemeComponent/Theme";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const toggleDarkTheme = (enabled: boolean) => setIsDarkTheme(enabled);

  useEffect(() => {
    const theme = isDarkTheme ? "dark" : "light";
    document.body.dataset.theme = theme;
  }, [isDarkTheme]);

  return (
    <>
      <div className="fixed top-6 right-6 z-50">
        <button onClick={toggleMenu}>
          <FiMenu
            size={50}
            className={`transition duration-150 ${
              isMenuOpen ? "rotate-90" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`transition duration-300 delay-150 ${
          isMenuOpen ? "fixed inset-0 bg-black/40 z-40 overlay-class" : ""
        }`}
      />

      <div
        className={`transition duration-300 delay-75 ease-in-out ${
          isMenuOpen ? "" : "translate-x-[100%]"
        }`}
      >
        <nav className="sidebar-class">
          <ul className="mt-10" onClick={() => setIsMenuOpen(false)}>
            <Link to={"/overview"}>
              <button className="nav-button">home.</button>
            </Link>

            <Link to={"/class-notes"}>
              <button className="nav-button">class.</button>
            </Link>

            <Link to={"/user-notes"}>
              <button className="nav-button">notes.</button>
            </Link>

            <Link to={"/profile"}>
              <button className="nav-button border-none">profile.</button>
            </Link>
          </ul>
          <div className="theme-button">
            <Theme />
          </div>
        </nav>
      </div>
    </>
  );
}
