import { FiSun, FiMoon } from "react-icons/fi";
import { useDarkMode } from "../../hooks/useDarkMode";

export default function Theme() {
  const [isDark, setIsDark] = useDarkMode();

  return (
    <div>
      <button onClick={() => setIsDark(!isDark)}>
        {!isDark ? <FiSun size={50} /> : <FiMoon size={50} />}
      </button>
    </div>
  );
}
