import AnnouncementBar from "../announcement-bar/AnnouncementBar";
import MyAccount from "./MyAccount";
import NavBar from "./NavBar";
import SanchayanLogo from "./SanchayanLogo";

const Header = () => {
    return (
        <>
        <AnnouncementBar/>
            <header className="border-b w-4/5 m-auto border-gray-200 py-4 px-4 md:px-8">
                <div className="container mx-auto flex items-center justify-between">
                    <SanchayanLogo />
                    <NavBar />
                    <MyAccount />
                </div>
            </header>
        </>
    );
};
export default Header;
