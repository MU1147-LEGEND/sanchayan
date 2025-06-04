import { Link } from "react-router-dom";

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
    return (
        <div className="min-h-screen flex flex-col pb-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-green-100 to-green-300 py-20 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
                    সঞ্চয়ন
                </h1>
                <p className="text-lg md:text-xl text-green-800 max-w-3xl mx-auto">
                    সঞ্চয়ন একটি সঞ্চয় ও ঋণ-ভিত্তিক সমবায় প্রতিষ্ঠান। এখানে সদস্য
                    হয়ে আপনি নিয়মিত সঞ্চয়ের পাশাপাশি প্রয়োজন অনুযায়ী ঋণ গ্রহণ
                    করতে পারবেন। আমরা স্বচ্ছতা ও বিশ্বস্ততার সাথে অর্থনৈতিক
                    নিরাপত্তা প্রদান করি।
                </p>
                <div className="mt-8 flex justify-center gap-4 flex-wrap">
                    <Link
                        to="/registration-form"
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
                    >
                        সদস্য হোন
                    </Link>
                    <Link
                        to="/login"
                        className="bg-white text-green-700 border border-green-600 px-6 py-3 rounded-lg hover:bg-green-100 transition"
                    >
                        লগইন করুন
                    </Link>
                </div>
            </div>

            {/* About Section */}
            <div className="py-16 px-6 bg-white text-center">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                    আমাদের সম্পর্কে
                </h2>
                <p className="text-gray-700 max-w-4xl mx-auto">
                    সঞ্চয়ন একটি নির্ভরযোগ্য ও কমিউনিটি ভিত্তিক সমবায় সেবা
                    প্রদানকারী প্রতিষ্ঠান। আমাদের মূল লক্ষ্য হচ্ছে— সদস্যদের
                    সঞ্চয় অভ্যাস গড়ে তোলা, প্রয়োজনের সময় সহজ শর্তে ঋণ প্রদান এবং
                    আর্থিক পরিকল্পনায় সহায়তা করা। আমরা বিশ্বাস করি— একটি সংগঠিত
                    সমাজই অর্থনৈতিকভাবে শক্তিশালী সমাজ গড়ে তুলতে পারে।
                </p>
                <div className="text-center mt-8">
                    <Link
                        to="/about"
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
                    >
                        বিস্তারিত দেখুন
                    </Link>
                </div>
            </div>

            {/* Gallery Section */}
            <div className="bg-gray-100 py-12 px-6">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
                    আমাদের কিছু মুহূর্ত
                </h2>
                <div>
                    <p className="text-center text-gray-600 mb-6">
                        আমাদের সদস্যদের সঞ্চয় ও ঋণ কার্যক্রমের কিছু ছবি। সঞ্চয় ও
                        ঋণের মাধ্যমে আমরা একসাথে একটি শক্তিশালী আর্থিক ভিত্তি
                        গড়ে তুলতে কাজ করছি।
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {images.map((image) => (
                            <div
                                key={image.id}
                                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-56 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-gray-700 text-center">
                                        {image.title}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* filler */}
                <div className="text-center mt-8">
                    <Link
                        to="/gallery"
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
                    >
                        আরও দেখুন
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
