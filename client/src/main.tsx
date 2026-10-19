import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { captureAttribution } from "./lib/tracking";

captureAttribution();

createRoot(document.getElementById("root")!).render(<App />);
