const Footer = () => {
    return (
        <footer id="footer">
            <div className="bg-gray-200 py-8 px-6 text-center pb-20">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                    আমাদের সাথে যুক্ত হোন
                </h2>
                <p className="text-gray-700 mb-6">
                    সঞ্চয় একটি ইসলামী শরীয়াহ্ ভিত্তিক পরিচালিত একটি ব্যবসায়
                    প্রতিষ্ঠান।
                </p>
                <div className="flex justify-center gap-4">
                    <a
                        href="https://www.facebook.com/sanchayan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition"
                    >
                        Facebook
                    </a>
                    <a
                        href="https://www.twitter.com/sanchayan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-600 transition"
                    >
                        Twitter
                    </a>
                    <a
                        href="https://www.instagram.com/sanchayan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:text-pink-800 transition"
                    >
                        Instagram
                    </a>
                </div>
            </div>
            {/* Footer copyright */}
            <p className="fixed z-50 bottom-0 left-0 right-0 bg-gray-800 text-white text-center py-2">
                © {new Date().getFullYear()} Sanchayan. All rights reserved.
            </p>
        </footer>
    );
};
export default Footer;
