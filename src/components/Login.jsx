// src/pages/Login.jsx

import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Header from "./header/Header";
import { AuthContext } from "./loginAuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { user, loading } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/dashboard"); // ✅ লগইন হলে ড্যাশবোর্ডে নিয়ে যাবে
        } catch (err) {
            // console.error(err);
            setError("ইমেইল বা পাসওয়ার্ড ভুল!");
        }
    };
    if (user) return <Navigate to="/dashboard" />;
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100">
            <Header />
            <div className="w-full max-w-md p-4">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Sanchayan লগইন
                </h1>
                <p className="text-center text-gray-600 mb-4">
                    আপনার Sanchayan অ্যাকাউন্টে প্রবেশ করতে ইমেইল এবং পাসওয়ার্ড
                    ব্যবহার করুন।
                </p>
            </div>
            {/* Login Form */}
            <form
                onSubmit={handleLogin}
                className="bg-white p-6 rounded shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl mb-4 font-bold text-center">
                    লগইন করুন
                </h2>
                {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
                <input
                    type="email"
                    placeholder="ইমেইল"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    required
                />
                <input
                    type="password"
                    placeholder="পাসওয়ার্ড"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    লগইন
                </button>
            </form>{" "}
            <hr />
            {/* go home */}
            <div className="mt-4 text-center block">
                <a href="/sanchayan" className="text-blue-500 hover:underline">
                    হোমে ফিরে যান
                </a>
            </div>
            {/* Footer */}
            <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white text-center py-2">
                <p>
                    © {new Date().getFullYear()} Sanchayan. All rights reserved.
                </p>
            </footer>
        </div>
    );
}
