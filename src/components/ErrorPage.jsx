import { useNavigate } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./Footer";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* height: 100vh minus header's height */}
            <div
                className="flex flex-col items-center justify-center bg-gray-100"
                style={{ minHeight: "calc(100vh - 64px)" }} // adjust 64px to your Header's height
            >
                <h1 className="text-6xl font-bold text-red-600">404</h1>
                <p className="mt-4 text-xl text-gray-700">Page Not Found</p>
                <button
                    onClick={() => navigate("/")}
                    className="mt-6 text-blue-500 hover:underline"
                >
                    Go to Home
                </button>
            </div>
        </>
    );
};
export default ErrorPage;
