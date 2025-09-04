import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
import AboutSanchayanbd from "./AboutSanchayanbd";
import H1 from "./custom-tags/H1";
import "./embla-carousel/embla.css";
import EmblaCarousel from "./embla-carousel/EmblaCarousel";

const Home = () => {
    const images = [
        {
            id: 1,
            src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
            alt: "Modern bank building",
            title: "Banking Services",
        },
        {
            id: 2,
            src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400",
            alt: "Financial planning",
            title: "Financial Planning",
        },
        {
            id: 3,
            src: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400",
            alt: "Insurance protection",
            title: "Insurance Coverage",
        },
    ];
    const auth = getAuth();
    const user = auth.currentUser;

    const OPTIONS = { loop: true };
    const SLIDES = images.map((_, index) => index);

    return (
        <div className="min-h-screen flex flex-col pb-8 bg-white dark:bg-gray-900">
            {/* Hero Section */}
            <div className="py-20 px-6 text-center bg-gradient-to-br from-green-100 to-green-300 dark:from-gray-800 dark:to-gray-900">
                <H1>সঞ্চয়ন</H1>
                <p className="text-lg md:text-xl text-green-800 dark:text-green-300 max-w-3xl mx-auto">
                    ইসলামী শরীয়াহ্ ভিত্তিক পরিচালিত একটি সমাজ উন্নয়ন সংস্থা।
                </p>
                <div className="mt-8 flex justify-center gap-4 flex-wrap">
                    <button
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                    >
                        <Link
                            to="/registration-form"
                            className="px-6 py-3 rounded-lg bg-green-600 dark:bg-green-700 text-white hover:bg-green-700 dark:hover:bg-green-600 transition-all duration-300"
                        >
                            সদস্য হোন
                        </Link>
                    </button>

                    <button
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                    >
                        <Link
                            to="/userdashboard"
                            className="px-6 py-3 rounded-lg border bg-white dark:bg-gray-800 text-green-700 dark:text-green-300 border-green-600 dark:border-green-700 hover:bg-green-100 dark:hover:bg-gray-700 transition-all duration-300"
                        >
                            {user ? "ড্যাশবোর্ডে যান" : "লগইন করুন"}
                        </Link>
                    </button>
                </div>
            </div>

            {/* Gallery Section */}
            <div className="py-12 px-6 transition-colors duration-300 bg-gray-100 dark:bg-gray-800">
                {/* carousel */}
                <EmblaCarousel
                    slides={SLIDES}
                    options={OPTIONS}
                    images={images}
                />

                {/* filler */}
                <div className="text-center mt-8">
                    <button
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                    >
                        <Link
                            to="/gallery"
                            className="px-6 py-3 rounded-lg transition-all duration-300 bg-green-600 dark:bg-green-700 text-white hover:bg-green-700 dark:hover:bg-green-600"
                        >
                            আরও দেখুন
                        </Link>
                    </button>
                </div>
            </div>

            {/* About Section */}
            <div className="py-16 px-6 text-center transition-colors duration-300 bg-white dark:bg-gray-900">
                <H1>আমাদের সম্পর্কে</H1>
                <AboutSanchayanbd />
                <div className="text-center mt-8">
                    <button
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                    >
                        <Link
                            to="/about"
                            className="px-6 py-3 rounded-lg transition-all duration-300 bg-green-600 dark:bg-green-700 text-white hover:bg-green-700 dark:hover:bg-green-600"
                        >
                            বিস্তারিত দেখুন
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
