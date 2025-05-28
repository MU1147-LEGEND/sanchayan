import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./loginAuthContext";


const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <p>লোড হচ্ছে...</p>;
    if (!user) return <Navigate to="/login" />;
    return children;
};

export default ProtectedRoute;
