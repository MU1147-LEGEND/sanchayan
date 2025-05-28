// src/pages/Login.jsx

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/dashboard"); // ✅ লগইন হলে ড্যাশবোর্ডে নিয়ে যাবে
        } catch (err) {
            console.error(err);
            setError("ইমেইল বা পাসওয়ার্ড ভুল!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
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
            </form>
        </div>
    );
}
