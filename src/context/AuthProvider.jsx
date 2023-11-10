import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedAuth = {
            id: localStorage.getItem("id"),
            role: localStorage.getItem("role"),
            token: localStorage.getItem("token"),
        };

        if (storedAuth.id && storedAuth.role && storedAuth.token) {
            setAuth(storedAuth);
        }

        setLoading(false);
    }, []);

    return <AuthContext.Provider value={{ auth, setAuth }}>{!loading && children}</AuthContext.Provider>;
};

export default AuthContext;
