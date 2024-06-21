import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Nav from "./components/ui/Nav.jsx";
import NavBarHeader from "./components/NavBarHeader.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="@dark">
        <NavBarHeader/>
        <App />
        <Nav />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
