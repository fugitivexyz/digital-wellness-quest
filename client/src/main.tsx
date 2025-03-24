import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { applyTheme } from "./lib/theme";

// Apply custom theme
applyTheme();

createRoot(document.getElementById("root")!).render(<App />);
