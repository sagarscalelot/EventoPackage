import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const RequireAuth = ({ checkToken }) => {
    const { auth } = useAuth();
    const location = useLocation();
    const token = localStorage.getItem("Token")
    return (
      token
            ? <Outlet />
            : 
              <Navigate to="/auth/login" state={{ from: location }} replace />
                
    );
}

export default RequireAuth;