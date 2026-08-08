import {
    Menu,
    X,
    ChevronDown,
    MapPin
} from "lucide-react";

import { useState } from "react";

import {
    Link,
    useLocation
} from "react-router-dom";

import {
    motion,
    AnimatePresence
} from "framer-motion";


export default function Navbar() {

    const [mobileOpen, setMobileOpen] = useState(false);
    const [serviceOpen, setServiceOpen] = useState(false);
    const [companyOpen, setCompanyOpen] = useState(false);

    const location = useLocation();


    const services = [
        {
            name: "Electrician",
            path: "/services/electrician"
        },
        {
            name: "Plumbing",
            path: "/services/plumbing"
        },
        {
            name: "Construction",
            path: "/services/construction"
        },
        {
            name: "Security Systems",
            path: "/services/security"
        },
        {
            name: "Solar",
            path: "/services/solar"
        }
    ];


    const company = [
        {
            name: "About Us",
            path: "/about"
        },
        {
            name: "Careers",
            path: "/careers"
        },
        {
            name: "Partners",
            path: "/partners"
        }
    ];


    const isActive = (path) => {

        if (path === "/") {
            return location.pathname === "/";
        }

        return location.pathname.startsWith(path);
    };


    const closeMenus = () => {
        setMobileOpen(false);
        setServiceOpen(false);
        setCompanyOpen(false);
    };


    return (

        <header
            className="
                fixed
                top-0
                left-0
                right-0
                z-50
                bg-white
                border-b
                border-gray-200
                shadow-sm
            "
        >

            <nav
                className="
                    max-w-7xl
                    mx-auto
                    px-5
                    sm:px-6
                    lg:px-8
                    h-[76px]
                    flex
                    items-center
                    justify-between
                    gap-6
                "
            >

                {/* =========================================
                    LOGO
                ========================================= */}

                <Link
                    to="/"
                    onClick={closeMenus}
                    className="
                        flex
                        items-center
                        gap-3
                        shrink-0
                    "
                >

                    {/* DRAGON MARK */}

                    <div
                        className="
                            w-10
                            h-10
                            rounded-xl
                            bg-black
                            flex
                            items-center
                            justify-center
                            shadow-sm
                        "
                    >

                        <span
                            className="
                                text-xl
                                leading-none
                            "
                        >
                            🐉
                        </span>

                    </div>


                    {/* BRAND TEXT */}

                    <div className="leading-none">

                        <div
                            className="
                                text-[15px]
                                sm:text-[16px]
                                font-extrabold
                                tracking-tight
                                text-black
                            "
                        >
                            NYŨMBA DRAGON
                            <span className="text-red-600">
                                {" "}888
                            </span>
                        </div>


                        <div
                            className="
                                mt-1
                                text-[10px]
                                sm:text-[11px]
                                font-medium
                                text-gray-500
                                tracking-wide
                            "
                        >
                            Smart Home. Better Living.
                        </div>

                    </div>

                </Link>


                {/* =========================================
                    DESKTOP NAVIGATION
                ========================================= */}

                <div
                    className="
                        hidden
                        lg:flex
                        items-center
                        justify-center
                        gap-7
                        flex-1
                    "
                >

                    {/* HOME */}

                    <Link
                        to="/"
                        className={`
                            relative
                            py-2
                            text-sm
                            font-semibold
                            transition-colors
                            ${
                                isActive("/")
                                    ? "text-green-700"
                                    : "text-gray-700 hover:text-green-700"
                            }
                        `}
                    >
                        Home

                        {isActive("/") && (
                            <span
                                className="
                                    absolute
                                    left-0
                                    right-0
                                    -bottom-1
                                    h-0.5
                                    bg-green-600
                                    rounded-full
                                "
                            />
                        )}

                    </Link>


                    {/* SERVICES */}

                    <div className="relative">

                        <button
                            type="button"
                            onClick={() => {
                                setServiceOpen(!serviceOpen);
                                setCompanyOpen(false);
                            }}
                            className={`
                                flex
                                items-center
                                gap-1
                                py-2
                                text-sm
                                font-semibold
                                transition-colors
                                ${
                                    serviceOpen ||
                                    location.pathname.startsWith("/services")
                                        ? "text-green-700"
                                        : "text-gray-700 hover:text-green-700"
                                }
                            `}
                        >

                            Services

                            <ChevronDown
                                size={15}
                                className={`
                                    transition-transform
                                    ${
                                        serviceOpen
                                            ? "rotate-180"
                                            : ""
                                    }
                                `}
                            />

                        </button>


                        <AnimatePresence>

                            {serviceOpen && (

                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: 8,
                                        scale: 0.98
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: 8,
                                        scale: 0.98
                                    }}
                                    transition={{
                                        duration: 0.16
                                    }}
                                    className="
                                        absolute
                                        top-12
                                        left-1/2
                                        -translate-x-1/2
                                        w-60
                                        bg-white
                                        border
                                        border-gray-200
                                        rounded-2xl
                                        shadow-xl
                                        p-2
                                    "
                                >

                                    <div
                                        className="
                                            px-3
                                            py-2
                                            text-[11px]
                                            uppercase
                                            tracking-wider
                                            font-bold
                                            text-gray-400
                                        "
                                    >
                                        Home Services
                                    </div>


                                    {services.map((item) => (

                                        <Link
                                            key={item.name}
                                            to={item.path}
                                            onClick={closeMenus}
                                            className="
                                                block
                                                px-3
                                                py-2.5
                                                rounded-xl
                                                text-sm
                                                font-medium
                                                text-gray-800
                                                hover:bg-green-50
                                                hover:text-green-700
                                                transition
                                            "
                                        >
                                            {item.name}
                                        </Link>

                                    ))}

                                </motion.div>

                            )}

                        </AnimatePresence>

                    </div>


                    {/* HOW IT WORKS */}

                    <Link
                        to="/how-it-works"
                        className={`
                            py-2
                            text-sm
                            font-semibold
                            transition-colors
                            ${
                                isActive("/how-it-works")
                                    ? "text-green-700"
                                    : "text-gray-700 hover:text-green-700"
                            }
                        `}
                    >
                        How It Works
                    </Link>


                    {/* COMPANY */}

                    <div className="relative">

                        <button
                            type="button"
                            onClick={() => {
                                setCompanyOpen(!companyOpen);
                                setServiceOpen(false);
                            }}
                            className={`
                                flex
                                items-center
                                gap-1
                                py-2
                                text-sm
                                font-semibold
                                transition-colors
                                ${
                                    companyOpen
                                        ? "text-green-700"
                                        : "text-gray-700 hover:text-green-700"
                                }
                            `}
                        >

                            Company

                            <ChevronDown
                                size={15}
                                className={`
                                    transition-transform
                                    ${
                                        companyOpen
                                            ? "rotate-180"
                                            : ""
                                    }
                                `}
                            />

                        </button>


                        <AnimatePresence>

                            {companyOpen && (

                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: 8,
                                        scale: 0.98
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: 8,
                                        scale: 0.98
                                    }}
                                    transition={{
                                        duration: 0.16
                                    }}
                                    className="
                                        absolute
                                        top-12
                                        left-1/2
                                        -translate-x-1/2
                                        w-48
                                        bg-white
                                        border
                                        border-gray-200
                                        rounded-2xl
                                        shadow-xl
                                        p-2
                                    "
                                >

                                    {company.map((item) => (

                                        <Link
                                            key={item.name}
                                            to={item.path}
                                            onClick={closeMenus}
                                            className="
                                                block
                                                px-3
                                                py-2.5
                                                rounded-xl
                                                text-sm
                                                font-medium
                                                text-gray-800
                                                hover:bg-green-50
                                                hover:text-green-700
                                                transition
                                            "
                                        >
                                            {item.name}
                                        </Link>

                                    ))}

                                </motion.div>

                            )}

                        </AnimatePresence>

                    </div>


                    {/* PROFESSIONALS */}

                    <Link
                        to="/professionals"
                        className={`
                            py-2
                            text-sm
                            font-semibold
                            transition-colors
                            ${
                                isActive("/professionals")
                                    ? "text-green-700"
                                    : "text-gray-700 hover:text-green-700"
                            }
                        `}
                    >
                        For Professionals
                    </Link>


                    {/* CONTACT */}

                    <Link
                        to="/contact"
                        className={`
                            py-2
                            text-sm
                            font-semibold
                            transition-colors
                            ${
                                isActive("/contact")
                                    ? "text-green-700"
                                    : "text-gray-700 hover:text-green-700"
                            }
                        `}
                    >
                        Contact
                    </Link>

                </div>


                {/* =========================================
                    DESKTOP ACTIONS
                ========================================= */}

                <div
                    className="
                        hidden
                        lg:flex
                        items-center
                        gap-3
                        shrink-0
                    "
                >

                    {/* KENYA */}

                    <div
                        className="
                            flex
                            items-center
                            gap-1.5
                            px-2
                            text-sm
                            font-medium
                            text-gray-600
                        "
                    >

                        <span className="text-base">
                            🇰🇪
                        </span>

                        <span>
                            Kenya
                        </span>

                    </div>


                    {/* LOGIN */}

                    <Link
                        to="/login"
                        className="
                            px-4
                            py-2.5
                            rounded-xl
                            text-sm
                            font-semibold
                            text-black
                            border
                            border-gray-300
                            bg-white
                            hover:bg-gray-50
                            hover:border-gray-400
                            transition
                        "
                    >
                        Log In
                    </Link>


                    {/* GET STARTED */}

                    <Link
                        to="/register"
                        className="
                            px-5
                            py-2.5
                            rounded-xl
                            text-sm
                            font-bold
                            text-white
                            bg-red-600
                            hover:bg-red-700
                            shadow-sm
                            transition
                        "
                    >
                        Get Started
                    </Link>

                </div>


                {/* =========================================
                    MOBILE MENU BUTTON
                ========================================= */}

                <button
                    type="button"
                    aria-label={
                        mobileOpen
                            ? "Close menu"
                            : "Open menu"
                    }
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="
                        lg:hidden
                        w-10
                        h-10
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        text-black
                        bg-gray-100
                        hover:bg-gray-200
                        transition
                    "
                >

                    {mobileOpen ? (
                        <X size={23} />
                    ) : (
                        <Menu size={23} />
                    )}

                </button>

            </nav>


            {/* =============================================
                MOBILE NAVIGATION
            ============================================= */}

            <AnimatePresence>

                {mobileOpen && (

                    <motion.div
                        initial={{
                            opacity: 0,
                            height: 0
                        }}
                        animate={{
                            opacity: 1,
                            height: "auto"
                        }}
                        exit={{
                            opacity: 0,
                            height: 0
                        }}
                        transition={{
                            duration: 0.2
                        }}
                        className="
                            lg:hidden
                            bg-white
                            border-t
                            border-gray-100
                            shadow-lg
                            overflow-hidden
                        "
                    >

                        <div
                            className="
                                max-w-7xl
                                mx-auto
                                px-5
                                py-5
                            "
                        >

                            {/* HOME */}

                            <Link
                                to="/"
                                onClick={closeMenus}
                                className="
                                    block
                                    py-3
                                    text-base
                                    font-semibold
                                    text-black
                                    hover:text-green-700
                                "
                            >
                                Home
                            </Link>


                            {/* SERVICES */}

                            <div
                                className="
                                    border-t
                                    border-gray-100
                                    pt-3
                                    mt-2
                                "
                            >

                                <button
                                    type="button"
                                    onClick={() =>
                                        setServiceOpen(!serviceOpen)
                                    }
                                    className="
                                        w-full
                                        flex
                                        items-center
                                        justify-between
                                        py-3
                                        text-base
                                        font-semibold
                                        text-black
                                    "
                                >

                                    Services

                                    <ChevronDown
                                        size={18}
                                        className={`
                                            transition-transform
                                            ${
                                                serviceOpen
                                                    ? "rotate-180"
                                                    : ""
                                            }
                                        `}
                                    />

                                </button>


                                <AnimatePresence>

                                    {serviceOpen && (

                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                height: 0
                                            }}
                                            animate={{
                                                opacity: 1,
                                                height: "auto"
                                            }}
                                            exit={{
                                                opacity: 0,
                                                height: 0
                                            }}
                                            className="
                                                pl-4
                                                overflow-hidden
                                            "
                                        >

                                            {services.map((item) => (

                                                <Link
                                                    key={item.name}
                                                    to={item.path}
                                                    onClick={closeMenus}
                                                    className="
                                                        block
                                                        py-2.5
                                                        text-sm
                                                        text-gray-600
                                                        hover:text-green-700
                                                    "
                                                >
                                                    {item.name}
                                                </Link>

                                            ))}

                                        </motion.div>

                                    )}

                                </AnimatePresence>

                            </div>


                            {/* HOW IT WORKS */}

                            <Link
                                to="/how-it-works"
                                onClick={closeMenus}
                                className="
                                    block
                                    border-t
                                    border-gray-100
                                    mt-2
                                    py-4
                                    text-base
                                    font-semibold
                                    text-black
                                    hover:text-green-700
                                "
                            >
                                How It Works
                            </Link>


                            {/* COMPANY */}

                            <div
                                className="
                                    border-t
                                    border-gray-100
                                "
                            >

                                <button
                                    type="button"
                                    onClick={() =>
                                        setCompanyOpen(!companyOpen)
                                    }
                                    className="
                                        w-full
                                        flex
                                        items-center
                                        justify-between
                                        py-4
                                        text-base
                                        font-semibold
                                        text-black
                                    "
                                >

                                    Company

                                    <ChevronDown
                                        size={18}
                                        className={`
                                            transition-transform
                                            ${
                                                companyOpen
                                                    ? "rotate-180"
                                                    : ""
                                            }
                                        `}
                                    />

                                </button>


                                <AnimatePresence>

                                    {companyOpen && (

                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                height: 0
                                            }}
                                            animate={{
                                                opacity: 1,
                                                height: "auto"
                                            }}
                                            exit={{
                                                opacity: 0,
                                                height: 0
                                            }}
                                            className="
                                                pl-4
                                                overflow-hidden
                                            "
                                        >

                                            {company.map((item) => (

                                                <Link
                                                    key={item.name}
                                                    to={item.path}
                                                    onClick={closeMenus}
                                                    className="
                                                        block
                                                        py-2.5
                                                        text-sm
                                                        text-gray-600
                                                        hover:text-green-700
                                                    "
                                                >
                                                    {item.name}
                                                </Link>

                                            ))}

                                        </motion.div>

                                    )}

                                </AnimatePresence>

                            </div>


                            {/* PROFESSIONALS */}

                            <Link
                                to="/professionals"
                                onClick={closeMenus}
                                className="
                                    block
                                    border-t
                                    border-gray-100
                                    py-4
                                    text-base
                                    font-semibold
                                    text-black
                                    hover:text-green-700
                                "
                            >
                                For Professionals
                            </Link>


                            {/* CONTACT */}

                            <Link
                                to="/contact"
                                onClick={closeMenus}
                                className="
                                    block
                                    border-t
                                    border-gray-100
                                    py-4
                                    text-base
                                    font-semibold
                                    text-black
                                    hover:text-green-700
                                "
                            >
                                Contact
                            </Link>


                            {/* MOBILE LOCATION */}

                            <div
                                className="
                                    border-t
                                    border-gray-100
                                    pt-4
                                    mt-1
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    font-medium
                                    text-gray-600
                                "
                            >

                                <MapPin size={17} />

                                <span>
                                    Kenya 🇰🇪
                                </span>

                            </div>


                            {/* MOBILE ACTIONS */}

                            <div
                                className="
                                    grid
                                    grid-cols-2
                                    gap-3
                                    mt-5
                                "
                            >

                                <Link
                                    to="/login"
                                    onClick={closeMenus}
                                    className="
                                        text-center
                                        px-4
                                        py-3
                                        rounded-xl
                                        border
                                        border-gray-300
                                        text-black
                                        font-semibold
                                        text-sm
                                        hover:bg-gray-50
                                        transition
                                    "
                                >
                                    Log In
                                </Link>


                                <Link
                                    to="/register"
                                    onClick={closeMenus}
                                    className="
                                        text-center
                                        px-4
                                        py-3
                                        rounded-xl
                                        bg-red-600
                                        text-white
                                        font-bold
                                        text-sm
                                        hover:bg-red-700
                                        transition
                                    "
                                >
                                    Get Started
                                </Link>

                            </div>

                        </div>

                    </motion.div>

                )}

            </AnimatePresence>

        </header>

    );
}
