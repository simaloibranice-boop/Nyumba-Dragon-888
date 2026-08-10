import {
  Search,
  MapPin,
  ShieldCheck,
  CreditCard,
  Navigation,
  Headphones,
} from "lucide-react";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  const trustItems = [
    {
      icon: <ShieldCheck size={20} />,
      text: "Verified Professionals",
    },
    {
      icon: <CreditCard size={20} />,
      text: "Secure Payments",
    },
    {
      icon: <Navigation size={20} />,
      text: "Live Tracking",
    },
    {
      icon: <Headphones size={20} />,
      text: "24/7 Support",
    },
  ];

  return (
    <section
      className="
        relative
        min-h-screen
        bg-white
        overflow-hidden
        flex
        items-center
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          pt-32
          pb-16
          grid
          lg:grid-cols-2
          gap-12
          items-center
          w-full
        "
      >
        {/* LEFT CONTENT */}

        <motion.div
          initial={{
            opacity: 0,
            x: -50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          {/* BADGE */}

          <div
            className="
              inline-flex
              items-center
              px-4
              py-2
              rounded-full
              bg-green-100
              text-green-700
              text-sm
              font-semibold
              mb-6
            "
          >
            KENYA'S TRUSTED HOME & PROPERTY PLATFORM
          </div>

          {/* HEADING */}

          <h1
            className="
              text-5xl
              lg:text-7xl
              font-bold
              leading-tight
              text-black
            "
          >
            Find Trusted Fundis

            <span className="text-red-600">
              {" "}For Every
            </span>

            <span className="text-green-700">
              {" "}Home Project
            </span>
          </h1>

          {/* DESCRIPTION */}

          <p
            className="
              mt-6
              text-gray-600
              text-lg
              leading-relaxed
              max-w-xl
            "
          >
            Nyũmba Dragon 888 connects you with verified,
            skilled professionals across Kenya.
            Fast. Reliable. Affordable.
          </p>

          {/* CTA BUTTONS */}

          <div
            className="
              flex
              flex-wrap
              gap-4
              mt-8
            "
          >
            {/* BOOK A SERVICE */}

            <Link
              to="/register"
              className="
                inline-flex
                items-center
                justify-center
                bg-red-600
                text-white
                px-7
                py-3
                rounded-xl
                font-semibold
                hover:bg-red-700
                transition-all
                duration-200
                shadow-md
                hover:shadow-lg
                hover:-translate-y-0.5
              "
            >
              Book a Service
            </Link>

            {/* BROWSE SERVICES */}

            <Link
              to="/services"
              className="
                inline-flex
                items-center
                justify-center
                bg-white
                text-black
                border-2
                border-black
                px-7
                py-3
                rounded-xl
                font-semibold
                hover:bg-black
                hover:text-white
                transition-all
                duration-200
                shadow-sm
                hover:shadow-md
                hover:-translate-y-0.5
              "
            >
              Browse Services
            </Link>
          </div>

          {/* SEARCH */}

          <div
            className="
              mt-8
              bg-white
              border
              border-gray-200
              shadow-lg
              rounded-2xl
              p-3
              flex
              flex-col
              md:flex-row
              gap-3
              max-w-xl
            "
          >
            {/* SERVICE SEARCH */}

            <div
              className="
                flex
                items-center
                gap-3
                px-4
                flex-1
                min-h-[48px]
              "
            >
              <Search className="text-gray-500 shrink-0" />

              <span className="text-gray-400">
                What service do you need?
              </span>
            </div>

            {/* LOCATION */}

            <div
              className="
                flex
                items-center
                gap-2
                px-4
                text-gray-700
                min-h-[48px]
              "
            >
              <MapPin
                size={20}
                className="text-green-600"
              />

              Nairobi
            </div>

            {/* SEARCH BUTTON */}

            <Link
              to="/services"
              aria-label="Search services"
              className="
                flex
                items-center
                justify-center
                bg-green-600
                hover:bg-green-700
                text-white
                p-3
                rounded-xl
                transition-all
                duration-200
                hover:scale-105
              "
            >
              <Search size={22} />
            </Link>
          </div>

          {/* TRUST ITEMS */}

          <div
            className="
              grid
              grid-cols-2
              gap-4
              mt-8
            "
          >
            {trustItems.map((item, index) => (
              <div
                key={index}
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-gray-700
                "
              >
                <div className="text-green-600">
                  {item.icon}
                </div>

                {item.text}
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}

        <motion.div
          className="relative"
          initial={{
            opacity: 0,
            x: 50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
        >
          <div
            className="
              rounded-3xl
              overflow-hidden
              shadow-2xl
            "
          >
            <img
              src="/images/hero-fundi.jpg"
              alt="Kenyan fundi working"
              className="
                w-full
                h-[600px]
                object-cover
              "
            />
          </div>

          {/* STAT CARD */}

          <div
            className="
              absolute
              bottom-10
              left-[-20px]
              bg-white
              shadow-xl
              rounded-2xl
              p-5
              border
              border-gray-100
            "
          >
            <h3
              className="
                text-3xl
                font-bold
                text-black
              "
            >
              500+
            </h3>

            <p
              className="
                text-gray-600
              "
            >
              Verified Professionals
              <br />
              Across Kenya
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
