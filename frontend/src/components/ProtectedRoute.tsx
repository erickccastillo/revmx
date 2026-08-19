// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = localStorage.getItem("adminToken");

  console.log("Token:", token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
``
