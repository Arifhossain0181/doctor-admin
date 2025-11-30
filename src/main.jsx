import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AdminProvider from "./Context/Admincontext.jsx";
import DoctorProvider from "./Context/Doctorcontext.jsx";
import APPProvider from "./Context/APPContext.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminProvider>
      <DoctorProvider>
        <APPProvider>
          <App />
        </APPProvider>
      </DoctorProvider>
    </AdminProvider>
  </BrowserRouter>
);
