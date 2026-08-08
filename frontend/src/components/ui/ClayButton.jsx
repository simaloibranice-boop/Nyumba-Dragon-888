import { motion } from "framer-motion";

export default function ClayButton({

    children,

    onClick,

    type = "button",

    disabled = false,

    className = "",

    variant = "primary",

}) {

    const variants = {

        primary: `
            bg-gradient-to-r
            from-cyan-400
            via-sky-500
            to-blue-600
            text-white
            hover:brightness-110
        `,

        secondary: `
            bg-white/10
            backdrop-blur-3xl
            border
            border-white/10
            text-white
            hover:bg-white/20
        `,

        danger: `
            bg-gradient-to-r
            from-red-500
            to-rose-600
            text-white
            hover:brightness-110
        `

    };

    return (

        <motion.button

            whileHover={
                disabled
                    ? {}
                    : {
                          scale: 1.04,
                          y: -3,
                      }
            }

            whileTap={
                disabled
                    ? {}
                    : {
                          scale: .97,
                      }
            }

            transition={{
                duration: .2,
            }}

            type={type}

            disabled={disabled}

            onClick={onClick}

            className={`
                inline-flex
                items-center
                justify-center
                gap-2

                rounded-2xl

                px-6
                py-3

                font-bold

                shadow-[12px_12px_28px_rgba(0,0,0,.35),inset_3px_3px_10px_rgba(255,255,255,.15)]

                transition-all

                disabled:opacity-50
                disabled:cursor-not-allowed

                ${variants[variant]}

                ${className}
            `}

        >

            {children}

        </motion.button>

    );

}
