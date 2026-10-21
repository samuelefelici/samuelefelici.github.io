import { createRoot } from "react-dom/client";
import { ReviewPage } from "./pages/ReviewPage";
import "./index.css";
import { loadUmami } from "./lib/tracking";

loadUmami();

createRoot(document.getElementById("root")!).render(<ReviewPage />);
