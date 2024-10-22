import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./App.jsx";
import { ContextProvider } from "./context/ContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </ContextProvider>
);
