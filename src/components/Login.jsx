/* eslint-disable no-unused-vars */
// src/pages/Login.jsx
import {
    RecaptchaVerifier,
    signInWithEmailAndPassword,
    signInWithPhoneNumber,
} from "firebase/auth";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { AuthContext } from "./loginAuthContext";

export default function Login() {
    const [loginMethod, setLoginMethod] = useState("email"); // "email" or "phone"
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState(null);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/dashboard");
        } catch (err) {
            setError("ইমেইল বা পাসওয়ার্ড ভুল!");
            console.log(err);
        }
    };
    // Function to set up reCAPTCHA and send OTP
    const setUpRecaptcha = async (event) => {
        event.preventDefault();
        try {
            if (!window.recaptchaVerifier) {
                const recaptcha = new RecaptchaVerifier(
                    auth,
                    "recaptcha-container",
                    {}
                );
                const confirmation = await signInWithPhoneNumber(
                    auth,
                    phone,
                    recaptcha
                );
                setConfirmationResult(confirmation);
            }
            setOtpSent(true);
        } catch (err) {
            console.error("Recaptcha setup failed:", err);
            setError("Recaptcha সেটআপ করতে ব্যর্থ!");
        }
    };
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await confirmationResult.confirm(otp);
            navigate("/dashboard");
        } catch (err) {
            setError("ভুল OTP!");
        }
    };
    // If user is already logged in, redirect to dashboard
    if (user) return <Navigate to="/dashboard" />;
    // If user is not logged in, show the login form
    return (
        <div className="min-h-[70vh] w-full flex flex-col items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-4">
                <h1 className="text-3xl font-bold text-center mb-4">
                    Sanchayan লগইন
                </h1>

                {/* <div className="flex justify-center mb-4 gap-4">
                    <button
                        onClick={() => setLoginMethod("email")}
                        className={`px-4 py-2 rounded ${
                            loginMethod === "email"
                                ? "bg-blue-600 text-white"
                                : "bg-white border"
                        }`}
                    >
                        ইমেইল লগইন
                    </button>
                    <button
                        onClick={() => setLoginMethod("phone")}
                        className={`px-4 py-2 rounded ${
                            loginMethod === "phone"
                                ? "bg-blue-600 text-white"
                                : "bg-white border"
                        }`}
                    >
                        ফোন লগইন
                    </button>
                    <button
                        onClick={() => setLoginMethod("google")}
                        className={`px-4 py-2 rounded ${
                            loginMethod === "google"
                                ? "bg-blue-600 text-white"
                                : "bg-white border"
                        }`}
                    >
                        গুগল লগইন
                    </button>
                </div> */}

                {error && (
                    <p className="text-red-600 text-sm mb-2 text-center">
                        {error}
                    </p>
                )}

                {loginMethod === "email" ? (
                    <form
                        onSubmit={handleEmailLogin}
                        className="bg-white p-6 rounded shadow-md"
                    >
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
                        <span className="flex mt-4 items-center justify-center">
                            <hr className="w-1/3" />
                            <span className="w-1/3 text-center">অথবা</span>
                            <hr className="w-1/3" />
                        </span>
                        <button
                            onClick={() => navigate("/signup")}
                            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 mt-2"
                        >
                            সাইন আপ করুন
                        </button>
                    </form>
                ) : (
                    // <form
                    //     onSubmit={
                    //         otpSent
                    //             ? handleVerifyOtp
                    //             : (event) => setUpRecaptcha(event)
                    //     }
                    //     className="bg-white p-6 rounded shadow-md"
                    // >
                    //     <p className="text-xl text-red-500">
                    //         এখনো কাজ চলমান। দয়া করে ইমেইল লগিন ব্যবহার করুন।
                    //     </p>
                    //     <input
                    //         type="tel"
                    //         placeholder="+8801XXXXXXXXX"
                    //         value={phone}
                    //         onChange={(e) => setPhone(e.target.value)}
                    //         className="w-full p-2 border rounded mb-4"
                    //         required
                    //     />

                    //     {otpSent && (
                    //         <input
                    //             type="text"
                    //             placeholder="OTP দিন"
                    //             value={otp}
                    //             onChange={(e) => setOtp(e.target.value)}
                    //             className="w-full p-2 border rounded mb-4"
                    //         />
                    //     )}

                    //     <div id="recaptcha-container"></div>

                    //     <button
                    //         type="submit"
                    //         className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                    //     >
                    //         {otpSent ? "OTP যাচাই করুন" : "OTP পাঠান"}
                    //     </button>
                    // </form>
                    <p className="text-xl text-red-500">
                        এখনো কাজ চলমান। দয়া করে ইমেইল লগিন ব্যবহার করুন।
                    </p>
                )}

                <div className="mt-4 text-center block">
                    <button
                        onClick={() => navigate("/")}
                        className="text-blue-500 hover:underline"
                    >
                        হোমে ফিরে যান
                    </button>
                </div>
            </div>

            <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white text-center py-2">
                <p>
                    © {new Date().getFullYear()} Sanchayan. All rights reserved.
                </p>
            </footer>
        </div>
    );
}
