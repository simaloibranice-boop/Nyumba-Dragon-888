import {
    createContext,
    useState,
    useEffect
} from "react";

import api from "../services/api";


export const AuthContext = createContext();


export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);


    // =====================================
    // RESTORE SESSION
    // =====================================

    useEffect(() => {

        const savedToken =
            localStorage.getItem("token");

        const savedUser =
            localStorage.getItem("user");


        if (savedToken && savedUser) {

            try {

                setToken(savedToken);

                setUser(
                    JSON.parse(savedUser)
                );

            } catch (error) {

                console.error(
                    "Failed to restore session:",
                    error
                );

                localStorage.removeItem("token");
                localStorage.removeItem("user");

            }

        }

        setLoading(false);

    }, []);


    // =====================================
    // LOGIN
    // =====================================

    async function login(phone, password) {

        const response = await api.post(
            "/auth/login",
            {
                phone,
                password
            }
        );


        const {
            token,
            user
        } = response.data;


        localStorage.setItem(
            "token",
            token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );


        setToken(token);
        setUser(user);


        return user;

    }


    // =====================================
    // REGISTER
    // =====================================

    async function register(formData) {

        const response = await api.post(
            "/auth/register",
            formData
        );


        const {
            token,
            user
        } = response.data;


        localStorage.setItem(
            "token",
            token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );


        setToken(token);
        setUser(user);


        return user;

    }


    // =====================================
    // LOGOUT
    // =====================================

    function logout() {

        localStorage.removeItem("token");
        localStorage.removeItem("user");


        setToken(null);
        setUser(null);

    }


    return (

        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                register,
                logout,
                loading
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}
