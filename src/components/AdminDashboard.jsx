import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { handleLogout } from "../utils/handleLogOut";

const Dashboard = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMember, setSelectedMember] = useState(null);
    const navigate = useNavigate();

    // fetch members from Firestore
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "members"));
                const membersList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setMembers(membersList);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching members:", error);
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);
    // setting up the loading state
    if (loading) return <div className="text-center p-4">Loading...</div>;
    // loggin out from account

    // const handleLogout = async () => {
    //     try {
    //         await signOut(auth);
    //         // alert("✅ লগ আউট সফল হয়েছে");
    //         navigate("/login");
    //     } catch (error) {
    //         console.error("Logout error:", error);
    //         alert("❌ লগ আউট ব্যর্থ");
    //     }
    // };
    const logOut = handleLogout;
    return (
        <div className="p-4 mb-10">
            <h1 className="text-2xl font-bold mb-4">সদস্য তালিকা</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-sm">
                    <thead className="bg-gray-200 text-left">
                        <tr>
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">নাম (বাংলা)</th>
                            <th className="p-2 border">মেম্বার টাইপ</th>
                            <th className="p-2 border">ফোন</th>
                            <th className="p-2 border">ভেরিফাইড</th>
                            <th className="p-2 border">ছবি</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members
                            .sort((a, b) => a.accountNumber - b.accountNumber)
                            .map((member) => (
                                <tr
                                    key={member.id}
                                    className="hover:bg-gray-100 cursor-pointer"
                                    onClick={() => setSelectedMember(member)}
                                >
                                    <td className="p-2 border">
                                        {member.accountNumber}
                                    </td>
                                    <td className="p-2 border text-blue-600 hover:underline">
                                        {member.nameBn}
                                    </td>
                                    <td className="p-2 border">
                                        {member.memberType}
                                        {" > "}
                                        {member?.subMemberType}
                                    </td>
                                    <td className="p-2 border">
                                        {member.mobile}
                                    </td>
                                    <td className="p-2 border">
                                        {member.verified ? "✅" : "❌"}
                                    </td>
                                    <td className="p-2 border">
                                        {member.photo ? (
                                            <img
                                                src={member.photo}
                                                alt={member.photo}
                                                className="h-12 w-12 object-cover rounded"
                                            />
                                        ) : (
                                            "❌"
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                {/* log out */}

                <div className="mt-4 text-center flex items-center justify-center space-x-4">
                    <a
                        href="/sanchayan"
                        className="text-blue-500 hover:underline"
                    >
                        হোমে ফিরে যান
                    </a>
                    <button
                        onClick={() => logOut(auth, navigate)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        🔓 Logout
                    </button>
                </div>
            </div>

            {/* Modal */}
            {selectedMember && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
                            onClick={() => setSelectedMember(null)}
                        >
                            ✕
                        </button>

                        <h2 className="text-xl font-bold mb-2">
                            {selectedMember.nameBn} ({selectedMember.nameEn})
                        </h2>

                        <img
                            src={selectedMember.photo}
                            alt={selectedMember.photo}
                            className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                        />

                        <div className="text-sm space-y-1">
                            <p>
                                <strong>মেম্বার আইডি:</strong>{" "}
                                {selectedMember.accountNumber}
                            </p>
                            <p>
                                <strong>মেম্বার টাইপ:</strong>{" "}
                                {selectedMember.memberType}
                                {" > "}
                                {selectedMember?.subMemberType}
                            </p>
                            <p>
                                <strong>পিতা:</strong>{" "}
                                {selectedMember.fatherNameEn}
                            </p>
                            <p>
                                <strong>মাতা:</strong>{" "}
                                {selectedMember.motherNameEn}
                            </p>
                            <p>
                                <strong>নমিনি:</strong>{" "}
                                {selectedMember.nominee.nameEn}
                            </p>
                            <p>
                                <strong>মোবাইল:</strong> {selectedMember.mobile}
                            </p>
                            <p>
                                <strong>ইমেইল:</strong>{" "}
                                {selectedMember.email || "N/A"}
                            </p>
                            <p>
                                <strong>NID:</strong> {selectedMember.nid}
                            </p>
                            <p>
                                <strong>জন্ম তারিখ:</strong>{" "}
                                {selectedMember.dob}
                            </p>
                            <p>
                                <strong>ঠিকানা:</strong>{" "}
                                {selectedMember.presentAddress}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
