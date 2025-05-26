import NavLink from "./NavLink";

const NavBar = () => {
    const navLinks = ["Home", "About", "Contact", "Branches"];
    return (
        <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
                <NavLink key={link} linkTitle={link} />
            ))}
        </nav>
    );
};
export default NavBar;
