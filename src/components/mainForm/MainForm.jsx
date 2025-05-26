import { useState } from "react";
import { storage, db } from "../../firebase"; // firebase config path
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const MemberForm = () => {
  const initialForm = {
      memberType: "",
      accountNumber: "",
      nameBn: "",
      nameEn: "",
      fatherNameEn: "",
      motherNameEn: "",
      dob: "",
      gender: "",
      religion: "",
      nid: "",
      mobile: "",
      email: "",
      presentAddress: "",
      permanentAddress: "",
      nationality: "বাংলাদেশী",
      photo: null,
      signature: null,
      nominee: {
          nameBn: "",
          nameEn: "",

          fatherNameEn: "",

          motherNameEn: "",
          dob: "",
          gender: "",
          nid: "",
          mobile: "",
          presentAddress: "",
          permanentAddress: "",
          photo: null,
          signature: null,
      },
  };
    const [form, setForm] = useState(initialForm);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name.includes("nominee.")) {
            const key = name.split(".")[1];
            setForm((prev) => ({
                ...prev,
                nominee: { ...prev.nominee, [key]: files ? files[0] : value },
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: files ? files[0] : value,
            }));
        }
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setIsSubmitted(true);
    //     console.log(form);
    //     alert("Form submitted successfully!");
    // };

    // storing the information in firebase
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        

        try {
            // Step 1: Upload photo and signature
            const uploadFile = async (file, path) => {
                const storageRef = ref(storage, path);
                await uploadBytes(storageRef, file);
                return await getDownloadURL(storageRef);
            };

            const photoURL = form.photo
                ? await uploadFile(
                      form.photo,
                      `members/${form.accountNumber}/photo.jpg`
                  )
                : null;

            const nomineePhotoURL = form.nominee.photo
                ? await uploadFile(
                      form.nominee.photo,
                      `members/${form.accountNumber}/nominee_photo.jpg`
                  )
                : null;

            // Step 2: Save all data to Firestore
            const formDataToSave = {
                ...form,
                photo: photoURL,
                nominee: {
                    ...form.nominee,
                    photo: nomineePhotoURL,
                },
                createdAt: new Date().toISOString(),
            };

            await addDoc(collection(db, "members"), formDataToSave);
            setIsSubmitted(true);
            console.log("Form data saved successfully:", formDataToSave);
        } catch (error) {
            console.error("Form submission error:", error);
            alert("❌ ফর্ম জমা দিতে সমস্যা হয়েছে।");
        }
    };
    return (
        <form
            onSubmit={handleSubmit}
            className="p-6 max-w-3xl mx-auto space-y-4"
        >
            {isSubmitted ? (
                <p className="text-green-600 font-semibold mt-4">
                    ✅ ফর্ম সফলভাবে জমা হয়েছে!
                </p>
            ) : (
                <>
                    <p className="text-lg font-semibold">
                        এই মর্মে প্রত্যয়ন করছি যে, আমি নিম্ন স্বাক্ষরকারী
                        <span className="bg-yellow-400 text-black px-1 py-1">
                            {form.nameBn || "নাম (বাংলায়)"}
                        </span>{" "}
                        সজ্ঞানে ও সেচ্ছায় অত্র প্রতিষ্ঠানের সকল শর্ত ও নিয়ম-নীতি
                        মেনে সদস্য ফর্ম পূরণ করছি।
                    </p>

                    <div>
                        <label className="block font-semibold">
                            সদস্যের ধরন:
                        </label>
                        <select
                            name="memberType"
                            value={form.memberType}
                            onChange={handleChange}
                            required
                            className="w-full border p-2"
                        >
                            <option value="">-- ধরন নির্বাচন করুন --</option>
                            <option>কার্যনির্বাহী পরিষদের সদস্য</option>
                            <option>সাধারণ সদস্য</option>
                            <option>সঞ্চয়ী সদস্য</option>
                        </select>
                    </div>

                    <input
                        type="text"
                        name="accountNumber"
                        onChange={handleChange}
                        value={form.accountNumber}
                        required
                        placeholder="সদস্য/হিসাব নম্বর"
                        className="w-full border p-2"
                    />

                    <h3 className="text-md font-bold mt-4">
                        সদস্যের ব্যক্তিগত তথ্য
                    </h3>
                    <label className="block font-semibold">
                        সদস্যের নাম (বাংলায়):
                    </label>
                    <input
                        type="text"
                        name="nameBn"
                        value={form.nameBn}
                        onChange={handleChange}
                        placeholder="নাম (বাংলায়)"
                        className="w-full border p-2"
                        required
                    />
                    <label className="block font-semibold">
                        সদস্যের নাম (ইংরেজিতে):
                    </label>
                    <input
                        type="text"
                        name="nameEn"
                        value={form.nameEn}
                        onChange={handleChange}
                        placeholder="Name (in English)"
                        className="w-full border p-2"
                        required
                    />
                    <label className="block font-semibold">পিতার নাম:</label>
                    <input
                        type="text"
                        name="fatherNameEn"
                        value={form.fatherNameEn}
                        onChange={handleChange}
                        placeholder="Father's Name (English)"
                        className="w-full border p-2"
                        required
                    />
                    <label className="block font-semibold">মাতার নাম:</label>
                    <input
                        type="text"
                        name="motherNameEn"
                        value={form.motherNameEn}
                        onChange={handleChange}
                        placeholder="Mother's Name (English)"
                        className="w-full border p-2"
                        required
                    />
                    <label className="block font-semibold">জন্ম তারিখ:</label>
                    <input
                        type="date"
                        name="dob"
                        value={form.dob}
                        onChange={handleChange}
                        className="w-full border p-2"
                        required
                    />

                    <div>
                        <label className="block font-semibold">লিঙ্গ:</label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="পুরুষ"
                                onChange={handleChange}
                                checked={form.gender === "পুরুষ"}
                            />{" "}
                            পুরুষ
                        </label>
                        <label className="ml-4">
                            <input
                                type="radio"
                                name="gender"
                                value="মহিলা"
                                onChange={handleChange}
                                checked={form.gender === "মহিলা"}
                            />{" "}
                            মহিলা
                        </label>
                    </div>
                    <label className="block font-semibold">ধর্ম:</label>
                    <input
                        type="text"
                        name="religion"
                        value={form.religion}
                        onChange={handleChange}
                        placeholder="ধর্ম"
                        className="w-full border p-2"
                        required
                    />
                    <label className="block font-semibold">
                        এনআইডি/জন্মনিবন্ধন নম্বর:
                    </label>
                    <input
                        type="text"
                        name="nid"
                        value={form.nid}
                        onChange={handleChange}
                        placeholder="এনআইডি/জন্মনিবন্ধন নম্বর"
                        className="w-full border p-2"
                        required
                    />
                    <label className="block font-semibold">মোবাইল নম্বর:</label>
                    <input
                        type="text"
                        name="mobile"
                        value={form.mobile}
                        onChange={handleChange}
                        placeholder="মোবাইল নম্বর"
                        className="w-full border p-2"
                        required
                    />
                    <label className="block font-semibold">
                        ইমেইল (যদি থাকে):
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="ইমেইল (যদি থাকে)"
                        className="w-full border p-2"
                    />
                    <label className="block font-semibold">
                        বর্তমান ঠিকানা:
                    </label>
                    <textarea
                        name="presentAddress"
                        value={form.presentAddress}
                        onChange={handleChange}
                        placeholder="বর্তমান ঠিকানা"
                        className="w-full border p-2"
                        required
                    ></textarea>
                    <label className="block font-semibold">
                        স্থায়ী ঠিকানা:
                    </label>
                    <textarea
                        name="permanentAddress"
                        value={form.permanentAddress}
                        onChange={handleChange}
                        placeholder="স্থায়ী ঠিকানা"
                        className="w-full border p-2"
                        required
                    ></textarea>
                    <label className="block font-semibold">জাতীয়তা:</label>

                    <input
                        type="text"
                        name="nationality"
                        value={form.nationality}
                        onChange={handleChange}
                        className="w-full border p-2"
                        required
                    />
                    <label className="block font-semibold">
                        ছবি (পাসপোর্ট টাইপ):
                    </label>
                    <input
                        type="file"
                        name="photo"
                        onChange={handleChange}
                        className="w-full border p-2"
                        required
                    />
                    {form.photo && (
                        <img
                            src={URL.createObjectURL(form.photo)}
                            alt="ছবি প্রিভিউ"
                            className="w-24 h-24 object-cover mt-2"
                        />
                    )}
                    <label className="block font-semibold">স্বাক্ষর:</label>
                    <input
                        type="text"
                        name="signature"
                        defaultValue={form.signature || form.nameEn}
                        onChange={handleChange}
                        placeholder="স্বাক্ষর (ইংরেজিতে)"
                        className="w-full border p-2"
                    />

                    <h3 className="text-lg font-bold mt-4">নমিনির তথ্য</h3>
                    <label className="block font-semibold">
                        নমিনির নাম (বাংলায়):
                    </label>
                    <input
                        type="text"
                        name="nominee.nameBn"
                        value={form.nominee.nameBn}
                        onChange={handleChange}
                        placeholder="নাম (বাংলায়)"
                        className="w-full border p-2"
                        required
                    />
                    <label className="block font-semibold">
                        নমিনির নাম (ইংরেজিতে):
                    </label>
                    <input
                        type="text"
                        name="nominee.nameEn"
                        value={form.nominee.nameEn}
                        onChange={handleChange}
                        placeholder="Name (English)"
                        className="w-full border p-2"
                        required
                    />
                    <label className="block font-semibold">
                        নমিনির পিতার নাম:
                    </label>

                    <input
                        type="text"
                        name="nominee.fatherNameEn"
                        value={form.nominee.fatherNameEn}
                        onChange={handleChange}
                        placeholder="Father's Name (English)"
                        className="w-full border p-2"
                        required
                    />

                    <label className="block font-semibold">
                        নমিনির মাতার নাম:
                    </label>
                    <input
                        type="text"
                        name="nominee.motherNameEn"
                        value={form.nominee.motherNameEn}
                        onChange={handleChange}
                        placeholder="Mother's Name (English)"
                        className="w-full border p-2"
                        required
                    />
                    <label className="block font-semibold">
                        নমিনির জন্ম তারিখ:
                    </label>

                    <input
                        type="date"
                        name="nominee.dob"
                        value={form.nominee.dob}
                        onChange={handleChange}
                        className="w-full border p-2"
                        required
                    />

                    <div>
                        <label className="block font-semibold">লিঙ্গ:</label>
                        <label>
                            <input
                                type="radio"
                                name="nominee.gender"
                                value="পুরুষ"
                                onChange={handleChange}
                                checked={form.nominee.gender === "পুরুষ"}
                            />{" "}
                            পুরুষ
                        </label>
                        <label className="ml-4">
                            <input
                                type="radio"
                                name="nominee.gender"
                                value="মহিলা"
                                onChange={handleChange}
                                checked={form.nominee.gender === "মহিলা"}
                            />{" "}
                            মহিলা
                        </label>
                    </div>

                    <label className="block font-semibold">
                        নমিনির এনআইডি/জন্মনিবন্ধন নম্বর:
                    </label>
                    <input
                        type="text"
                        name="nominee.nid"
                        value={form.nominee.nid}
                        onChange={handleChange}
                        placeholder="এনআইডি/জন্মনিবন্ধন নম্বর"
                        className="w-full border p-2"
                        required
                    />
                    <label className="block font-semibold">
                        নমিনির মোবাইল নম্বর (যদি থাকে):
                    </label>
                    <input
                        type="text"
                        name="nominee.mobile"
                        value={form.nominee.mobile}
                        onChange={handleChange}
                        placeholder="মোবাইল নম্বর"
                        className="w-full border p-2"
                    />

                    <label className="block font-semibold">
                        নমিনির বর্তমান ঠিকানা:
                    </label>
                    <textarea
                        name="nominee.presentAddress"
                        value={form.nominee.presentAddress}
                        onChange={handleChange}
                        placeholder="বর্তমান ঠিকানা"
                        className="w-full border p-2"
                        required
                    ></textarea>
                    <label className="block font-semibold">
                        নমিনির স্থায়ী ঠিকানা:
                    </label>
                    <textarea
                        name="nominee.permanentAddress"
                        value={form.nominee.permanentAddress}
                        onChange={handleChange}
                        placeholder="স্থায়ী ঠিকানা"
                        className="w-full border p-2"
                        required
                    ></textarea>

                    <label className="block font-semibold">নমিনির ছবি:</label>
                    <input
                        type="file"
                        name="nominee.photo"
                        onChange={handleChange}
                        className="w-full border p-2"
                    />
                    {form.nominee.photo && (
                        <img
                            src={URL.createObjectURL(form.nominee.photo)}
                            alt="নমিনির ছবি প্রিভিউ"
                            className="w-24 h-24 object-cover mt-2"
                        />
                    )}
                    <label className="block font-semibold">
                        নমিনির স্বাক্ষর:
                    </label>
                    <input
                        type="text"
                        name="nominee.signature"
                        defaultValue={
                            form.nominee.signature || form.nominee.nameEn
                        }
                        onChange={handleChange}
                        placeholder="নমিনির স্বাক্ষর (ইংরেজিতে)"
                        disabled
                        className="w-full border p-2"
                        required
                    />
                    <div>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200 cursor-pointer w-1/3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            জমা দিন
                        </button>
                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="bg-red-600 text-white px-4 py-2 rounded ml-2 hover:bg-blue-700 transition-colors duration-200 cursor-pointer w-1/3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            বাতিল করুন
                        </button>
                    </div>
                </>
            )}
        </form>
    );
};

export default MemberForm;
