import facilities from "../../data/facilities.json";
import invest from "../../data/invest-program.json";
import H1 from "./custom-tags/H1";

const About = () => {
    return (
        <>
            <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <H1>আমাদের সম্পর্কে</H1>
                <p className="text-lg text-gray-700 mb-4">
                    <h1 className="font-bold">সঞ্চয়নের লক্ষ্য ও উদ্দেশ্যঃ</h1>
                    “আল্লাহ তা’য়ালা ব্যবসায়কে হালাল করেছেন এবং সুদকে হারাম
                    করেছেন” । (সূরা বাকারাহ্ আয়াত নং—২৭৫)।
                </p>
                <p className="text-lg text-gray-700 mb-4">
                    ইসলামী শরীয়াহ্ মোতাবেক ব্যবসায় কার্য পরিচালনা করা,
                    বিনিয়োগকারী প্রত্যেক সদস্যের অর্থনৈতিক ও সামাজিক মর্যাদা
                    বৃদ্ধিকরা, সমাজের উন্নয়ন সাধন করা, ইসলামী শিক্ষা ও
                    সংস্কৃতির পাশাপাশি আধুনিক ও প্রতিযোগীতা মূলক বিশ্বের
                    শিক্ষাব্যবস্থার সাথে যেন তালমিলিয়ে এগিয়ে যেতে পারে তদ্রূপ
                    শিক্ষা কার্যক্রম পরিচালনা করা, সমাজিক সম্পৃতি বৃদ্ধি করা,
                    ন্যায় বিচার প্রতিষ্ঠা করা এবং আল্লাহর জমিনে আল্লাহর আইন
                    প্রতিষ্ঠা করাই আমাদের লক্ষ্য ও উদ্দেশ্য।
                </p>
                <p className="text-lg text-gray-700 mb-4">
                    <h1 className="font-bold my-6">
                        সঞ্চয়নের বিনিয়োগ প্রকল্প সমূহ:
                    </h1>
                    <ul className="flex flex-col gap-3">
                        {invest.map((project) => (
                            <li key={project.id}>{project.text}</li>
                        ))}
                    </ul>
                </p>
                <p className="text-lg text-gray-700 mb-4">
                    <h1 className="font-bold my-4">সঞ্চয়নের সুযোগ সুবিধাঃ</h1>

                    <ul className="flex flex-col gap-4">
                        {facilities.map((facility) => (
                            <li key={facility.id}>
                                {facility.text}
                                {facility.link && (
                                    <a
                                        href={facility.link.url}
                                        className="font-bold text-blue-500 hover:underline"
                                    >
                                        {facility.link.text}
                                    </a>
                                )}
                                {facility.textAfterLink}
                            </li>
                        ))}
                    </ul>
                </p>
            </div>
        </>
    );
};
export default About;
