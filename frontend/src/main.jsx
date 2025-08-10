import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Proveedores from "./pages/Proveedores.jsx";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/", element: <App />, children: [
      { index: true, element: <Proveedores /> },
    ] 
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
