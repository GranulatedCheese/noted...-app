import { useEffect, useState } from "react";

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const mode = isDark ? "dark" : "light";
    document.body.dataset.theme = mode;
    localStorage.setItem("theme", mode);
  }, [isDark]);

  return [isDark, setIsDark] as const;
}
