import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moon from "../assets/moon.svg";
import sun from "../assets/sun.svg";
import { useTheme } from "./ThemeContext";

const Footer = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Show/hide scroll to top button based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <footer id="footer" className="bg-gray-100 dark:bg-gray-950">
            {/* Main footer content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                            সঞ্চয়ন
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            ইসলামী শরীয়াহ্ ভিত্তিক পরিচালিত একটি সমাজ উন্নয়ন
                            সংস্থা। আমাদের লক্ষ্য হলো সমাজের কল্যাণ ও উন্নয়নে
                            অবদান রাখা।
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                            Quick Links
                        </h3>
                        <div className="space-y-2">
                            <Link
                                to={"/"}
                                onClick={() =>
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "smooth",
                                    })
                                }
                                className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 text-sm"
                            >
                                Home
                            </Link>
                            <Link
                                to={"/about"}
                                onClick={() =>
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "smooth",
                                    })
                                }
                                className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 text-sm"
                            >
                                About Us
                            </Link>
                            <Link
                                to={"/gallery"}
                                onClick={() =>
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "smooth",
                                    })
                                }
                                className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 text-sm"
                            >
                                Gallery
                            </Link>
                            <Link
                                to={"/contact"}
                                onClick={() =>
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "smooth",
                                    })
                                }
                                className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 text-sm"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                            Services
                        </h3>
                        <div className="space-y-2">
                            <Link
                                to={"/registration-form"}
                                onClick={() =>
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "smooth",
                                    })
                                }
                                className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 text-sm"
                            >
                                Member Registration
                            </Link>
                            <Link
                                to={"/privacy-policy"}
                                onClick={() =>
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "smooth",
                                    })
                                }
                                className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 text-sm"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to={"/structure"}
                                onClick={() =>
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "smooth",
                                    })
                                }
                                className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 text-sm"
                            >
                                Institutional Structure
                            </Link>
                        </div>
                    </div>

                    {/* Social Media & Contact */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                            Connect With Us
                        </h3>
                        <div className="flex flex-col space-y-3">
                            <a
                                href="https://www.facebook.com/sanchayanbd"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                <span className="text-sm">Facebook</span>
                            </a>
                            <a
                                href="https://www.twitter.com/sanchayanbd"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 300 300"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z" />
                                </svg>
                                <span className="text-sm">X (Twitter)</span>
                            </a>
                            <a
                                href="https://www.instagram.com/sanchayanbd"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-200"
                            >
                                <svg
                                    fill="currentColor"
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g
                                        id="SVGRepo_bgCarrier"
                                        stroke-width="0"
                                    ></g>
                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                        {" "}
                                        <path
                                            fill-rule="evenodd"
                                            d="M8,2 L16,2 C19.3137085,2 22,4.6862915 22,8 L22,16 C22,19.3137085 19.3137085,22 16,22 L8,22 C4.6862915,22 2,19.3137085 2,16 L2,8 C2,4.6862915 4.6862915,2 8,2 Z M8,4 C5.790861,4 4,5.790861 4,8 L4,16 C4,18.209139 5.790861,20 8,20 L16,20 C18.209139,20 20,18.209139 20,16 L20,8 C20,5.790861 18.209139,4 16,4 L8,4 Z M12,17 C9.23857625,17 7,14.7614237 7,12 C7,9.23857625 9.23857625,7 12,7 C14.7614237,7 17,9.23857625 17,12 C17,14.7614237 14.7614237,17 12,17 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z M17,8 C16.4477153,8 16,7.55228475 16,7 C16,6.44771525 16.4477153,6 17,6 C17.5522847,6 18,6.44771525 18,7 C18,7.55228475 17.5522847,8 17,8 Z"
                                        ></path>{" "}
                                    </g>
                                </svg>
                                <span className="text-sm">Instagram</span>
                            </a>
                            <a
                                href="https://www.linkedin.com/company/sanchayanbd"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                <span className="text-sm">LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar with theme toggle and copyright */}
            <div className="border-t border-gray-300 dark:border-gray-800 bg-gray-200 dark:bg-black">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Theme Toggle */}
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                Theme:
                            </span>
                            <div className="inline-flex rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-800 p-1">
                                <button
                                    type="button"
                                    onClick={() => toggleTheme("dark")}
                                    className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                                        isDarkMode
                                            ? "bg-green-600 text-white shadow-sm"
                                            : "text-gray-600 hover:text-gray-800 hover:bg-gray-300 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
                                    }`}
                                >
                                    <img
                                        src={moon}
                                        alt="Dark mode"
                                        className={`w-3 h-3 mr-1 ${
                                            isDarkMode
                                                ? "brightness-0 invert"
                                                : "opacity-60"
                                        }`}
                                    />
                                    Dark
                                </button>
                                <button
                                    type="button"
                                    onClick={() => toggleTheme("light")}
                                    className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                                        !isDarkMode
                                            ? "bg-green-600 text-white shadow-sm"
                                            : "text-gray-600 hover:text-gray-800 hover:bg-gray-300 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
                                    }`}
                                >
                                    <img
                                        src={sun}
                                        alt="Light mode"
                                        className={`w-3 h-3 mr-1 ${
                                            !isDarkMode
                                                ? "brightness-0 invert"
                                                : "opacity-60"
                                        }`}
                                    />
                                    Light
                                </button>
                            </div>
                        </div>

                        {/* Copyright */}
                        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                            © {new Date().getFullYear()} Sanchayan. All rights
                            reserved.
                        </p>
                    </div>
                </div>
            </div>

            {/* Floating Back to Top Button */}
            {showScrollTop && (
                <button
                    onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
                    aria-label="Back to top"
                >
                    <svg
                        className="w-5 h-5 transform group-hover:-translate-y-0.5 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                    </svg>
                </button>
            )}
        </footer>
    );
};
export default Footer;
