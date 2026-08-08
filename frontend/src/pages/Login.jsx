import {
    useState,
    useContext
} from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    Eye,
    EyeOff
} from "lucide-react";

import AuthLayout from "../components/auth/AuthLayout";

import {
    AuthContext
} from "../context/AuthContext";


export default function Login() {

    const navigate = useNavigate();

    const {
        login
    } = useContext(AuthContext);


    const [showPassword, setShowPassword] =
        useState(false);


    const [form, setForm] = useState({
        phone: "",
        password: ""
    });


    const [error, setError] =
        useState("");


    const [loading, setLoading] =
        useState(false);


    // =====================================
    // HANDLE INPUT
    // =====================================

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

        setError("");

    };


    // =====================================
    // LOGIN
    // =====================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);


        try {

            const user = await login(
                form.phone,
                form.password
            );


            console.log(
                "LOGIN SUCCESS:",
                user
            );


            // =================================
            // REDIRECT BASED ON ROLE
            // =================================

            if (user.role === "TECHNICIAN") {

                navigate(
                    "/technician/dashboard"
                );

            } else if (user.role === "ADMIN") {

                navigate(
                    "/admin/dashboard"
                );

            } else {

                navigate(
                    "/client/dashboard"
                );

            }


        } catch (error) {

            console.error(
                "LOGIN ERROR:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Login failed. Please check your phone number and password."
            );


        } finally {

            setLoading(false);

        }

    };


    return (

        <AuthLayout
            title="Welcome Back"
            subtitle="Login to access your Nyũmba Dragon account"
        >

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                {/* ERROR */}
                {error && (

                    <div
                        className="
                            bg-red-50
                            border
                            border-red-200
                            text-red-700
                            text-sm
                            rounded-xl
                            px-4
                            py-3
                        "
                    >
                        {error}
                    </div>

                )}


                {/* PHONE */}
                <div>

                    <label
                        className="
                            block
                            text-sm
                            font-semibold
                            text-black
                            mb-2
                        "
                    >
                        Phone Number
                    </label>


                    <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        autoComplete="tel"
                        className="
                            w-full
                            border
                            border-gray-300
                            rounded-xl
                            px-4
                            py-3
                            text-black
                            bg-white
                            placeholder-gray-500
                            focus:outline-none
                            focus:ring-2
                            focus:ring-green-600
                            focus:border-green-600
                        "
                        placeholder="0712 345 678"
                    />

                </div>


                {/* PASSWORD */}
                <div>

                    <label
                        className="
                            block
                            text-sm
                            font-semibold
                            text-black
                            mb-2
                        "
                    >
                        Password
                    </label>


                    <div className="relative">

                        <input
                            name="password"
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            value={form.password}
                            onChange={handleChange}
                            required
                            autoComplete="current-password"
                            className="
                                w-full
                                border
                                border-gray-300
                                rounded-xl
                                px-4
                                py-3
                                pr-12
                                text-black
                                bg-white
                                placeholder-gray-500
                                focus:outline-none
                                focus:ring-2
                                focus:ring-green-600
                                focus:border-green-600
                            "
                            placeholder="Enter your password"
                        />


                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                            className="
                                absolute
                                right-4
                                top-1/2
                                -translate-y-1/2
                                text-gray-600
                                hover:text-black
                            "
                        >

                            {showPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}

                        </button>

                    </div>

                </div>


                {/* LOGIN BUTTON */}
                <button
                    type="submit"
                    disabled={loading}
                    className="
                        w-full
                        bg-red-600
                        hover:bg-red-700
                        disabled:bg-gray-400
                        text-white
                        font-semibold
                        py-3
                        rounded-xl
                        transition
                    "
                >

                    {loading
                        ? "Logging in..."
                        : "Login"
                    }

                </button>


                {/* REGISTER */}
                <div
                    className="
                        text-center
                        text-sm
                        text-gray-600
                    "
                >

                    Don't have an account?

                    <Link
                        to="/register"
                        className="
                            text-green-700
                            font-semibold
                            ml-1
                            hover:text-green-800
                        "
                    >
                        Create Account
                    </Link>

                </div>

            </form>

        </AuthLayout>

    );

}
