import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { AuthContext } from "./loginAuthContext";
import { auth } from "../firebase"; 

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
            setUser(loggedInUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
