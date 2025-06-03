import Footer from "../Footer";
import Header from "./Header"; // আপনার Header component

import { Outlet, useLocation } from "react-router-dom";

const HeaderLayout = () => {
    const location = useLocation();

    const hideHeaderRoutes = [""];

    const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

    return (
        <>
            {!shouldHideHeader && <Header />}
            <Outlet />
            <Footer />
        </>
    );
};

export default HeaderLayout;
