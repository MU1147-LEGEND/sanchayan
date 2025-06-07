import { useEffect, useState } from "react";

const ShowToastMsg = ({ msgType = "", msg }) => {
    const [visible, setVisible] = useState(true);
    const [animate, setAnimate] = useState(false);
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        setAnimate(true);
        const timer = setTimeout(() => setExiting(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (exiting) {
            setAnimate(false);
            const exitTimer = setTimeout(() => setVisible(false), 500);
            return () => clearTimeout(exitTimer);
        }
    }, [exiting]);

    if (!visible) return null;
    let style = "";

    if (msgType === "error") {
        style = "bg-red-300 border border-cyan-400 text-black";
    }
    if (msgType === "info") {
        style = "bg-blue-300 border border-cyan-400 text-white";
    }
    if (msgType === "warning") {
        style = "bg-yellow-300 border border-yellow-400 text-black";
    }
    if (msgType === "success") {
        style = "bg-green-400 border border-cyan-400 text-black";
        console.log('success style applied');
    }
    // default case for any other type
    if (msgType === "") {
        style = "bg-gray-300 border border-cyan-400 text-black";
    }
    return (
        <div
            className={`${style} fixed top-10 right-10 px-4 py-4 rounded shadow-lg transition-transform duration-500 z-[999] select-none ease-out
                ${animate ? "translate-x-0" : "translate-x-full"}`}
        >
            <div className="flex items-center">
                <svg
                    className="w-6 h-6 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-9a1 1 0 11-2 0V7a1 1 0 112 0v2zm-1 3a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                        clipRule="evenodd"
                    />
                </svg>
                <span className="text-lg">{msg}</span>
            </div>
        </div>
    );
};

export default ShowToastMsg;
