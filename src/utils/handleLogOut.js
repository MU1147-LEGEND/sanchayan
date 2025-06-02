import { signOut } from "firebase/auth";

export const handleLogout = async (auth, navigate) => {
    try {
        await signOut(auth);
        navigate("/login");
        setTimeout(() => alert("Log out Success"), 100);
    } catch (error) {
        console.error("Logout error:", error);
        alert("❌ লগ আউট ব্যর্থ");
    }
};
