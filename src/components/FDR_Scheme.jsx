import React from "react";

const FDR_Scheme = () => {
    return (
        <div className="p-6">
            <h2 className="text-xl font-bold text-center mb-4">
                FDR সংক্রান্ত একটি তালিকা:
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-400 text-center">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-400 px-4 py-2">
                                জমা টাকার পরিমাণ
                            </th>
                            <th className="border border-gray-400 px-4 py-2">
                                মুনাফার হার
                            </th>
                            <th className="border border-gray-400 px-4 py-2">
                                বার্ষিক মুনাফা
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-gray-100">
                            <td className="border border-gray-400 px-4 py-2">
                                ৫০,০০০/-
                            </td>
                            {/* এখানে rowspan ব্যবহার */}
                            <td
                                rowSpan={6}
                                className="border border-gray-400 px-4 py-2 align-middle"
                            >
                                ১২% - ১৫%
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                ৬,০০০
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-100">
                            <td className="border border-gray-400 px-4 py-2">
                                ১,০০,০০০/-
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                ১২,০০০
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-100">
                            <td className="border border-gray-400 px-4 py-2">
                                ২,০০,০০০/-
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                ২৪,০০০
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-100">
                            <td className="border border-gray-400 px-4 py-2">
                                ৩,০০,০০০/-
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                ৩৬,০০০
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-100">
                            <td className="border border-gray-400 px-4 py-2">
                                ৪,০০,০০০/-
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                ৪৮,০০০
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-100">
                            <td className="border border-gray-400 px-4 py-2">
                                ৫,০০,০০০/-
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                ৬০,০০০
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FDR_Scheme;
