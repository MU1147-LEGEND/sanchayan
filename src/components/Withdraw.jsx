import { getAuth } from "firebase/auth";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";

const Withdraw = () => {
    const [form, setForm] = useState({
        amount: "",
        accountNumber: "",
    });
    const [balance, setBalance] = useState(0);
    const [accountNum, setAccountNum] = useState("");

    const [verified, setVerified] = useState(false);
    const [referralCount, setReferralCount] = useState(0);

    const auth = getAuth();
    const [user, setUser] = useState(auth.currentUser);
    const navigate = useNavigate();
    const totalBalance = Number(balance); // + referralCount * 30;
    
    // log out user 
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            setUser(firebaseUser);
        });
        return () => unsubscribe();
    }, [auth]);

    // Fetch referral count
    useEffect(() => {
        const fetchReferralCount = async () => {
            const membersCollection = collection(db, "members");
            const membersSnapshot = await getDocs(membersCollection);
            let count = 0;

            membersSnapshot.forEach((doc) => {
                const data = doc.data();

                if (Number(data.refarenceNumber) === accountNum) {
                    count++;
                }
            });
            setReferralCount(count);
        };

        if (accountNum) {
            fetchReferralCount();
        }
    }, [accountNum]);

    useEffect(() => {
        const checkBalance = async () => {
            if (!user) return;

            const docRef = doc(db, "members", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const existingAccountNumber = docSnap.data().accountNumber;
                const existingBalance = docSnap.data().balance;
                setForm((prev) => ({
                    ...prev,
                    accountNumber: existingAccountNumber,
                }));
                setAccountNum(existingAccountNumber);
                setBalance(existingBalance);
                setVerified(docSnap.data().verified || false);
            } else {
                console.log("❌ কোনো ডেটা পাওয়া যায়নি");
            }
        };

        checkBalance();
    }, [user]);

    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const amount = Number(form.amount); // Always convert early and use this
        if (isNaN(amount) || amount < 100) {
            alert("Amount must be greater than 99TK");
            return;
        }

        if (amount > totalBalance) {
            alert(
                `Insufficient balance. Your current balance is ৳${totalBalance}`
            );
            return;
        }

        const docRef = doc(db, "members", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const existingAccountNumber = docSnap.data().accountNumber;
            const enteredAccountNumber = Number(form.accountNumber);

            if (existingAccountNumber !== enteredAccountNumber) {
                alert(
                    "The account number you entered is not your account number."
                );
                return;
            }

            const withdrawalData = {
                amount, // already a number
                accountNumber: enteredAccountNumber,
                userId: user.uid,
                timestamp: new Date(),
            };

            const withdrawalRef = collection(db, "withdrawals");
            await addDoc(withdrawalRef, withdrawalData);

            const newBalance = totalBalance - amount;

            console.log("Total:", totalBalance);
            console.log("Withdraw:", amount);
            console.log("New balance:", newBalance);

            await updateDoc(docRef, { balance: newBalance });
            setBalance(newBalance);

            setForm({
                amount: "",
                accountNumber: existingAccountNumber,
            });

            alert(
                `Withdrawal request of ৳${amount} has been submitted successfully!`
            );
        } else {
            console.log("❌ কোনো ডেটা পাওয়া যায়নি");
        }
    };

    // handle not logged in or not verified
    if (!user) {
        return (
            <div className="w-4/5 m-auto flex flex-col items-center justify-center h-[50vh] md:h-[70vh]">
                <h1 className="text-2xl font-bold mb-4">Please Log In</h1>
                <p className="text-lg text-gray-700 mb-6">
                    You need to be logged in to make a withdrawal request.
                </p>
                <button
                    onClick={() => navigate("/login")}
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 active:translate-y-2 active:shadow-inner"
                >
                    Log In
                </button>
            </div>
        );
    }

    if (!verified) {
        return (
            <div className="w-4/5 m-auto flex flex-col items-center justify-center h-[50vh] md:h-[70vh]">
                <h1 className="text-2xl font-bold mb-4">
                    Account Not Verified
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                    Your account is not verified. Please contact support to
                    verify your account.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Make a Withdraw Request</h1>
            <p className="text-lg text-gray-700 mb-6">
                Please fill out the form below to request a withdrawal.
            </p>
            <form
                onSubmit={(e) => {
                    handleSubmit(e);
                }}
                className="bg-white p-6 rounded shadow-md w-full max-w-md"
            >
                <div className="mb-4">
                    <label
                        htmlFor="amount"
                        className="text-sm font-medium text-gray-700 mb-2 flex justify-between"
                    >
                        Withdrawal Amount
                        <span className="text-emerald-600 font-semibold">
                            Current Balance:{" "}
                            {totalBalance ? `৳${totalBalance}` : "৳0.00"}
                        </span>
                    </label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={form.amount}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                amount: parseFloat(e.target.value),
                            })
                        }
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="accountNumber"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Account Number
                    </label>
                    <input
                        type="text"
                        id="accountNumber"
                        name="accountNumber"
                        value={form.accountNumber}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                accountNumber: e.target.value,
                            })
                        }
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200 active:translate-y-2 active:shadow-inner disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Submit Request
                </button>
            </form>
            <p className="mt-4 text-sm text-gray-600">
                Please allow 2-3 business days for processing.
            </p>
            <p className="mt-2 text-sm text-gray-600">
                If you have any questions, please contact our support team.
            </p>
        </div>
    );
};
export default Withdraw;
