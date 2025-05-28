const NavLink = ({ linkTitle, handleClick }) => {

    return (
        <a className="hover:text-gray-500 transition-colors cursor-pointer" onClick={() => handleClick(linkTitle)}>
            {linkTitle}
        </a>
    );
};
export default NavLink;
