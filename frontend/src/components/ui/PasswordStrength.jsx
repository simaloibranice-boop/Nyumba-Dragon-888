import { motion } from "framer-motion";


export default function PasswordStrength({ password = "" }) {


    function strength() {

        if (password.length < 4)
            return {
                label: "Weak",
                width: "25%",
                color: "bg-red-500"
            };


        if (
            password.length >= 8 &&
            password.match(/[A-Z]/) &&
            password.match(/[0-9]/) &&
            password.match(/[^A-Za-z0-9]/)
        )

            return {
                label: "Strong",
                width: "100%",
                color: "bg-cyan-400"
            };


        if (password.length >= 6)

            return {
                label: "Good",
                width: "70%",
                color: "bg-blue-400"
            };


        return {
            label:"Medium",
            width:"50%",
            color:"bg-yellow-400"
        };

    }



    const result = strength();



    return (

        <div className="mt-3 space-y-2">


            <div className="
            flex
            justify-between
            text-sm
            text-white/60
            ">

                <span>
                    Password strength
                </span>


                <span className="font-bold text-white">

                    {result.label}

                </span>


            </div>



            <div className="
            h-2
            overflow-hidden
            rounded-full
            bg-white/10
            ">


                <motion.div

                    initial={{
                        width:0
                    }}

                    animate={{
                        width:result.width
                    }}

                    transition={{
                        duration:.4
                    }}

                    className={`
                    h-full
                    rounded-full
                    ${result.color}
                    `}

                />


            </div>


        </div>

    );

}
