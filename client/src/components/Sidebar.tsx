import "../styles/sidebar.css";
import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import Theme from "./Theme";
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
            size={45}
            className={`transition duration-150 ${
              isMenuOpen ? "rotate-90" : ""
            }`}
          />
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 overlay-class"></div>
      )}

      {isMenuOpen && (
        <nav className="sidebar-class">
          <ul className="mt-10">
            <Link to={"/overview"}>
              <button className="nav-button">home.</button>
            </Link>

            <Link to={"/class"}>
              <button className="nav-button">class.</button>
            </Link>

            <Link to={"/notes"}>
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
      )}
    </>
  );
}
