import { signOut } from "firebase/auth";

export const handleLogout = async (auth, navigate) => {
    try {
        await signOut(auth);
        navigate("/login");
        return true; // ✅ লগ আউট সফল হলে true রিটার্ন করো
    } catch (error) {
        console.error("Logout error:", error);
        return false; // ❌ লগ আউট ব্যর্থ হলে false রিটার্ন করো
    }
};
