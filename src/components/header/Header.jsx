import AnnouncementBar from "../announcement-bar/AnnouncementBar";
import NavBar from "./NavBar";
import SanchayanLogo from "./SanchayanLogo";

const Header = () => {
    return (
        <div id="header" className="sticky top-0 left-0 right-0 z-30">
            <AnnouncementBar />
            {/* add bg blur effect */}
            <header className="bg-white/30 border-b border-gray-200 w-full z-50 shadow-md backdrop-blur-sm">
                <div className="container mx-auto flex items-center justify-between px-4">
                    <SanchayanLogo />
                    <NavBar />
                </div>
            </header>
        </div>
    );
};
export default Header;
