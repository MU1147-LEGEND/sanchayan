import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 text-gray-800 flex flex-col items-center justify-center px-4">
            <div className="max-w-3xl w-full text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-green-700">
                    সঞ্চয়ন - একটি সদস্যতার প্ল্যাটফর্ম
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-10">
                    আপনার সঞ্চয় সদস্যতা তৈরি করুন, তথ্য দিন এবং সহজেই পরিচালনা
                    করুন। নিরাপদ, সহজ, ও বিশ্বস্ত।
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        to="/registration-form"
                        className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-green-700 transition"
                    >
                        সদস্য হোন
                    </Link>
                    <Link
                        to="/login"
                        className="border border-green-600 text-green-700 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition"
                    >
                        লগইন করুন
                    </Link>
                </div>
                <div className="mt-16 text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} সঞ্চয়ন. সর্বস্বত্ব
                    সংরক্ষিত।
                </div>
            </div>
        </div>
    );
};

export default Home;
