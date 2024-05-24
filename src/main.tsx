import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import "./main.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
// import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
        <AppRoutes />
    </Router>
  </React.StrictMode>
);
