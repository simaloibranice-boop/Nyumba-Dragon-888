import { motion } from "framer-motion";
import GlassCard from "./GlassCard";

export default function StatCard({

    title,

    value,

    icon: Icon,

    color = "text-cyan-300",

    subtitle = "",

}) {

    return (

        <motion.div

            initial={{
                opacity: 0,
                y: 20
            }}

            animate={{
                opacity: 1,
                y: 0
            }}

            whileHover={{
                y: -8,
                scale: 1.03
            }}

            transition={{
                duration: .25
            }}

        >

            <GlassCard className="h-full">

                <div className="flex items-start justify-between">

                    <div>

                        <p className="text-sm text-white/60">

                            {title}

                        </p>

                        <h2 className="mt-3 text-3xl font-black text-white">

                            {value}

                        </h2>

                        {

                            subtitle && (

                                <p className="mt-2 text-sm text-white/50">

                                    {subtitle}

                                </p>

                            )

                        }

                    </div>

                    {

                        Icon && (

                            <div
                                className={`
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-white/10
                                    ${color}
                                `}
                            >

                                <Icon size={28} />

                            </div>

                        )

                    }

                </div>

            </GlassCard>

        </motion.div>

    );

}
