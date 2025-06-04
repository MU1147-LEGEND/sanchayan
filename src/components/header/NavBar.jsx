import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import MyAccount from "./MyAccount";
import NavLink from "./NavLink";

const NavBar = () => {
    const navLinks = [
        "Home",
        "About",
        "Contact",
        "Gallery",
        "Registration Form",
        "Dashboard",
    ];
    const navigate = useNavigate();
    const user = auth.currentUser;
    const handleClick = (linkTitle) => {
        if (linkTitle === "Home") {
            navigate("/");
            return;
        }
        if (linkTitle === "Registration Form") {
            navigate("/registration-form");
            return;
        }
        navigate(`/${linkTitle.toLowerCase()}`);
    };
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-6">
                {navLinks.map((link) => (
                    <NavLink
                        key={link}
                        linkTitle={link}
                        handleClick={handleClick}
                    />
                ))}
                <MyAccount />
            </nav>

            {/* Mobile Hamburger */}
            <div className="md:hidden flex items-center">
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 focus:outline-none"
                    aria-label="Open menu"
                >
                    {/* Hamburger icon */}
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>

            {/* Mobile Drawer & Overlay */}
            {/* Overlay */}
            <div
                className={`fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 ${
                    isOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setIsOpen(false)}
            />
            {/* Drawer */}
            <div
                className={`fixed inset-y-0 right-0 z-50 w-64 bg-white h-full shadow-lg p-6 flex flex-col space-y-4 transition-transform duration-300 transform ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {" "}
                <br /> <br />
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 p-2 focus:outline-none"
                    aria-label="Close menu"
                >
                    {/* Close icon */}
                    <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                {navLinks.map((link) => (
                    <NavLink
                        key={link}
                        linkTitle={link}
                        handleClick={(title) => {
                            handleClick(title);
                            setIsOpen(false);
                        }}
                    />
                ))}
                <MyAccount />
                {/* if not logged in then show login and register button */}
                {!user && (
                    <>
                        <button
                            onClick={() => {
                                navigate("/login");
                                setIsOpen(false);
                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
                        >
                            Log In
                        </button>
                        <button
                            onClick={() => {
                                navigate("/signup");
                                setIsOpen(false);
                            }}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-full"
                        >
                            Sign Up
                        </button>
                    </>
                )}
                {/* if logged in then log out */}
                {user && (
                    <button
                        onClick={() => {
                            auth.signOut();
                            navigate("/");
                            setIsOpen(false);
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full"
                    >
                        Log Out
                    </button>
                )}
            </div>
        </>
    );
};
export default NavBar;
