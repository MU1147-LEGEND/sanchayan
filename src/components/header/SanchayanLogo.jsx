import { useNavigate } from "react-router-dom";
import siteLogo from "../../assets/sanchayan transparent.png";
const SanchayanLogo = ({ place = "header" }) => {
    const navigate = useNavigate();
    let style =
        place === "footer"
            ? "text-2xl font-bold mb-4 block"
            : "text-2xl font-bold";

    return (
        <p className={style} onClick={() => navigate("/")}>
            <img className="w-24 h-20 inline" src={siteLogo} alt="site logo" />
            {/* Sanchayan */}
        </p>
    );
};
export default SanchayanLogo;
