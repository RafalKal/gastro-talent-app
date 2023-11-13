import React, { createContext, useState, useEffect, useRef } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);
    const effectRan = useRef(false);

    useEffect(() => {
        if (effectRan.current === false) {
            const storedAuth = {
                id: localStorage.getItem("id"),
                role: localStorage.getItem("role"),
                token: localStorage.getItem("token"),

            };

            if (storedAuth.id && storedAuth.role && storedAuth.token) {
                setAuth(storedAuth);
            }
            setLoading(false);
            return () => {
                effectRan.current = true;
            };
        }

    }, []);


    return <AuthContext.Provider value={{ auth, setAuth }}>{!loading && children}</AuthContext.Provider>;
};

export default AuthContext;
