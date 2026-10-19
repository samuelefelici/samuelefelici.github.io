import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { captureAttribution, loadUmami } from "./lib/tracking";

captureAttribution();
loadUmami();

createRoot(document.getElementById("root")!).render(<App />);
