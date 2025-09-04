import facilities from "../../data/facilities.json";
import invest from "../../data/invest-program.json";
import AboutSanchayanbd from "./AboutSanchayanbd";
import H1 from "./custom-tags/H1";

const About = () => {
    return (
        <>
            <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg my-12">
                <H1>আমাদের সম্পর্কে</H1>
                <h1 className="font-bold dark:text-gray-300">সঞ্চয়নের লক্ষ্য ও উদ্দেশ্যঃ</h1>
                <AboutSanchayanbd />
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    <h1 className="font-bold my-6">
                        সঞ্চয়নের বিনিয়োগ প্রকল্প সমূহ:
                    </h1>
                    <ul className="flex flex-col gap-3">
                        {invest.map((project) => (
                            <li key={project.id}>{project.text}</li>
                        ))}
                    </ul>
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                    <h1 className="font-bold my-4">সঞ্চয়নের সুযোগ সুবিধাঃ</h1>

                    <ul className="flex flex-col gap-4">
                        {facilities.map((facility) => (
                            <li key={facility.id}>
                                {facility.text}
                                {facility.link && (
                                    <a
                                        href={facility.link.url}
                                        className="font-bold text-blue-500 dark:text-blue-300 hover:underline"
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
