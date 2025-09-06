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
import logo from "../../assets/sanchayan-29-aug.png"; // logo path
import { db } from "../../firebase"; // firebase config path
import { AuthContext } from "../loginAuthContext";

const MemberForm1 = () => {
    const initialForm = {
        memberType: "",
        subMemberType: "",
        monthlySavings: "",
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
        signature: null,
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
        "পরিচালনা পর্ষদের সদস্য": [
            "সাপ্তাহিক সঞ্চয় হিসাব",
            "মাসিক সঞ্চয় হিসাব (DPS)",
            "স্থায়ী সঞ্চয় হিসাব (FDR)",
            "শিক্ষার্থী সঞ্চয় হিসাব",
            "হজ্জ্ব আমানত হিসাব",
        ],
        "সাধারণ সদস্য": [
            "সাপ্তাহিক সঞ্চয় হিসাব",
            "মাসিক সঞ্চয় হিসাব (DPS)",
            "স্থায়ী সঞ্চয় হিসাব (FDR)",
            "শিক্ষার্থী সঞ্চয় হিসাব",
            "হজ্জ্ব আমানত হিসাব",
        ],
        "সঞ্চয়ী হিসাব": [
            "সাপ্তাহিক সঞ্চয় হিসাব",
            "মাসিক সঞ্চয় হিসাব (DPS)",
            "স্থায়ী সঞ্চয় হিসাব (FDR)",
            "শিক্ষার্থী সঞ্চয় হিসাব",
            "হজ্জ্ব আমানত হিসাব",
        ],
    };

    // ===== Signature field states =====
    const [showSignatureModal, setShowSignatureModal] = useState(false); // modal open/close
    const [isDrawing, setIsDrawing] = useState(false); // drawing চলছে কি না

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

    //  handle uploading image
    const handleUpload = async (e, fieldName) => {
        // Safely prevent default behavior and event bubbling only if methods exist
        if (e && typeof e.preventDefault === 'function') {
            e.preventDefault();
        }
        if (e && typeof e.stopPropagation === 'function') {
            e.stopPropagation();
        }

        const file = e.target.files[0];

        // Check if file is selected
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append("image", file);

        const apiKey = "65d02a3a04552785c182ff19885d6f2d"; // imgbb api key

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
                console.error("Upload failed:", data);
                // Use a less intrusive error notification instead of alert
                setError("❌ Upload failed! Please try again.");
                // Clear error after 3 seconds
                setTimeout(() => setError(null), 3000);
            }
        } catch (err) {
            console.error("Upload error:", err);
            // Use a less intrusive error notification instead of alert
            setError(
                "❌ Upload error! Please check your connection and try again."
            );
            // Clear error after 3 seconds
            setTimeout(() => setError(null), 3000);
        }
    };

    return (
        <div className="relative h-full mb-10">
            {/* form header for desktop */}
            <div className="hidden max-w-5xl m-auto text-center mb-6 lg:flex items-center justify-between gap-4">
                <div className=" lg:w-1/4 flex items-center justify-end">
                    <img
                        src={logo}
                        alt="Sanchayan Logo"
                        className="w-16 lg:w-20 "
                    />
                </div>
                <div>
                    <h4 className="text-sm md:text-2xl text-black dark:text-gray-300 font-bold text-center drop-shadow-lg tracking-wide">
                        ইসলামী শরীয়াহ্ ভিত্তিক পরিচালিত একটি সমাজ উন্নয়ন সংস্থা।
                    </h4>
                </div>
                <div className="w-1/4 m-auto text-left">
                    <h2 className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-500 drop-shadow-lg ">
                        সঞ্চয়ন
                    </h2>
                    <p className="text-[0.5rem] text-black dark:text-gray-300 font-bold text-left text-wrap">
                        মাল্টিপারপাস <br /> কো-অপারেটিভ সোসাইটি।
                    </p>
                </div>
            </div>
            <div className="hidden lg:block w-11/12 m-auto text-center ">
                <p className="text-center text-orange-900 dark:text-orange-300 text-sm font-semibold">
                    "আল্লাহ তায়ালা ব্যবসাকে হালাল করেছেন এবং সুদকে হারাম
                    করেছেন"। (সূরা আল-বাকারা, আয়াতঃ ২৭৫)
                </p>
            </div>
            {/* form header for mobile */}
            <div className="lg:hidden">
                <div className="w-[95%] md:w-10/12 m-auto text-center mb-4 flex items-center justify-center gap-4">
                    <div className="w-1/2 md:w-1/3 flex items-center md:justify-between ">
                        <img
                            src={logo}
                            alt="Sanchayan Logo"
                            className="w-24 md:w-20 md:h-20"
                        />
                    </div>
                    <div>
                        <div className="m-auto text-center">
                            <h1 className="text-6xl md:text-5xl font-bold text-green-600 mb-4">
                                সঞ্চয়ন
                            </h1>
                        </div>
                        <div>
                            <p className="text-[0.5rem] font-bold text-center text-wrap text-black dark:text-gray-300">
                                মাল্টিপারপাস <br /> কো-অপারেটিভ সোসাইটি।
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-11/12 m-auto text-center ">
                    <p className="text-center text-orange-900 dark:text-orange-300 text-sm font-semibold">
                        "আল্লাহ তায়ালা ব্যবসাকে হালাল করেছেন এবং সুদকে হারাম
                        করেছেন"। (সূরা আল-বাকারা, আয়াতঃ ২৭৫)
                    </p>
                </div>
            </div>
            {/* form header for mobile end */}
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="p-6 max-w-4xl lg:w-[80%] mx-auto space-y-4 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 rounded-xl shadow-2xl border border-gray-100"
            >
                <span className="w-full block border-dashed border-b-3 mt-2 border-green-500"></span>
                {isSubmitted ? (
                    <p className="text-green-600 font-semibold mt-4 ">
                        ✅ ফর্ম সফলভাবে জমা হয়েছে! ভেরিফিকেশনের জন্য দয়া করে
                        অপেক্ষা করুন। ১২-২৪ ঘন্টার মধ্যে প্রোফাইল ভেরিফাই করে
                        আপনার মোবাইল নম্বরে জানিয়ে দেওয়া হবে।
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
                                    <option value="পরিচালনা পর্ষদের সদস্য">
                                        পরিচালনা পর্ষদের সদস্য (শেয়ারের মূল্য -
                                        ১,০০,০০০ টাকা)
                                    </option>
                                    <option value="সাধারণ সদস্য">
                                        সাধারণ সদস্য (শেয়ারের মূল্য - ১০,০০০
                                        টাকা)
                                    </option>
                                    <option value="সঞ্চয়ী হিসাব">
                                        সঞ্চয়ী হিসাব
                                    </option>
                                </select>
                            </div>

                            {/* সাব-মেম্বার ধরন, যদি প্রযোজ্য হয় */}
                            {form.memberType && (
                                <div className="flex gap-4">
                                    <div className="w-full">
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
                                                    <option
                                                        key={index}
                                                        value={sub}
                                                    >
                                                        {sub}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>
                                    <div className="w-full">
                                        <label className="block font-semibold">
                                            মাসিক সঞ্চয় (টাকা):
                                        </label>
                                        <input
                                            type="text"
                                            name="monthlySavings"
                                            onChange={handleChange}
                                            value={form.monthlySavings}
                                            placeholder="মাসিক সঞ্চয় (টাকা)"
                                            className="w-full border p-2"
                                            required
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <label className="block font-semibold">
                            হিসাব নম্বর:
                        </label>
                        <input
                            type="text"
                            name="accountNumber"
                            onChange={handleChange}
                            value={form.accountNumber}
                            readOnly
                            placeholder="হিসাব নম্বর"
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
                            className="w-full border p-2 dark-placeholder"
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
                            className="w-full border p-2 dark-placeholder"
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
                            className="w-full border p-2 dark-placeholder"
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
                            className="w-full border p-2 dark-placeholder"
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
                            className="w-full border p-2 dark-placeholder"
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
                            className="w-full border p-2 dark-placeholder"
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
                                    required
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
                                    required
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
                            className="w-full border p-2 dark-placeholder"
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
                            className="w-full border p-2 dark-placeholder"
                            required
                        />
                        <label className="block font-semibold">
                            মোবাইল নম্বর:
                        </label>
                        <input
                            type="number"
                            name="mobile"
                            value={form.mobile}
                            onChange={handleChange}
                            placeholder="মোবাইল নম্বর"
                            className="w-full border p-2 dark-placeholder"
                            required
                        />
                        <label className="block font-semibold">ইমেইল:</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="ইমেইল"
                            className="w-full border p-2 dark-placeholder"
                        />
                        <label className="block font-semibold">
                            বর্তমান ঠিকানা:
                        </label>
                        <textarea
                            name="presentAddress"
                            value={form.presentAddress}
                            onChange={handleChange}
                            placeholder="বর্তমান ঠিকানা"
                            className="w-full border p-2 dark-placeholder"
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
                            className="w-full border p-2 dark-placeholder"
                            required
                        ></textarea>
                        <label className="block font-semibold">জাতীয়তা:</label>

                        <input
                            type="text"
                            name="nationality"
                            value={form.nationality}
                            onChange={handleChange}
                            className="w-full border p-2 dark-placeholder"
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
                            accept="image/*"
                            className="w-full border p-2"
                            required
                        />
                        {form.photo && (
                            <img
                                src={form.photo}
                                alt="সদস্যের ছবি"
                                className="w-24 h-24 object-cover mt-2"
                            />
                        )}

                        {/* Signature Field */}
                        <label className="block font-semibold mb-1">
                            স্বাক্ষর:
                        </label>
                        <div
                            className="border rounded-md p-2 cursor-pointer bg-white"
                            onClick={() => {
                                setShowSignatureModal(true);
                                document.body.style.overflow = "hidden";
                                setTimeout(() => {
                                    const canvas =
                                        document.getElementById(
                                            "signature-canvas"
                                        );
                                    if (canvas) {
                                        const ctx = canvas.getContext("2d");
                                        ctx.clearRect(
                                            0,
                                            0,
                                            canvas.width,
                                            canvas.height
                                        );
                                    }
                                }, 50);
                            }}
                        >
                            {form.signature ? (
                                <img
                                    src={form.signature}
                                    alt="স্বাক্ষর"
                                    className="w-[100px] h-[50px] object-cover"
                                />
                            ) : (
                                <span className="text-gray-400">
                                    স্বাক্ষর করতে এখানে ক্লিক করুন
                                </span>
                            )}
                        </div>

                        {/* Signature Modal */}
                        {showSignatureModal && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg p-4 w-[90%] max-w-md">
                                    <h2 className="text-lg font-medium mb-2">
                                        স্বাক্ষর করুন
                                    </h2>
                                    <canvas
                                        id="signature-canvas"
                                        width={300}
                                        height={200}
                                        className="border border-gray-400 rounded-md bg-white touch-none"
                                        onMouseDown={(e) => {
                                            const canvas = e.target;
                                            const ctx = canvas.getContext("2d");
                                            ctx.beginPath();
                                            ctx.moveTo(
                                                e.nativeEvent.offsetX,
                                                e.nativeEvent.offsetY
                                            );
                                            setIsDrawing(true);
                                        }}
                                        onMouseMove={(e) => {
                                            if (!isDrawing) return;
                                            const canvas = e.target;
                                            const ctx = canvas.getContext("2d");
                                            ctx.lineWidth = 2;
                                            ctx.lineCap = "round";
                                            ctx.strokeStyle = "black";
                                            ctx.lineTo(
                                                e.nativeEvent.offsetX,
                                                e.nativeEvent.offsetY
                                            );
                                            ctx.stroke();
                                        }}
                                        onMouseUp={() => setIsDrawing(false)}
                                        onMouseLeave={() => setIsDrawing(false)}
                                        onTouchStart={(e) => {
                                            e.preventDefault();
                                            const canvas = e.target;
                                            const rect =
                                                canvas.getBoundingClientRect();
                                            const ctx = canvas.getContext("2d");
                                            ctx.beginPath();
                                            ctx.moveTo(
                                                e.touches[0].clientX -
                                                    rect.left,
                                                e.touches[0].clientY - rect.top
                                            );
                                            setIsDrawing(true);
                                        }}
                                        onTouchMove={(e) => {
                                            e.preventDefault();
                                            if (!isDrawing) return;
                                            const canvas = e.target;
                                            const rect =
                                                canvas.getBoundingClientRect();
                                            const ctx = canvas.getContext("2d");
                                            ctx.lineWidth = 2;
                                            ctx.lineCap = "round";
                                            ctx.strokeStyle = "black";
                                            ctx.lineTo(
                                                e.touches[0].clientX -
                                                    rect.left,
                                                e.touches[0].clientY - rect.top
                                            );
                                            ctx.stroke();
                                        }}
                                        onTouchEnd={() => setIsDrawing(false)}
                                    />
                                    <div className="flex justify-end gap-2 mt-3">
                                        <button
                                            onClick={() => {
                                                const canvas =
                                                    document.getElementById(
                                                        "signature-canvas"
                                                    );
                                                const ctx =
                                                    canvas.getContext("2d");
                                                ctx.clearRect(
                                                    0,
                                                    0,
                                                    canvas.width,
                                                    canvas.height
                                                );
                                            }}
                                            className="px-3 py-1 bg-red-500 text-white rounded-md"
                                        >
                                            Clear
                                        </button>
                                        <button
                                            onClick={() => {
                                                const canvas =
                                                    document.getElementById(
                                                        "signature-canvas"
                                                    );
                                                canvas.toBlob((blob) => {
                                                    // random name for signature pic
                                                    const fileName = `signature_${Date.now()}.png`;
                                                    // create fake event for handleUpload
                                                    const file = new File(
                                                        [blob],
                                                        fileName,
                                                        {
                                                            type: "image/png",
                                                        }
                                                    );
                                                    const fakeEvent = {
                                                        target: {
                                                            files: [file],
                                                        },
                                                    };
                                                    handleUpload(
                                                        fakeEvent,
                                                        "signature"
                                                    );
                                                });
                                                setShowSignatureModal(false);
                                                document.body.style.overflow =
                                                    "auto";
                                            }}
                                            className="px-3 py-1 bg-green-600 text-white rounded-md"
                                        >
                                            Done
                                        </button>
                                        <button
                                            onClick={() => {
                                                setShowSignatureModal(false);
                                                document.body.style.overflow =
                                                    "auto";
                                            }}
                                            className="px-3 py-1 bg-gray-400 text-white rounded-md"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Signature Field End */}

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
                            className="w-full border p-2 dark-placeholder"
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
                            className="w-full border p-2 dark-placeholder"
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
                            className="w-full border p-2 dark-placeholder"
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
                            className="w-full border p-2 dark-placeholder"
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
                            className="w-full border p-2 dark-placeholder"
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
                            className="w-full border p-2 dark-placeholder"
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
                            className="w-full border p-2 dark-placeholder"
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
                            className="w-full border p-2 dark-placeholder"
                        />

                        <label className="block font-semibold">
                            নমিনির বর্তমান ঠিকানা:
                        </label>
                        <textarea
                            name="nominee.presentAddress"
                            value={form.nominee.presentAddress}
                            onChange={handleChange}
                            placeholder="বর্তমান ঠিকানা"
                            className="w-full border p-2 dark-placeholder"
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
                            className="w-full border p-2 dark-placeholder"
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
                            accept="image/*"
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
                            className="w-full border p-2 dark-placeholder"
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
                                    className="z-50 w-4 h-4 text-black dark:text-white transition-all duration-300 -translate-x-4 translate-y-4 opacity-0 peer-checked:translate-x-0 peer-checked:translate-y-0 peer-checked:opacity-100"
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
                                এই মর্মে প্রত্যয়ন করছি যে, আমি উপর্যুক্ত
                                স্বাক্ষরকারী{" "}
                                <span className="bg-yellow-400 text-black px-1 py-1">
                                    {form.nameBn || "____________"}
                                </span>{" "}
                                সঞ্চয়নের সকল নিয়মনীতি ও আইনের প্রতি অনুগত ও
                                শ্রদ্ধাশীল।
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
                        <p className="text-xl font-semibold mb-4 text-red-600 dark:text-red-400">
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
                <div className="fixed inset-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm flex flex-col items-center justify-center z-10 text-center p-6 rounded h-screen">
                    <p className="text-xl font-semibold mb-4 text-red-600 dark:text-red-400">
                        আপনি একটি ফর্ম জমা দিয়েছেন। আপনার তথ্য পরিবর্তন করতে
                        সাপোর্ট টিমের সাথে যোগাযোগ করুন। ধন্যবাদ!
                    </p>
                    <p className="my-4 dark:text-gray-300">
                        {" "}
                        সাপোর্টঃ +8801747337534
                    </p>
                    <button
                        onClick={() => navigate("/login")}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer active:translate-y-0.5"
                    >
                        ড্যাশবোর্ডে যান।
                    </button>
                    {/* form edit feature (currrenly disabled this feature.) */}
                    {/* <br />
                    {" অথবা "} <br /> <br />
                    <button
                        onClick={() => setAlreadySubmitted(false)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer active:translate-y-0.5"
                    >
                        ফর্ম এডিট করুন (সতর্কবার্তাঃ ফর্মের কোনো বক্স খালি রাখলে
                        সেটি ফাকা থাকবে। )
                    </button> */}
                </div>
            )}
        </div>
    );
};

export default MemberForm1;
