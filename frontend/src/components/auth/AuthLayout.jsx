import { Link } from "react-router-dom";

export default function AuthLayout({
    title,
    subtitle,
    children
}) {
    return (
        <div
            className="
                min-h-screen
                flex
                items-center
                justify-center
                bg-gray-100
                px-4
                py-8
            "
        >

            <div
                className="
                    w-full
                    max-w-md
                    bg-white
                    border
                    border-gray-200
                    rounded-3xl
                    shadow-2xl
                    px-7
                    py-8
                    sm:px-9
                    sm:py-9
                "
            >

                {/* BRAND */}
                <div className="text-center mb-7">

                    <Link
                        to="/"
                        className="
                            inline-block
                            text-2xl
                            font-extrabold
                            text-black
                            tracking-tight
                        "
                    >
                        Nyũmba Dragon
                        <span className="text-red-600"> 888</span>
                    </Link>

                    <h1
                        className="
                            mt-5
                            text-2xl
                            font-bold
                            text-black
                        "
                    >
                        {title}
                    </h1>

                    <p
                        className="
                            mt-2
                            text-sm
                            text-gray-600
                        "
                    >
                        {subtitle}
                    </p>

                </div>

                {/* CONTENT */}
                {children}

            </div>

        </div>
    );
}
