import { useState } from "react";

const AnnouncementBar = () => {
    const [crossStyle, setCrossStyle] = useState("");
    const handleClick = () => {
        setCrossStyle("-translate-y-10");
        setTimeout(() => {
            setCrossStyle("hidden");
        }, 500); // Match this duration with the transition duration in the className
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
                একাউন্ট খুলতে ও লোন নিতে আপনার নিকটস্থ ব্রাঞ্চে যোগাযোগ করুন। বিস্তারিত জানতে ফোন করুনঃ ০১৭৩৪৯০৬৮৩৮ 
            </marquee>
            <button
                className={
                    "absolute right-4 top-2 cursor-pointer text-white bg-black px-3"
                }
                onClick={handleClick}
            >
                ×
            </button>
        </div>
    );
};
export default AnnouncementBar;
