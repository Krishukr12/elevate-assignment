import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router";
import { MainLayout } from "./layout/MainLayout.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { AddBook } from "./pages/AddBook.tsx";
import { BookDetails } from "./pages/BookDetails.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/add-book",
        element: <AddBook />,
      },
      {
        path: "/book/:id",
        element: <BookDetails />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
