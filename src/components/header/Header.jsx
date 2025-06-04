import AnnouncementBar from "../announcement-bar/AnnouncementBar";
import NavBar from "./NavBar";
import SanchayanLogo from "./SanchayanLogo";

const Header = () => {
    return (
        <div id="header" className="sticky top-0 left-0 right-0 z-30 bg-white">
            <AnnouncementBar />
            <header className="bg-white border-b border-gray-200 w-full z-50">
                <div className="container mx-auto flex items-center justify-between px-4">
                    <SanchayanLogo />
                    <NavBar />
                </div>
            </header>
        </div>
    );
};
export default Header;
