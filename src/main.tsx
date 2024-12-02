import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "./fontawesome.js";
import App from "./App.tsx";
import Dashboard from "./components/routes/admin/dashboard.jsx";
import Posts from "./components/routes/posts.jsx";
import Products from "./components/routes/products.jsx";
import NotFound from "./components/routes/notFound.jsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
