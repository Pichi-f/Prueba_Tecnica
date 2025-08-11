import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import Proveedores from "./pages/Proveedores.jsx";
import ProveedorNuevo from "./pages/ProveedorNuevo.jsx"; // ⬅️ nuevo
import Login from "./pages/Login.jsx";
import "./index.css";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Proveedores /> },         // listado (home)
      { path: "proveedores/nuevo", element: <ProveedorNuevo /> }, // crear
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster position="top-right" />
  </React.StrictMode>
);
