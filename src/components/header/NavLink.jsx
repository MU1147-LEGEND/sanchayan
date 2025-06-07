import { useEffect, useRef } from "react";

const NavLink = ({ linkTitle, handleClick }) => {
    const buttonRef = useRef(null);

    useEffect(() => {
        const buttons = document.querySelectorAll(".navlink-btn");
        buttons[0].classList.add("text-blue-600", "font-bold");
    }, [linkTitle]);

    const handleButtonClick = () => {
        // Remove active styles from all NavLink buttons
        const buttons = document.querySelectorAll(".navlink-btn");
        buttons.forEach((btn) => {
            btn.classList.remove("text-blue-600", "font-bold");
        });

        // Add active styles to the clicked button
        handleClick(linkTitle);
        if (buttonRef.current) {
            buttonRef.current.classList.add("text-blue-600", "font-bold");
        }
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
