import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { handleLogout } from "../utils/handleLogOut";

const Dashboard = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMember, setSelectedMember] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [allMembers, setAllMembers] = useState([]); // To store original list
    const [addBalance, setAddBalance] = useState("");
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
                setAllMembers(membersList); // Store original list
                setMembers(membersList); // Initialize with all members
                setLoading(false);
            } catch (error) {
                console.error("Error fetching members:", error);
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    // fuse implementation for searching members
    const preparedMembers = allMembers.map((member) => ({
        ...member,
        accountNumber: member.accountNumber?.toString() || "",
        nid: member.nid?.toString() || "",
        mobile: member.mobile?.toString() || "",
    }));
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setMembers(allMembers); // Reset to original list if search term is empty
        } else {
            const fuse = new Fuse(preparedMembers, {
                keys: ["accountNumber", "nameEn", "nid", "mobile"],
                threshold: 0.3,
            });
            const results = fuse.search(searchTerm);

            setMembers(results); // Update members with search results
        }
    }, [searchTerm, allMembers]);

    // handle user verification
    const handleVerifyUser = async () => {
        try {
            const memberRef = doc(db, "members", selectedMember.id);
            await updateDoc(memberRef, {
                verified: true,
            });
            setSelectedMember((prev) => ({
                ...prev,
                verified: true,
            }));
            // data
            const data = {
                api_key: "vDeqZenizd792e6VYGAh",
                senderid: "8809617611022",
                number: selectedMember.mobile,
                message:
                    "আপনার সদস্যতা সফলভাবে ভেরিফাইড হয়েছে। ধন্যবাদ! Visit: https://sanchayanbd.com",
            };

            // send a message to user's email or phone
            // check the phone number is valid or not
            if (!/^\d{11}$/.test(data.number)) {
                alert("Invalid phone number format. Please check the number.");
                return;
            }
            // send a message to user's phone
            const url = `https://bulksmsbd.net/api/smsapi?api_key=${data.api_key}&type=text&number=${data.number}&senderid=${data.senderid}&message=${data.message}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to send verification message");
            } else {
                console.log("Verification message sent successfully");
            }

            // update the members state to reflect the change
            setMembers((prevMembers) =>
                prevMembers.map((member) =>
                    member.id === selectedMember.id
                        ? { ...member, verified: true }
                        : member
                )
            );

            alert("User verified successfully!");
        } catch (error) {
            console.error("Error verifying user:", error);
            alert("Failed to verify user.");
        }
    };

    // handle adding balance to user's account
    const handleAddBalance = (e) => {
        const value = e.target.value;
        if (value === "" || !isNaN(value)) {
            setAddBalance(value);
        } else {
            alert("Please enter a valid number for balance.");
        }
    };
    // handle adding balance to user's account
    const handleAddBalanceToUser = async () => {
        if (addBalance === "" || isNaN(addBalance)) {
            alert("Please enter a valid number for balance.");
            return;
        }
        try {
            const memberRef = doc(db, "members", selectedMember.id);
            const newBalance =
                parseFloat(selectedMember.balance || 0) +
                parseFloat(addBalance);
            await updateDoc(memberRef, {
                balance: newBalance,
            });
            setSelectedMember((prev) => ({
                ...prev,
                balance: newBalance,
            }));
            // data
            const data = {
                api_key: "vDeqZenizd792e6VYGAh",
                senderid: "8809617611022",
                number: selectedMember.mobile,
                message: `আপনার অ্যাকাউন্টে ৳${addBalance} যোগ করা হয়েছে। নতুন ব্যালেন্স: ৳${newBalance}. ধন্যবাদ! Visit: https://sanchayanbd.com`,
            };
            // send a message to user's email or phone
            // check the phone number is valid or not
            if (!/^\d{11}$/.test(data.number)) {
                alert("Invalid phone number format. Please check the number.");
                return;
            }
            // send a message to user's phone
            const url = `https://bulksmsbd.net/api/smsapi?api_key=${data.api_key}&type=text&number=${data.number}&senderid=${data.senderid}&message=${data.message}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to send balance update message");
            } else {
                console.log("Balance update message sent successfully");
            }
            alert("Balance added successfully!");
        } catch (error) {
            console.error("Error adding balance:", error);
            alert("Failed to add balance.");
        }
    };

    // setting up the loading state
    if (loading) return <div className="text-center p-4">Loading...</div>;

    // loggin out from account
    const logOut = handleLogout;

    return (
        <div className="p-4 mb-10">
            {/* search members by id */}
            <div className="mb-4 w-1/2 m-auto">
                {/* Search Member label */}
                <label className="block text-gray-700 mb-2 text-base font-semibold">
                    সদস্য খুঁজুন:
                </label>

                <input
                    type="text"
                    placeholder="সদস্য আইডি, নাম, বা ফোন নম্বর দিয়ে খুঁজুন..."
                    className="border-2 border-gray-300 p-2 rounded w-full mx-auto"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setSelectedMember(null); // Reset selected member on search
                    }}
                />
            </div>
            <h1 className="text-2xl font-bold mb-4 text-center">
                সদস্য তালিকা
            </h1>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-sm">
                    <thead className="bg-gray-200 text-left">
                        <tr>
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">নাম</th>
                            <th className="p-2 border">মেম্বার টাইপ</th>
                            <th className="p-2 border">ফোন</th>
                            <th className="p-2 border">ভেরিফাইড</th>
                            <th className="p-2 border">ছবি</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members
                            ?.sort((a, b) => a.accountNumber - b.accountNumber)
                            .map((member) => (
                                <tr
                                    key={member?.id}
                                    className="hover:bg-gray-200 cursor-pointer"
                                    onClick={() => setSelectedMember(member)}
                                >
                                    <td className="p-2 border">
                                        {member?.accountNumber}
                                    </td>
                                    <td className="p-2 border text-blue-600 hover:underline">
                                        {member?.nameEn}
                                    </td>
                                    <td className="p-2 border">
                                        {member?.memberType}
                                        {" > "}
                                        {member?.subMemberType}
                                    </td>
                                    <td className="p-2 border">
                                        {member?.mobile}
                                    </td>
                                    <td className="p-2 border">
                                        {member?.verified ? "✅" : "❌"}
                                    </td>
                                    <td className="p-2 border">
                                        {member?.photo ? (
                                            <img
                                                src={member?.photo}
                                                alt={member?.photo}
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
                    <p
                        onClick={() => navigate("/")}
                        className="text-blue-500 hover:underline cursor-pointer"
                    >
                        হোমে ফিরে যান
                    </p>
                    <button
                        onClick={() => logOut(auth, navigate)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        🔓 Logout
                    </button>
                </div>
                {/* withdraw history */}
                <div className="mt-4 text-center">
                    <button
                        onClick={() => navigate("/withdraw-history")}
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    >
                        Withdraw History
                    </button>
                </div>
            </div>

            {/* Modal */}
            {selectedMember && (
                <div
                    className={`fixed inset-0 bg-black/80 flex items-center justify-center z-50`}
                >
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
                            onClick={() => setSelectedMember(null)}
                        >
                            ✕
                        </button>

                        <img
                            src={selectedMember.photo}
                            alt={selectedMember.photo}
                            className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                        />
                        <h2 className="text-xl font-bold mb-2">
                            {selectedMember.nameBn} ({selectedMember.nameEn})
                        </h2>
                        <h2 className="text-xl font-bold mb-2">
                            Balance: ৳{selectedMember.balance || "0.00"}
                        </h2>

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
                            <p>
                                <strong>রেজিস্ট্রেশন তারিখ:</strong>{" "}
                                {new Date(
                                    selectedMember.createdAt
                                ).toLocaleDateString("bn-BD", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                            {selectedMember.verified ? (
                                <p className="text-green-500">
                                    ✅ সদস্যটি ভেরিফাইড
                                </p>
                            ) : (
                                <p className="text-red-500">
                                    ❌ সদস্যটি ভেরিফাইড নয়
                                </p>
                            )}
                            {/* confirm user verify */}
                            {!selectedMember.verified ? (
                                <button
                                    onClick={handleVerifyUser}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    style={{ marginTop: "10px" }}
                                >
                                    Verify The user
                                </button>
                            ) : (
                                <>
                                    {/* add balance to user's account */}
                                    <input
                                        type="number"
                                        value={addBalance}
                                        onChange={handleAddBalance}
                                        placeholder="টাকার পরিমাণ"
                                        className="border-2 border-gray-300 p-2 rounded w-full"
                                        style={{ marginTop: "10px" }}
                                    />
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                        style={{ marginTop: "10px" }}
                                        onClick={() => {
                                            handleAddBalanceToUser();
                                            setAddBalance(""); // Reset input after adding balance
                                        }}
                                    >
                                        Add Balance
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
