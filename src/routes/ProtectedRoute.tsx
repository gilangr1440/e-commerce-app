import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../utils/contexts/auth";
import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children?: ReactNode }) => {
  const { token, user } = useAuth();
  const { pathname } = useLocation();

  const authProtected = ["/login", "/register"];
  const protectedByToken = [
    "/user",
    "/user/orders",
    "/user/products",
    "/cart",
    "/orderproducts",
    "/admin/orders",
    "/admin/users",
  ];
  const adminProtected = ["/admin/orders", "/admin/users"];
  const userProtected = ["/user", "/user/orders", "/user/products", "/cart", "/orderproducts"];
  if (authProtected.includes(pathname)) {
    if (token) return <Navigate to={"/"} />;
  }
  if (protectedByToken.includes(pathname)) {
    if (!token) return <Navigate to="/login" />;

    if (adminProtected.includes(pathname)) {
      if (user.role === "user") return <Navigate to="/" />;
    }
    if (userProtected.includes(pathname)) {
      if (user.role === "admin") return <Navigate to="/admin/users" />;
    }
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
