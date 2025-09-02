import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer id="footer">
            <div className="bg-gray-200 py-8 px-6 text-center pb-20">
                {/* <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                    আমাদের সাথে যুক্ত হোন
                </h2>
                <p className="text-gray-700 mb-6">
                    ইসলামী শরীয়াহ্ ভিত্তিক পরিচালিত একটি ব্যবসায় প্রতিষ্ঠান।
                </p> */}
                <div className="flex justify-around gap-4 mb-6">
                    <div className="flex justify-center flex-col gap-4">
                        <b>Follow us on social media: </b>
                        <a
                            href="https://www.facebook.com/sanchayanbd"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 transition"
                        >
                            Facebook
                        </a>
                        <a
                            href="https://www.twitter.com/sanchayanbd"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-600 transition"
                        >
                            Twitter
                        </a>
                        <a
                            href="https://www.instagram.com/sanchayanbd"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-600 hover:text-pink-800 transition"
                        >
                            Instagram
                        </a>
                        <a
                            href="https://www.linkedin.com/company/sanchayanbd"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 hover:text-blue-900 transition"
                        >
                            LinkedIn
                        </a>
                    </div>
                    {/*  */}
                    <div className="flex justify-center flex-col gap-4">
                        <b> Useful Links:</b>
                        <Link
                            to={"/"}
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 transition"
                        >
                            Home
                        </Link>
                        <Link
                            to={"/gallery"}
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 transition"
                        >
                            Gallery
                        </Link>
                        <Link
                            to={"/contact"}
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 transition"
                        >
                            Contact
                        </Link>
                        <Link
                            to={"/about"}
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 transition"
                        >
                            About Us
                        </Link>
                        <Link
                            to={"/privacy-policy"}
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 transition"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            to={"/structure"}
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 transition"
                        >
                            Institutional Structure
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer copyright */}
            <p className=" z-50 bottom-0 left-0 right-0 bg-gray-800 text-white text-center py-2">
                © {new Date().getFullYear()} Sanchayan. All rights reserved.
            </p>
        </footer>
    );
};
export default Footer;
