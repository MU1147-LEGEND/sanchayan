import siteLogo from "../../assets/sanchayan transparent.png";
const SanchayanLogo = ({ place = "header" }) => {
    let style =
        place === "footer"
            ? "text-2xl font-bold mb-4 block"
            : "text-2xl font-bold";

    return (
        <a href="#" className={style}>
            <img className="w-24 h-24 inline" src={siteLogo} alt="site logo" /> 
            {/* Sanchayan */}
        </a>
    );
};
export default SanchayanLogo;
