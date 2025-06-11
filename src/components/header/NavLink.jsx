import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const NavLink = ({ linkTitle, handleClick }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const buttonRef = useRef(null);

    // Map linkTitle to actual path
    const pathMap = {
        Home: "/",
        About: "/about",
        Contact: "/contact",
        Gallery: "/gallery",
        Login: "/login",
        Signup: "/signup",
        Dashboard: "/dashboard",
        Withdraw: "/withdraw",
        "User Dashboard": "/userdashboard",
        "Registration Form": "/registration-form",
        "Withdraw History": "/withdraw-history",
    };

    const currentPath = pathMap[linkTitle] || "/";
    const isActive = location.pathname === currentPath;

    useEffect(() => {
        if (buttonRef.current) {
            if (isActive) {
                buttonRef.current.classList.add("text-blue-600", "font-bold");
            } else {
                buttonRef.current.classList.remove(
                    "text-blue-600",
                    "font-bold"
                );
            }
        }
    }, [location.pathname, isActive]);

    const handleButtonClick = () => {
        handleClick(linkTitle);
        navigate(currentPath);
    };

    return (
        <button
            ref={buttonRef}
            type="button"
            className="navlink-btn hover:text-gray-500 transition-colors cursor-pointer bg-transparent border-none p-0"
            onClick={handleButtonClick}
        >
            {linkTitle}
        </button>
    );
};

export default NavLink;
