import { getAuth } from "firebase/auth";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    setDoc,
} from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/sanchayan logo.jpg"; // logo path
import { db } from "../../firebase"; // firebase config path
import { AuthContext } from "../loginAuthContext";

const MemberForm1 = () => {
    const initialForm = {
        memberType: "",
        subMemberType: "",
        accountNumber: "",
        refarenceNumber: "",
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
        signature: "",
        verified: false,
        nominee: {
            nameBn: "",
            nameEn: "",
            fatherNameEn: "",
            motherNameEn: "",
            relation: "",
            dob: "",
            gender: "",
            nid: "",
            mobile: "",
            presentAddress: "",
            permanentAddress: "",
            photo: null,
            signature: "",
        },
    };

    const [form, setForm] = useState(initialForm);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [alreadySubmitted, setAlreadySubmitted] = useState(false); // for preventing the again submission
    const [isAgreed, setIsAgreed] = useState(false);
    const [error, setError] = useState(null);
    const { loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const formRef = useRef(null);
    const auth = getAuth();
    const user = auth.currentUser;
    const subOptions = {
        "কার্যনির্বাহী পরিষদের সদস্য": ["কার্যনির্বাহী পরিষদের সদস্য"],
        "সাধারণ সদস্য": ["সাধারণ সদস্য"],
        "সঞ্চয়ী সদস্য": [
            "সাপ্তাহিক সঞ্চয় হিসাব",
            "মাসিক সঞ্চয় হিসাব (DPS)",
            "স্থায়ী সঞ্চয় হিসাব (FDR)",
            "শিক্ষার্থী সঞ্চয় হিসাব",
            "হজ্জ্ব আমানত হিসাব",
        ],
    };

    useEffect(() => {
        if (user) {
            setForm((prev) => ({
                ...prev,
                email: user.email,
                nameEn: user.displayName,
            }));
        }
    }, [user]);
    // set the initial account number when the component mounts
    useEffect(() => {
        const setAccountNumber = async () => {
            if (loading || !user) return;

            const docRef = doc(db, "members", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                // 🔁 আগের accountNumber আছে, ওটাই বসবে
                const existingAccountNumber = docSnap.data().accountNumber;
                setForm((prev) => ({
                    ...prev,
                    accountNumber: existingAccountNumber,
                }));
            } else {
                // 🔢 নতুন accountNumber calculate করবে
                const q = query(
                    collection(db, "members"),
                    orderBy("accountNumber", "desc"),
                    limit(1)
                );

                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const maxAccount =
                        querySnapshot.docs[0].data().accountNumber;
                    setForm((prev) => ({
                        ...prev,
                        accountNumber: Number(maxAccount) + 1,
                    }));
                } else {
                    setForm((prev) => ({
                        ...prev,
                        accountNumber: 1001,
                    }));
                }
            }
        };

        setAccountNumber();
    }, [user]);

    // finding if the user sumitted already
    useEffect(() => {
        const checkSubmission = async () => {
            if (user) {
                const docRef = doc(db, "members", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setAlreadySubmitted(true);
                }
            }
        };
        checkSubmission();
    }, [user]);
    // find the max account number in the database

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name.includes("nominee.")) {
            const key = name.split(".")[1];
            setForm((prev) => ({
                ...prev,
                nominee: { ...prev.nominee, [key]: files ? files[0] : value },
            }));
        } else {
            setForm((prev) => {
                const updatedForm = {
                    ...prev,
                    [name]: files ? files[0] : value,
                };

                // যদি সদস্য ধরন চেঞ্জ হয়, তাহলে সাব-মেম্বার রিসেট করবে
                if (name === "memberType") {
                    updatedForm.subMemberType = "";
                }

                return updatedForm;
            });
        }
    };

    // submitting and saving form data
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAgreed) {
            setError("আপনাকে নিরাপত্তা নীতিসমুহের সাথে একমত হতে হবে।");
            return;
        }

        // Submit button hide
        const submitButton = document.getElementById("submit-discard");
        submitButton.style.display = "none";
        // Header and announcementbar hide
        const header = document.getElementById("header");
        header.style.display = "none";
        // Footer hide
        const footer = document.getElementById("footer");
        footer.style.display = "none";

        // Wait a moment to ensure button is hidden before capture
        setTimeout(() => {
            window.print();

            // Show it back after print (optional)
            setTimeout(() => {
                submitButton.style.display = "block";
                header.style.display = "block";
                footer.style.display = "block";
            }, 500);
        }, 300);

        try {
            // Save all data to Firestore
            const formDataToSave = {
                ...form,
                createdAt: new Date().toISOString(),
            };

            // await addDoc(collection(db, "members"), formDataToSave);
            await setDoc(doc(db, "members", user.uid), formDataToSave, {
                merge: true,
            });
            setTimeout(() => setIsSubmitted(true), 700);
            // console.log("Form data saved successfully:", formDataToSave);
        } catch (error) {
            console.error("Form submission error:", error);
            alert("❌ ফর্ম জমা দিতে সমস্যা হয়েছে।");
        }
    };

    // { handle uploading image
    const handleUpload = async (e, fieldName) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);

        const apiKey = "65d02a3a04552785c182ff19885d6f2d"; // replace with your key

        try {
            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${apiKey}`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await res.json();
            if (data.success) {
                const url = data.data.url;
                if (fieldName.startsWith("nominee.")) {
                    const key = fieldName.split(".")[1];
                    setForm((prev) => ({
                        ...prev,
                        nominee: {
                            ...prev.nominee,
                            [key]: url,
                        },
                    }));
                } else {
                    setForm((prev) => ({
                        ...prev,
                        [fieldName]: url,
                    }));
                }
            } else {
                alert("❌ Upload failed!");
            }
        } catch (err) {
            console.error("Upload error:", err);
            alert("❌ Upload error");
        }
    };

    return (
        <div className="relative h-full mb-10">
            <div className="w-[95%] m-auto text-center mb-6 flex items-center justify-center gap-4">
                <div className="w-[15%]">
                    <img
                        src={logo}
                        alt="Sanchayan Logo"
                        className="w-16 h-16 mb-4 "
                    />
                </div>
                <div className="w-[30%]">
                    <h2
                        className="text-4xl font-extrabold text-left mb-6 bg-gradient-to-r from-fuchsia-500 via-blue-500 to-orange-300 bg-clip-text text-transparent drop-shadow-lg animate-gradient-x"
                        style={{
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        সঞ্চয়ন
                    </h2>
                </div>
                <div className="w-[45%]">
                    <p className="text-center text-orange-900 text-sm font-semibold">
                        "আল্লাহ তায়ালা ব্যবসাকে হালাল করেছেন এবং সুদকে হারাম
                        করেছেন"। (সূরা আল-বাকারা, আয়াতঃ ২৭৫)
                    </p>
                </div>
            </div>
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="p-6 max-w-3xl mx-auto space-y-4 bg-white rounded-xl shadow-2xl border border-gray-100"
            >
                <div>
                    <h4
                        className="text-sm md:text-2xl font-bold text-center mb-6 bg-gradient-to-r from-green-500 via-cyan-600 to-green-600 bg-clip-text text-transparent drop-shadow-lg tracking-wide animate-gradient-x pb-2"
                        style={{
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                            WebkitTextFillColor: "transparent",
                            letterSpacing: "0.05em",
                        }}
                    >
                        ইসলামী শরীয়াহ্ ভিত্তিক পরিচালিত ব্যবসায় প্রতিষ্ঠান।
                    </h4>
                </div>
                <span className="w-full block border-dashed border-b-3 mt-2 border-green-500"></span>
                {isSubmitted ? (
                    <p className="text-green-600 font-semibold mt-4 ">
                        ✅ ফর্ম সফলভাবে জমা হয়েছে! ভেরিফিকেশনের জন্য দয়া করে
                        অপেক্ষা করুন। ১২-২৪ ঘন্টার মধ্যে প্রোফাইল ভেরিফাই করা
                        হবে।
                    </p>
                ) : (
                    <>
                        {/* new member selectbox */}
                        <div className="space-y-4">
                            {/* মূল সদস্য ধরন */}
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
                                    <option value="">
                                        -- ধরন নির্বাচন করুন --
                                    </option>
                                    <option value="কার্যনির্বাহী পরিষদের সদস্য">
                                        কার্যনির্বাহী পরিষদের সদস্য
                                    </option>
                                    <option value="সাধারণ সদস্য">
                                        সাধারণ সদস্য
                                    </option>
                                    <option value="সঞ্চয়ী সদস্য">
                                        সঞ্চয়ী সদস্য
                                    </option>
                                </select>
                            </div>

                            {/* সাব-মেম্বার ধরন, যদি প্রযোজ্য হয় */}
                            {form.memberType && (
                                <div>
                                    <label className="block font-semibold">
                                        সদস্যের উপ-ধরন:
                                    </label>
                                    <select
                                        name="subMemberType"
                                        value={form.subMemberType}
                                        onChange={handleChange}
                                        required
                                        className="w-full border p-2"
                                    >
                                        <option value="">
                                            -- উপ-ধরন নির্বাচন করুন --
                                        </option>
                                        {subOptions[form.memberType].map(
                                            (sub, index) => (
                                                <option key={index} value={sub}>
                                                    {sub}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            )}
                        </div>
                        <label className="block font-semibold">
                            হিসাব নং / একাউন্ট নম্বর:
                        </label>
                        <input
                            type="text"
                            name="accountNumber"
                            onChange={handleChange}
                            value={form.accountNumber}
                            readOnly
                            placeholder="সদস্য/হিসাব নম্বর"
                            className="w-full border p-2"
                        />
                        <label className="block font-semibold">
                            রেফারেন্স নম্বর:
                        </label>
                        <input
                            type="text"
                            name="refarenceNumber"
                            onChange={handleChange}
                            value={form.refarenceNumber}
                            placeholder="রেফারেন্স নম্বর"
                            className="w-full border p-2"
                        />
                        <span className="w-full block border-dashed border-b-3 mt-2 border-black"></span>
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
                        <label className="block font-semibold">
                            পিতার নাম:
                        </label>
                        <input
                            type="text"
                            name="fatherNameEn"
                            value={form.fatherNameEn}
                            onChange={handleChange}
                            placeholder="Father's Name (English)"
                            className="w-full border p-2"
                            required
                        />
                        <label className="block font-semibold">
                            মাতার নাম:
                        </label>
                        <input
                            type="text"
                            name="motherNameEn"
                            value={form.motherNameEn}
                            onChange={handleChange}
                            placeholder="Mother's Name (English)"
                            className="w-full border p-2"
                            required
                        />
                        <label className="block font-semibold">
                            জন্ম তারিখ:
                        </label>
                        <input
                            type="date"
                            name="dob"
                            value={form.dob}
                            onChange={handleChange}
                            className="w-full border p-2"
                            required
                        />

                        <div>
                            <label className="block font-semibold">
                                লিঙ্গ:
                            </label>
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
                        <label className="block font-semibold">
                            মোবাইল নম্বর:
                        </label>
                        <input
                            type="text"
                            name="mobile"
                            value={form.mobile}
                            onChange={handleChange}
                            placeholder="মোবাইল নম্বর"
                            className="w-full border p-2"
                            required
                        />
                        <label className="block font-semibold">ইমেইল:</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="ইমেইল"
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
                            ছবি (সদস্যের):
                        </label>
                        <input
                            type="file"
                            name="photo"
                            onChange={(e) => {
                                handleUpload(e, "photo");
                            }}
                            className="w-full border p-2"
                            // required
                        />
                        {form.photo && (
                            <img
                                src={form.photo}
                                alt="সদস্যের ছবি"
                                className="w-24 h-24 object-cover mt-2"
                            />
                        )}
                        <label className="block font-semibold">স্বাক্ষর:</label>
                        <input
                            type="text"
                            name="signature"
                            value={form.signature || form.nameEn}
                            onChange={handleChange}
                            placeholder="স্বাক্ষর"
                            className="w-full border p-2"
                        />
                        <span className="w-full block border-dashed border-b-3 mt-2 border-black"></span>
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
                            নমিনির সাথে সদস্যের সম্পর্ক:
                        </label>
                        <input
                            type="text"
                            name="nominee.relation"
                            value={form.nominee.relation}
                            onChange={handleChange}
                            placeholder="Relation with Member"
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
                            <label className="block font-semibold">
                                লিঙ্গ:
                            </label>
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

                        <label className="block font-semibold">
                            নমিনির ছবি:
                        </label>
                        <input
                            type="file"
                            name="nominee.photo"
                            onChange={(e) => {
                                handleUpload(e, "nominee.photo");
                            }}
                            className="w-full border p-2"
                        />
                        {form.nominee.photo && (
                            <img
                                src={form.nominee.photo}
                                alt="নমিনির ছবি"
                                className="w-24 h-24 object-cover mt-2"
                            />
                        )}
                        <label className="block font-semibold">স্বাক্ষর:</label>
                        <input
                            type="text"
                            name="nominee.signature"
                            value={
                                form.nominee.signature || form.nominee.nameEn
                            }
                            onChange={handleChange}
                            placeholder="নমিনির স্বাক্ষর"
                            className="w-full border p-2"
                            required
                        />
                        {/* animated checkbox agree terms and conditions */}

                        <label className="flex items-center gap-2 cursor-pointer select-none">
                            <div className="w-5 h-5 border-2 border-gray-400 rounded-md flex items-center justify-center transition-all duration-300 ">
                                <input
                                    type="checkbox"
                                    className="peer hidden"
                                    checked={isAgreed}
                                    onChange={(e) => {
                                        setError("");
                                        setIsAgreed(e.target.checked);
                                    }}
                                    name="checkTerms"
                                />
                                <svg
                                    className="z-50 w-4 h-4 text-black transition-all duration-300 -translate-x-4 translate-y-4 opacity-0 peer-checked:translate-x-0 peer-checked:translate-y-0 peer-checked:opacity-100"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <p className="text-lg font-semibold">
                                এই মর্মে প্রত্যয়ন করছি যে, আমি নিম্ন
                                স্বাক্ষরকারী
                                <span className="bg-yellow-400 text-black px-1 py-1">
                                    {form.nameBn || "নাম (বাংলায়)"}
                                </span>{" "}
                                সজ্ঞানে ও স্বেচ্ছায় অত্র প্রতিষ্ঠানের সকল শর্ত
                                ও নিয়ম-নীতি মেনে সদস্য ফর্ম পূরণ করছি।
                            </p>
                            <br />
                        </label>
                        {error && (
                            <p className="text-red-500 text-sm block">
                                {error}
                            </p>
                        )}
                        <div id="submit-discard">
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

            {!user && (
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/5 backdrop-blur-[1.5px] flex flex-col items-center justify-center z-10 text-center p-6 rounded h-full ">
                    <div className="absolute top-0 left-0 right-0 bottom-0 h-[70vh] z-10 text-center p-6 rounded flex flex-col items-center justify-center">
                        <p className="text-xl font-semibold mb-4 text-red-600">
                            You must login to fill the form
                        </p>
                        <button
                            onClick={() => navigate("/login")}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer active:translate-y-0.5"
                        >
                            Go to Login
                        </button>
                    </div>
                </div>
            )}
            {/* if user exists and submitted form */}
            {alreadySubmitted && (
                <div className="fixed inset-0 bg-white/50 backdrop-blur-sm flex flex-col items-center justify-center z-10 text-center p-6 rounded h-screen">
                    <p className="text-xl font-semibold mb-4 text-red-600">
                        আপনি একটি ফর্ম জমা দিয়েছেন।
                    </p>
                    <button
                        onClick={() => navigate("/login")}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer active:translate-y-0.5"
                    >
                        ড্যাশবোর্ডে যান।
                    </button>
                    <br />
                    {" অথবা "} <br /> <br />
                    <button
                        onClick={() => setAlreadySubmitted(false)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer active:translate-y-0.5"
                    >
                        ফর্ম এডিট করুন (সতর্কবার্তাঃ ফর্মের কোনো বক্স খালি রাখলে
                        সেটি ফাকা থাকবে। )
                    </button>
                </div>
            )}
        </div>
    );
};

export default MemberForm1;
