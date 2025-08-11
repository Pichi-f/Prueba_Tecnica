import { Sun, Moon } from "lucide-react";
import { useLayoutEffect, useState } from "react";

const THEMES = { light: "corporate", dark: "business" };

export default function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || THEMES.light);

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme(t => (t === THEMES.light ? THEMES.dark : THEMES.light));
  const isLight = theme === THEMES.light;

  return (
    <button className="btn btn-ghost" onClick={toggle} title="Cambiar tema">
      {isLight ? <Moon size={18}/> : <Sun size={18}/>}
      <span className="ml-1 hidden sm:inline">
        {isLight ? "Oscuro" : "Claro"}
      </span>
    </button>
  );
}
