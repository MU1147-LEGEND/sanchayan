import { useNavigate } from "react-router-dom";
import NavLink from "./NavLink";

const NavBar = () => {
    const navLinks = ["Home", "About", "Contact", "Dashboard"];
    const navigate = useNavigate();

    const handleClick = (linkTitle) => {
        if(linkTitle === "Home") {
            navigate("/sanchayan"); 
            return;
        }
        navigate(`/${linkTitle.toLowerCase()}`);
    };
    return (
        <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
                <NavLink
                    key={link}
                    linkTitle={link}
                    handleClick={handleClick}
                />
            ))}
        </nav>
    );
};
export default NavBar;
