import AnnouncementBar from "../announcement-bar/AnnouncementBar";
import NavBar from "./NavBar";
import SanchayanLogo from "./SanchayanLogo";

const Header = () => {
    return (
        <>
            <AnnouncementBar />
            <header className="sticky top-0 z-50 bg-white/90 lg:backdrop-blur-lg shadow-sm border-b w-full m-auto border-gray-200 md:px-4">
                <div className="container mx-auto flex items-center justify-between w-11/12">
                    <SanchayanLogo />
                    <NavBar />
                </div>
            </header>
        </>
    );
};
export default Header;
