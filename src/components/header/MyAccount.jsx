import { useNavigate } from "react-router-dom";

const MyAccount = () => {
    // set route to /dashboard using useNavigate
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/dashboard");
    };
    return (
        <a onClick={handleClick} className="cursor-pointer hover:opacity-70">
            Account
        </a>
    );
};
export default MyAccount;
