import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export default function FormInput({

    icon,

    label,

    placeholder,

    type = "text",

    value,

    onChange,

    name,

    required = false,

    error = "",

    disabled = false,

}) {

    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    return (

        <div className="w-full space-y-2">

            {label && (

                <label className="block text-sm font-semibold text-white/80">

                    {label}

                </label>

            )}

            <motion.div

                whileFocus={{ scale: 1.01 }}

                className="
                flex
                items-center
                gap-3

                rounded-[22px]

                border
                border-white/10

                bg-white/10

                backdrop-blur-3xl

                px-5
                py-4

                shadow-[inset_4px_4px_12px_rgba(255,255,255,.08),10px_10px_30px_rgba(0,0,0,.30)]

                transition-all

                focus-within:border-cyan-400/60
                "

            >

                {icon && (

                    <div className="text-cyan-300">

                        {icon}

                    </div>

                )}

                <input

                    name={name}

                    required={required}

                    disabled={disabled}

                    value={value}

                    onChange={onChange}

                    placeholder={placeholder}

                    type={
                        isPassword
                            ? (
                                showPassword
                                    ? "text"
                                    : "password"
                              )
                            : type
                    }

                    className="
                    w-full

                    bg-transparent

                    text-white

                    placeholder:text-white/40

                    outline-none
                    "

                />

                {isPassword && (

                    <button

                        type="button"

                        onClick={() => setShowPassword(!showPassword)}

                        className="
                        text-cyan-300
                        hover:text-white
                        transition
                        "

                    >

                        {

                            showPassword

                                ? <EyeOff size={20}/>

                                : <Eye size={20}/>

                        }

                    </button>

                )}

            </motion.div>

            {

                error && (

                    <p className="pl-2 text-sm text-red-400">

                        {error}

                    </p>

                )

            }

        </div>

    );

}
