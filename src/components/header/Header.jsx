import NavBar from "./NavBar";
import SanchayanLogo from "./SanchayanLogo";

const Header = () => {
    return (
        <>
            {/* <AnnouncementBar /> */}
            <header
                id="header"
                className="sticky top-0 z-50 py-2 lg:py-3 bg-white/90 dark:bg-gray-800 dark:text-gray-200 lg:backdrop-blur-lg shadow-sm border-b w-full m-auto border-gray-200 md:px-4"
            >
                <div className="container mx-auto flex items-center justify-between w-11/12">
                    <SanchayanLogo />
                    <NavBar />
                </div>
            </header>
        </>
    );
};
export default Header;
