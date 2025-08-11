// tailwind.config.js (ESM)
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  plugins: [daisyui],
  daisyui: {
    // habilita exactamente los nombres que usas en el toggle:
    themes: ["light", "dark"], // o ["light","business"]
  },
};
