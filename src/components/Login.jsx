// src/pages/Login.jsx
import {
    RecaptchaVerifier,
    signInWithEmailAndPassword,
    signInWithPhoneNumber,
} from "firebase/auth";
import { useContext, useEffect, useState } from "react";
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

    const setUpRecaptcha = () => {
        if (!auth) {
            console.error("Firebase Auth not initialized");
            return;
        }
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                "recaptcha-container",
                {
                    size: "invisible",
                    callback: (response) => {
                        console.log("reCAPTCHA Solved", response);
                    },
                },
                auth
            );
        }
    };

    useEffect(() => {
        if (loginMethod === "phone") {
            // Wait for the DOM to update
            setTimeout(() => {
                if (
                    !window.recaptchaVerifier &&
                    document.getElementById("recaptcha-container")
                ) {
                    setUpRecaptcha();
                }
            }, 0);
        }
    }, [loginMethod]);

    const handlePhoneSendCode = async (e) => {
        e.preventDefault();
        if (!phone) return setError("ফোন নাম্বার দিন");

        setError("");

        const appVerifier = window.recaptchaVerifier;

        try {
            const confirmation = await signInWithPhoneNumber(
                auth,
                phone,
                appVerifier
            );
            window.confirmationResult = confirmation;
            setOtpSent(true);
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setError("OTP পাঠাতে ব্যর্থ! নম্বরটি সঠিক কিনা দেখুন");
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await window.confirmationResult.confirm(otp);
            navigate("/dashboard");
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setError("ভুল OTP!");
        }
    };
    if (user) return <Navigate to="/dashboard" />;
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-4">
                <h1 className="text-3xl font-bold text-center mb-4">
                    Sanchayan লগইন
                </h1>

                <div className="flex justify-center mb-4 gap-4">
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
                </div>

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
                    </form>
                ) : (
                    <form
                        onSubmit={
                            otpSent ? handleVerifyOtp : handlePhoneSendCode
                        }
                        className="bg-white p-6 rounded shadow-md"
                    >
                        <input
                            type="tel"
                            placeholder="+8801XXXXXXXXX"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full p-2 border rounded mb-4"
                            required
                        />

                        {otpSent && (
                            <input
                                type="text"
                                placeholder="OTP দিন"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full p-2 border rounded mb-4"
                            />
                        )}

                        <div id="recaptcha-container"></div>

                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                        >
                            {otpSent ? "OTP যাচাই করুন" : "OTP পাঠান"}
                        </button>
                    </form>
                )}

                <div className="mt-4 text-center block">
                    <a
                        href="/sanchayan"
                        className="text-blue-500 hover:underline"
                    >
                        হোমে ফিরে যান
                    </a>
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
