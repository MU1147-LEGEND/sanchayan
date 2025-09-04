export default function DPS_Scheme() {
    return (
        <div className=" w-full bg-white dark:bg-gray-800 dark:text-gray-300">
            <div className=" mx-auto">
                <div className="overflow-x-auto rounded-2xl border">
                    <table className="min-w-full text-center border-collapse">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-4 py-3 border">মাসিক জমা</th>
                                <th className="px-4 py-3 border">
                                    ১ বছর মেয়াদি
                                    <br />
                                    মোট জমা
                                </th>
                                <th className="px-4 py-3 border">
                                    ২ বছর মেয়াদি
                                    <br />
                                    মোট জমা
                                </th>
                                <th className="px-4 py-3 border">
                                    ৩ বছর মেয়াদি
                                    <br />
                                    মোট জমা
                                </th>
                                <th className="px-4 py-3 border">
                                    ৪ বছর মেয়াদি
                                    <br />
                                    মোট জমা
                                </th>
                                <th className="px-4 py-3 border">
                                    ৫ বছর মেয়াদি
                                    <br />
                                    মোট জমা
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-600">
                                <td className="border px-4 py-2">৫০০</td>
                                <td className="border px-4 py-2">৬,০০০</td>
                                <td className="border px-4 py-2">১২,০০০</td>
                                <td className="border px-4 py-2">১৮,০০০</td>
                                <td className="border px-4 py-2">২৪,০০০</td>
                                <td className="border px-4 py-2">৩০,০০০</td>
                            </tr>
                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-600">
                                <td className="border px-4 py-2">১,০০০</td>
                                <td className="border px-4 py-2">১২,০০০</td>
                                <td className="border px-4 py-2">২৪,০০০</td>
                                <td className="border px-4 py-2">৩৬,০০০</td>
                                <td className="border px-4 py-2">৪৮,০০০</td>
                                <td className="border px-4 py-2">৬০,০০০</td>
                            </tr>
                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-600">
                                <td className="border px-4 py-2">২,০০০</td>
                                <td className="border px-4 py-2">২৪,০০০</td>
                                <td className="border px-4 py-2">৪৮,০০০</td>
                                <td className="border px-4 py-2">৭২,০০০</td>
                                <td className="border px-4 py-2">৯৬,০০০</td>
                                <td className="border px-4 py-2">১,২০,০০০</td>
                            </tr>
                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-600">
                                <td className="border px-4 py-2">৩,০০০</td>
                                <td className="border px-4 py-2">৩৬,০০০</td>
                                <td className="border px-4 py-2">৭২,০০০</td>
                                <td className="border px-4 py-2">১,০৮,০০০</td>
                                <td className="border px-4 py-2">১,৪৪,০০০</td>
                                <td className="border px-4 py-2">১,৮০,০০০</td>
                            </tr>
                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-600">
                                <td className="border px-4 py-2">৪,০০০</td>
                                <td className="border px-4 py-2">৪৮,০০০</td>
                                <td className="border px-4 py-2">৯৬,০০০</td>
                                <td className="border px-4 py-2">১,৪৪,০০০</td>
                                <td className="border px-4 py-2">১,৯২,০০০</td>
                                <td className="border px-4 py-2">২,৪০,০০০</td>
                            </tr>
                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-600">
                                <td className="border px-4 py-2">৫,০০০</td>
                                <td className="border px-4 py-2">৬০,০০০</td>
                                <td className="border px-4 py-2">১,২০,০০০</td>
                                <td className="border px-4 py-2">১,৮০,০০০</td>
                                <td className="border px-4 py-2">২,৪০,০০০</td>
                                <td className="border px-4 py-2">৩,০০,০০০</td>
                            </tr>
                            <tr className="bg-gray-50 font-semibold hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600">
                                <td className="border px-4 py-2">
                                    মুনাফার হার
                                </td>
                                <td className="border px-4 py-2">১০% - ১২%</td>
                                <td className="border px-4 py-2">১০% - ১২%</td>
                                <td className="border px-4 py-2">১০% - ১২%</td>
                                <td className="border px-4 py-2">১০% - ১২%</td>
                                <td className="border px-4 py-2">১০% - ১২%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="my-4">
                    বিঃদ্রঃ মুনাফার হার নীট মুনাফার উপর নির্ভর করবে। সুতরাং
                    মুনাফার হার পরিবর্তনীয়।
                </p>
            </div>
        </div>
    );
}
