import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-[#020617]
      via-[#071A33]
      to-[#111827]
      text-white
      "
    >
      <section
        className="
        max-w-7xl
        mx-auto
        px-8
        py-24
        flex
        flex-col
        items-center
        justify-center
        text-center
        "
      >
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="
          text-5xl
          md:text-7xl
          font-black
          leading-tight
          "
        >
          Nyũmba{" "}
          <span className="text-cyan-300">
            Dragon 888
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="
          mt-8
          max-w-3xl
          text-xl
          text-gray-300
          "
        >
          Kenya's intelligent home and property services ecosystem.
          Connect clients with trusted professionals through one
          powerful digital platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="
          flex
          flex-wrap
          justify-center
          gap-5
          mt-12
          "
        >
          <Link
            to="/register"
            className="
            px-8
            py-4
            rounded-2xl
            bg-cyan-400
            text-black
            font-black
            hover:bg-cyan-300
            transition
            "
          >
            Get Started
          </Link>

          <Link
            to="/services"
            className="
            px-8
            py-4
            rounded-2xl
            border
            border-cyan-300
            text-cyan-300
            font-bold
            hover:bg-cyan-300/10
            transition
            "
          >
            Explore Services
          </Link>
        </motion.div>

        <div
          className="
          grid
          md:grid-cols-3
          gap-8
          mt-24
          w-full
          "
        >
          {[
            {
              title: "Verified Professionals",
              value: "500+",
            },
            {
              title: "Service Requests",
              value: "10,000+",
            },
            {
              title: "Customer Satisfaction",
              value: "98%",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-8
              backdrop-blur-xl
              "
            >
              <h2
                className="
                text-4xl
                font-black
                text-cyan-300
                "
              >
                {item.value}
              </h2>

              <p
                className="
                mt-3
                text-gray-300
                "
              >
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
