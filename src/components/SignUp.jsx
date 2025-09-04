import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // ✅ আপনার firebase config ঠিকমতো import করুন

const SignUp = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const { name, email, password } = form;

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            // ✅ Update display name
            await updateProfile(userCredential.user, { displayName: name });

            alert("✅ সাইন আপ সফল হয়েছে!");
            navigate("/dashboard"); // ✅ ড্যাশবোর্ড বা যেখানে redirect করবেন
        } catch (err) {
            console.error("Signup Error:", err.message);
            setError("❌ সাইন আপ ব্যর্থ: " + err.message);
        }
    };

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 my-12">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md w-full max-w-sm space-y-4"
            >
                <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-300">
                    সঞ্চয়ন রেজিস্ট্রেশন ফর্ম
                </h2>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300 dark-placeholder dark:text-gray-300 dark:border-gray-600"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300 dark-placeholder dark:text-gray-300 dark:border-gray-600"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300 dark-placeholder dark:text-gray-300 dark:border-gray-600"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 active:translate-y-0.5"
                >
                    Sign Up
                </button>
                <span className="flex mt-4 items-center justify-center">
                    <hr className="w-1/3" />
                    <span className="w-1/3 text-center">অথবা</span>
                    <hr className="w-1/3" />
                </span>
                <button
                    onClick={() => navigate("/login")}
                    className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 mt-2"
                >
                    লগইন করুন
                </button>
            </form>
            <div className="mt-4 text-center block">
                <button
                    onClick={() => navigate("/")}
                    className="text-blue-500 hover:underline"
                >
                    হোমে ফিরে যান
                </button>
            </div>

            {/* <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white text-center py-2">
                <p>
                    © {new Date().getFullYear()} Sanchayan. All rights reserved.
                </p>
            </footer> */}
        </div>
    );
};

export default SignUp;
