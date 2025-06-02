import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { AuthContext } from "../loginAuthContext";

const MyAccount = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState(null);

    useEffect(() => {
        const fetchName = async () => {
            if (!user) return;

            const docRef = doc(db, "members", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setDisplayName(docSnap.data().nameBn.split(" ")[0] || "User");
            }
        };

        fetchName();
    }, [user]);

    const handleClick = () => {
        navigate("/login");
    };

    return (
        <button
            onClick={handleClick}
            className={`cursor-pointer hover:opacity-70 ${
                user ? "text-green-600 font-semibold" : ""
            }`}
            // disabled={user}
        >
            {user ? `Hi, ${displayName || "User"}` : "Login"}
        </button>
    );
};

export default MyAccount;
