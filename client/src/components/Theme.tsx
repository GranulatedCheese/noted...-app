import { useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

interface SidebarProps {
  onToggle: (isThemeActive: boolean) => void;
}

export default function Theme({ onToggle }: SidebarProps) {
  const [isThemeActive, setTheme] = useState(false);
  const toggleTheme = () => {
    const newState = !isThemeActive;
    setTheme(newState);
    onToggle(newState); // Coms with parent
  };

  return (
    <div>
      <button onClick={toggleTheme}>
        {!isThemeActive ? <FiSun size={45} /> : <FiMoon size={45} />}
      </button>
    </div>
  );
}
