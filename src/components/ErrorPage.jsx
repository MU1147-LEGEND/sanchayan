import Header from "./header/Header";

const ErrorPage = () => {
    return (
        <>
        <Header />
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <h1 className="text-6xl font-bold text-red-600">404</h1>
                <p className="mt-4 text-xl text-gray-700">Page Not Found</p>
                <a
                    href="/sanchayan"
                    className="mt-6 text-blue-500 hover:underline"
                >
                    Go to Home
                </a>
            </div>
            <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white text-center py-2">
                <p>
                    © {new Date().getFullYear()} Sanchayan. All rights reserved.
                </p>
            </div>
        </>
    );
};
export default ErrorPage;
