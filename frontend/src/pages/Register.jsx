import {
    useState,
    useContext
} from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import AuthLayout from "../components/auth/AuthLayout";

import {
    AuthContext
} from "../context/AuthContext";


export default function Register() {

    const navigate = useNavigate();

    const {
        register
    } = useContext(AuthContext);


    const [form, setForm] = useState({

        full_name: "",
        email: "",
        age: "",
        phone: "",
        password: "",
        role: "CLIENT"

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
    // REGISTER
    // =====================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);


        try {

            const user = await register({

                full_name:
                    form.full_name,

                email:
                    form.email,

                age:
                    Number(form.age),

                phone:
                    form.phone,

                password:
                    form.password,

                role:
                    form.role

            });


            console.log(
                "REGISTRATION SUCCESS:",
                user
            );


            // =================================
            // REDIRECT
            // =================================

            if (
                user.role === "TECHNICIAN"
            ) {

                navigate(
                    "/technician/dashboard"
                );

            } else {

                navigate(
                    "/client/dashboard"
                );

            }


        } catch (error) {

            console.error(
                "REGISTER ERROR:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );


        } finally {

            setLoading(false);

        }

    };


    return (

        <AuthLayout
            title="Create Account"
            subtitle="Join Nyũmba Dragon 888 today"
        >

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
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


                {/* FULL NAME */}
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
                        Full Name
                    </label>

                    <input
                        name="full_name"
                        type="text"
                        placeholder="Enter your full name"
                        value={form.full_name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
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
                    />

                </div>


                {/* EMAIL */}
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
                        Email Address
                    </label>

                    <input
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
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
                    />

                </div>


                {/* AGE */}
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
                        Age
                    </label>

                    <input
                        name="age"
                        type="number"
                        min="13"
                        max="100"
                        placeholder="Enter your age"
                        value={form.age}
                        onChange={handleChange}
                        required
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
                    />

                </div>


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
                        placeholder="0712 345 678"
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

                    <input
                        name="password"
                        type="password"
                        placeholder="Create a password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        minLength="6"
                        autoComplete="new-password"
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
                    />

                </div>


                {/* ACCOUNT TYPE */}
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
                        Account Type
                    </label>

                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="
                            w-full
                            border
                            border-gray-300
                            rounded-xl
                            px-4
                            py-3
                            text-black
                            bg-white
                            focus:outline-none
                            focus:ring-2
                            focus:ring-green-600
                            focus:border-green-600
                        "
                    >

                        <option value="CLIENT">
                            Client
                        </option>

                        <option value="TECHNICIAN">
                            Technician
                        </option>

                    </select>

                </div>


                {/* REGISTER BUTTON */}
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
                        ? "Creating Account..."
                        : "Create Account"
                    }

                </button>


                {/* LOGIN LINK */}
                <p
                    className="
                        text-center
                        text-gray-600
                        text-sm
                    "
                >

                    Already have an account?

                    <Link
                        to="/login"
                        className="
                            text-green-700
                            font-semibold
                            ml-1
                            hover:text-green-800
                        "
                    >
                        Login
                    </Link>

                </p>

            </form>

        </AuthLayout>

    );

}
