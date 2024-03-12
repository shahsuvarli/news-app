import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import NewsSource from "./routes/news-source";
import Sources from "./components/sources";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Not Found</div>,
    children: [
      {
        path: "/",
        element: <Sources />,
      },
      {
        path: "/news-source/:sourceId",
        element: <NewsSource />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
