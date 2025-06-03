import AnnouncementBar from "../announcement-bar/AnnouncementBar";
import NavBar from "./NavBar";
import SanchayanLogo from "./SanchayanLogo";

const Header = () => {
    return (
        <>
            <AnnouncementBar />
            <header className="border-b w-11/12 m-auto border-gray-200 md:px-4">
                <div className="container mx-auto flex items-center justify-between">
                    <SanchayanLogo />
                    <NavBar />
                </div>
            </header>
        </>
    );
};
export default Header;
