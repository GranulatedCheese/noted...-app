import { FiSun, FiMoon } from "react-icons/fi";
import { useDarkMode } from "../../hooks/useDarkMode";

export default function Theme() {
  const [isDark, setIsDark] = useDarkMode();
  return (
    <div>
      <button onClick={() => setIsDark(!isDark)}>
        {!isDark ? <FiSun size={45} /> : <FiMoon size={45} />}
      </button>
    </div>
  );
}
