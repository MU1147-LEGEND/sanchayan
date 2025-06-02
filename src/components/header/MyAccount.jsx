import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../loginAuthContext";

const MyAccount = () => {
    const { user, loading } = useContext(AuthContext);
    // set route to /dashboard using useNavigate
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/login");
    };
    return (
        <button
            onClick={handleClick}
            className="cursor-pointer disabled:cursor-not-allowed hover:opacity-70"
            disabled={user}
        >
            {user ? `Hi ${user.displayName}` : "Login"}
        </button>
    );
};
export default MyAccount;
