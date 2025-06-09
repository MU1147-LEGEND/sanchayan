/* eslint-disable no-unused-vars */
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { handleLogout } from "../utils/handleLogOut";
const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const logOut = handleLogout;
    const navigate = useNavigate();
    const [referralCount, setReferralCount] = useState(0);
    // Check if user is logged in and fetch user data
    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);

                const docRef = doc(db, "members", firebaseUser.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                } else {
                    console.log("❌ কোনো ডেটা পাওয়া যায়নি");
                }
            }
            setLoading(false); // ✅ যেকোনো অবস্থায় loading বন্ধ করো
        });

        return () => unsubscribe();
    }, []);

    // calculate the number of referrals from all users, if any user has the current user's account number as refarenceNumber
    useEffect(() => {
        const fetchReferralCount = async () => {
            const membersCollection = collection(db, "members");
            const membersSnapshot = await getDocs(membersCollection);
            let count = 0;

            membersSnapshot.forEach((doc) => {
                const data = doc.data();

                if (Number(data.refarenceNumber) === userData?.accountNumber) {
                    count++;
                }
            });
            setReferralCount(count);
        };

        if (userData?.accountNumber) {
            fetchReferralCount();
        }
    }, [userData?.accountNumber]);

    if (loading) {
        return <p className="text-center mt-10">লোড হচ্ছে...</p>;
    }

    if (!userData) {
        return (
            <>
                <p className="text-center mt-10 text-red-600 font-semibold">
                    সদস্য তথ্য পাওয়া যায়নি। পেইজটি রিফ্রেশ করুন অথবা ফর্ম পূরণ
                    করুন। ফর্ম পূরণ করতে{" "}
                    <button>
                        <span
                            className="text-blue-500 hover:underline"
                            onClick={() => navigate("/registration-form")}
                        >
                            এখানে ক্লিক করুন
                        </span>
                    </button>
                </p>
                <div className="text-center mt-[calc(50vh-10rem)]">
                    <p className="mb-2">
                        লগ আউট করতে{" "}
                        <button>
                            <span
                                className="text-blue-500 hover:underline"
                                onClick={() => logOut(auth, navigate)}
                            >
                                এখানে ক্লিক করুন
                            </span>
                        </button>
                    </p>
                </div>
            </>
        );
    }

    const {
        nameBn,
        nameEn,
        dob,
        fatherNameEn,
        gender,
        motherNameEn,
        nationality,
        nid,
        presentAddress,
        permanentAddress,
        subMemberType,
        email,
        mobile,
        accountNumber,
        memberType,
        photo,
        nominee,
        refarenceNumber,
        balance,
    } = userData;

    return (
        <div className="max-w-3xl mx-auto p-4 mb-10 border rounded-lg shadow relative">
            {/* balance show on top right corner */}
            <div className="md:absolute text-center top-5 right-5 mb-4 flex flex-col md:items-end">
                <span className="text-lg font-semibold text-green-700">
                    আপনার বর্তমান ব্যালেন্স: ৳{balance || "0.00"}
                </span>
                <span className="text-lg font-semibold text-green-700">
                    রেফার করে পেয়েছেন: ৳{referralCount * 30 || "0.00"}
                </span>
            </div>
            <h1 className="text-2xl font-bold mb-4">🧾 সদস্য তথ্য</h1>

            <div className="space-y-2">
                {photo && (
                    <img
                        src={photo}
                        alt="Photo"
                        className="w-32 rounded mt-2"
                    />
                )}
                <p>
                    <strong>নাম (বাংলা):</strong> {nameBn}
                </p>
                <p>
                    <strong>নাম (ইংরেজি):</strong> {nameEn}
                </p>
                <p>
                    <strong>ইমেইল:</strong> {email}
                </p>
                <p>
                    <strong>মোবাইল:</strong> {mobile}
                </p>
                <p>
                    <strong>সদস্য নম্বর:</strong> {accountNumber}
                </p>
                <p>
                    <strong>সদস্যের ধরন:</strong> {memberType}
                    {" > "}
                    {subMemberType}
                </p>
                <p>
                    <strong>জন্ম তারিখ:</strong> {dob}
                </p>
                <p>
                    <strong>লিঙ্গ:</strong> {gender}
                </p>
                <p>
                    <strong>পিতার নাম :</strong> {fatherNameEn}
                </p>
                <p>
                    <strong>মাতার নাম:</strong> {motherNameEn}
                </p>
                <p>
                    <strong>জাতীয়তা:</strong> {nationality}
                </p>
                <p>
                    <strong>জাতীয় পরিচয়পত্র নম্বর:</strong> {nid}
                </p>
                <p>
                    <strong>বর্তমান ঠিকানা:</strong> {presentAddress}
                </p>
                <p>
                    <strong>স্থায়ী ঠিকানা:</strong> {permanentAddress}
                </p>
                <p>
                    <strong>রেফারেল কোড:</strong> {refarenceNumber || "N/A"}
                </p>
                <p>
                    <strong>আপনি কতজন রেফার করেছেন:</strong>{" "}
                    {referralCount || "N/A"}
                </p>

                {/* nominee */}
                <h2 className="text-xl font-semibold mt-6">👩‍👦 নমিনির তথ্য</h2>
                <p>
                    <strong>নাম (বাংলা):</strong> {nominee.nameBn}
                </p>
                <p>
                    <strong>নাম (ইংরেজি):</strong> {nominee.nameEn}
                </p>
                <p>
                    <strong>সম্পর্ক:</strong> {nominee.relation}
                </p>
                <p>
                    <strong>মোবাইল:</strong> {nominee.mobile}
                </p>
                {nominee.photo && (
                    <img
                        src={nominee.photo}
                        alt="Nominee"
                        className="w-32 rounded mt-2"
                    />
                )}
            </div>

            <div className="mt-6 flex justify-center items-center space-x-4">
                <button
                    onClick={() => logOut(auth, navigate)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    লগ আউট
                </button>
                <button
                    onClick={() => navigate("/withdraw")}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-emerald-500"
                >
                    {/* টাকা উত্তোলন */}
                    <span className="text-white">টাকা উত্তোলন</span>
                </button>
            </div>
        </div>
    );
};

export default UserDashboard;
