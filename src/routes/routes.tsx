import { createBrowserRouter } from "react-router-dom";
import { SignInLayout, DashboardLayout } from "@/layout";
import { SignInPage, DashboardPage } from "@/pages";
import { ProtectedRoute } from "./ProtectedRoute";
import { NotFound } from "@/pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SignInLayout />,
    children: [
      {
        index: true,
        element: <SignInPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "profile",
        element: <div>Profile Section</div>,
      },
      {
        path: "settings",
        element: <div>Settings Section</div>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
