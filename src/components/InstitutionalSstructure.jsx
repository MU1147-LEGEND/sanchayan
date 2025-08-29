import React from "react";

export default function InstitutionalStructure() {
    return (
        <div className="w-full min-h-screen bg-neutral-50 flex justify-center p-6">
            <div className="bg-white shadow-xl rounded-2xl max-w-3xl w-full p-8 leading-8 font-[Noto Sans Bengali]">
                <h2 className="text-xl font-bold mb-4">প্রতিষ্ঠানিক কাঠামোঃ</h2>
                <p className="mb-4">
                    সংস্থার দুটি স্তর বা কমিটিতে সমন্বয়ে পরিচালিত হবে। <br />
                    ১. পরিচালনা পর্ষদ (Board of Directors) <br />
                    ২. কার্যনির্বাহী পরিষদ (Exicative Committee)
                </p>

                <p className="mb-6 text-sm text-gray-700">
                    * পরিচালনা পর্ষদের সদস্য সর্বোচ্চ বিশ (২০) জন Board of
                    Directors প্রতিষ্ঠানের সর্বোচ্চ নীতি নির্ধারনী বোর্ড বা
                    সংসদ। এই বোর্ডে প্রধানতঃ চেয়ারম্যান হিসেবে গঠন করা হয়। এর
                    গঠন প্রাথমিক নিম্নরূপঃ
                </p>

                <div className="flex flex-col items-center gap-2 mb-10">
                    <span>চেয়ারম্যান</span>
                    <span>↓</span>
                    <span>ভাইস-চেয়ারম্যান</span>
                    <span>↓</span>
                    <span>জেনারেল সেক্রেটারী</span>
                    <span>↓</span>
                    <span>সদস্য - ১৭ জন।</span>
                </div>

                <p className="mb-6 text-sm text-gray-700">
                    কার্যনির্বাহী পরিষদঃ এটি প্রতিষ্ঠানের পরিচালনা পর্ষদের
                    অধীনস্থ একটি সংস্থা বা কমিটি যারা প্রতিষ্ঠানের দৈনন্দিন
                    কার্যক্রম পরিচালনা করেন। এর গঠন নিম্নরূপঃ
                </p>

                <div className="flex flex-col items-center gap-2">
                    <span>ব্যবস্থাপনা পরিচালক (MD)</span>
                    <span>↓</span>
                    <span>জেনারেল ম্যানেজার (GM)</span>
                    <span>↓</span>
                    <div className="flex items-start gap-12">
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-nowrap">অতিরিক্ত জেনারেল ম্যানেজার (AGM) - ২জন</span>
                            <span>↓</span>
                            <span>ব্রাঞ্চ ম্যানেজার (BM)</span>
                            <span>↓</span>
                            <div className="flex gap-12">
                                <span>হিসাবরক্ষক</span>
                                <span>বিক্রয়কর্মী</span>
                                <span>মার্কেটিং</span>
                            </div>
                        </div>
                    </div>
                    {/* <div className="flex flex-col items-center gap-2">
                        <span>অতিরিক্ত জেনারেল ম্যানেজার (AGM) - ২জন</span>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
