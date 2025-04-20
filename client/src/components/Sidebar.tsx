import "./sidebar.css";
import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import Theme from "./Theme";

export default function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const toggleDarkTheme = (enabled: boolean) => {
    setIsDarkTheme(enabled);
  };

  useEffect(() => {
    const theme = isDarkTheme ? "dark" : "light";
    document.body.dataset.theme = theme;
  }, [isDarkTheme]);

  return (
    <div>
      <button onClick={toggleMenu}>
        <FiMenu
          size={30}
          className={`transition duration-150 ${isMenuOpen ? "rotate-90" : ""}`}
        />
      </button>

      {isMenuOpen && (
        <nav>
          <ul>
            <li>Element.</li>
            <Theme onToggle={toggleDarkTheme} />
          </ul>
        </nav>
      )}
    </div>
  );
}
