import { createRoot } from "react-dom/client";
import { Landing, type LandingId } from "./pages/Landing";
import "./index.css";
import { captureAttribution, loadUmami } from "./lib/tracking";

captureAttribution();
loadUmami();

const id = document.body.dataset.landing as LandingId;
createRoot(document.getElementById("root")!).render(<Landing id={id} />);
