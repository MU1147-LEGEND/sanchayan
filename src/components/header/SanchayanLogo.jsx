import { useNavigate } from "react-router-dom";
import siteLogo from "../../assets/sanchayan-29-aug.png";
const SanchayanLogo = ({ place = "header" }) => {
    const navigate = useNavigate();
    let style =
        place === "footer"
            ? "text-2xl font-bold mb-4 block cursor-pointer"
            : "text-2xl font-bold cursor-pointer";

    return (
        <p
            className={style}
            onClick={() => {
                const buttons = document.querySelectorAll(".navlink-btn");
                buttons.forEach((btn) => {
                    btn.classList.remove("text-blue-600", "font-bold");
                });
                buttons[0].classList.add("text-blue-600", "font-bold");
                navigate("/");
                window.scrollTo({ top: 0, behavior: "smooth" });
            }}
        >
            <img className="w-24 inline" src={siteLogo} alt="site logo" />
        </p>
    );
};
export default SanchayanLogo;
