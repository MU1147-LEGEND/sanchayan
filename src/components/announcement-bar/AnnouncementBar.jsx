import { useEffect, useState } from "react";

const AnnouncementBar = () => {
    const [crossStyle, setCrossStyle] = useState("");
    // check if the localstorage item "announcementBarClosed" is set to true
    useEffect(() => {
        const isClosed = localStorage.getItem("announcementBarClosed");
        if (isClosed === "true") {
            setCrossStyle("hidden");
        } else {
            setCrossStyle("");
        }
    }, []);

    const handleClick = () => {
        setCrossStyle("-translate-y-10");
        setTimeout(() => {
            setCrossStyle("hidden");
        }, 500); // Match this duration with the transition duration in the className
        // set a localstorage item to indicate the bar has been closed
        localStorage.setItem("announcementBarClosed", "true");
    };
    return (
        // <!-- Announcement Bar -->
        <div
            className={
                `bg-black text-white py-2 px-4 text-center text-sm relative transition-all duration-500 -translate-y-0 ` +
                crossStyle
            }
        >
            <marquee>
                একাউন্ট খুলতে ও লোন নিতে আপনার নিকটস্থ ব্রাঞ্চে যোগাযোগ করুন।
                বিস্তারিত জানতে ফোন করুনঃ ০১৭৩৪৯০৬৮৩৮
            </marquee>
            <button
                className={
                    "absolute text-2xl right-2 top-2 cursor-pointer text-white bg-black px-3"
                }
                onClick={handleClick}
            >
                ×
            </button>
        </div>
    );
};
export default AnnouncementBar;
