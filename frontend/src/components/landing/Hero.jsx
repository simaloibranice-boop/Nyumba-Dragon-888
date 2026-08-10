import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Users,
  Home,
} from "lucide-react";

export default function Hero() {
  return (
    <section
      className="
        relative
        min-h-screen
        flex
        items-center
        overflow-hidden
        px-6
        py-20
      "
    >
      {/* Background Glow */}
      <div
        className="
          absolute
          top-20
          left-20
          w-96
          h-96
          rounded-full
          bg-cyan-400/20
          blur-3xl
        "
      />

      <div
        className="
          absolute
          right-20
          bottom-20
          w-96
          h-96
          rounded-full
          bg-blue-500/20
          blur-3xl
        "
      />

      {/* Main Content */}
      <div
        className="
          relative
          max-w-7xl
          mx-auto
          grid
          lg:grid-cols-2
          gap-16
          items-center
          w-full
        "
      >
        {/* LEFT SIDE */}
        <motion.div
          initial={{
            opacity: 0,
            x: -40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          {/* Trust Badge */}
          <div
            className="
              inline-flex
              items-center
              gap-2
              glass
              rounded-full
              px-5
              py-3
              text-cyan-300
              font-bold
            "
          >
            <ShieldCheck size={20} />

            <span>Trusted African Digital Ecosystem</span>
          </div>

          {/* Main Heading */}
          <h1
            className="
              mt-8
              text-5xl
              md:text-7xl
              font-black
              leading-tight
              text-white
            "
          >
            Nyũmba Dragon 888

            <br />

            <span className="text-cyan-300">
              Intelligent Home Services
            </span>
          </h1>

          {/* Description */}
          <p
            className="
              mt-6
              text-xl
              text-white/70
              max-w-xl
              leading-relaxed
            "
          >
            Kenya's intelligent home and property services ecosystem.
            Connect clients with verified professionals through one
            powerful digital platform.
          </p>

          {/* CTA BUTTONS */}
          <div
            className="
              flex
              flex-wrap
              gap-5
              mt-10
            "
          >
            {/* GET STARTED */}
            <Link
              to="/register"
              className="
                bg-cyan-400
                text-black
                hover:bg-cyan-300
                px-8
                py-4
                rounded-full
                font-black
                flex
                items-center
                gap-3
                transition-all
                duration-200
                shadow-lg
                shadow-cyan-400/20
                hover:scale-105
              "
            >
              <span>Get Started</span>

              <ArrowRight size={20} />
            </Link>

            {/* EXPLORE SERVICES */}
            <Link
              to="/services"
              className="
                bg-white
                text-black
                hover:bg-gray-100
                px-8
                py-4
                rounded-full
                font-black
                transition-all
                duration-200
                border
                border-white
                hover:scale-105
              "
            >
              Explore Services
            </Link>
          </div>

          {/* STATISTICS */}
          <div
            className="
              grid
              grid-cols-3
              gap-5
              mt-12
            "
          >
            {/* PROFESSIONALS */}
            <div
              className="
                glass
                rounded-3xl
                p-5
              "
            >
              <Users
                size={26}
                className="text-cyan-300"
              />

              <p
                className="
                  text-2xl
                  font-black
                  mt-3
                  text-white
                "
              >
                500+
              </p>

              <p
                className="
                  text-white/60
                  text-sm
                "
              >
                Professionals
              </p>
            </div>

            {/* REQUESTS */}
            <div
              className="
                glass
                rounded-3xl
                p-5
              "
            >
              <Home
                size={26}
                className="text-cyan-300"
              />

              <p
                className="
                  text-2xl
                  font-black
                  mt-3
                  text-white
                "
              >
                10K+
              </p>

              <p
                className="
                  text-white/60
                  text-sm
                "
              >
                Requests
              </p>
            </div>

            {/* SATISFACTION */}
            <div
              className="
                glass
                rounded-3xl
                p-5
              "
            >
              <ShieldCheck
                size={26}
                className="text-cyan-300"
              />

              <p
                className="
                  text-2xl
                  font-black
                  mt-3
                  text-white
                "
              >
                98%
              </p>

              <p
                className="
                  text-white/60
                  text-sm
                "
              >
                Satisfaction
              </p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
            delay: 0.2,
          }}
          className="
            glass
            rounded-[60px]
            p-10
          "
        >
          <div
            className="
              clay
              rounded-[50px]
              aspect-square
              flex
              items-center
              justify-center
            "
          >
            <div
              className="
                text-8xl
                md:text-9xl
                font-black
                text-cyan-300
              "
            >
              888
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
