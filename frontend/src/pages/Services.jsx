import {
  ArrowRight,
  Search,
  ShieldCheck,
  MapPin,
  Zap,
  Droplets,
  Sun,
  Wrench,
  Building2,
  Sparkles,
  Shield,
  HeartPulse,
  Utensils,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useMemo, useState } from "react";


const services = [
  {
    slug: "electrical",
    name: "Electrical Services",
    category: "Electrical",
    description:
      "Professional electrical installation, repairs, wiring and maintenance for homes and businesses.",
    image: "/images/electrician.jpg",
    icon: Zap,
  },
  {
    slug: "plumbing",
    name: "Plumbing Services",
    category: "Plumbing",
    description:
      "Reliable plumbing installation, leak repairs, piping, drainage and water system solutions.",
    image: "/images/plumber.jpg",
    icon: Droplets,
  },
  {
    slug: "construction",
    name: "Construction & Masonry",
    category: "Construction",
    description:
      "Building, masonry, renovations, roofing, plastering and property improvement services.",
    image: "/images/mason.jpg",
    icon: Building2,
  },
  {
    slug: "solar",
    name: "Solar Services",
    category: "Solar",
    description:
      "Solar panel installation, batteries, inverters, maintenance and renewable energy solutions.",
    image: "/images/solar-technician.jpg",
    icon: Sun,
  },
  {
    slug: "mechanical",
    name: "Mechanical Services",
    category: "Mechanical",
    description:
      "Vehicle, machinery and equipment diagnostics, repairs and maintenance by skilled professionals.",
    image: "/images/mechanic.jpg",
    icon: Wrench,
  },
  {
    slug: "security",
    name: "Security Services",
    category: "Security",
    description:
      "CCTV installation, security systems, access control and property protection solutions.",
    image: "/images/security.jpg",
    icon: Shield,
  },
  {
    slug: "cleaning",
    name: "Cleaning Services",
    category: "Cleaning",
    description:
      "Professional home, office, deep cleaning, carpet and post-construction cleaning services.",
    image: "/images/cleaner.jpg",
    icon: Sparkles,
  },
  {
    slug: "healthcare",
    name: "Healthcare Services",
    category: "Healthcare",
    description:
      "Trusted healthcare support including home nursing, patient care and health assistance.",
    image: "/images/healthcare.jpg",
    icon: HeartPulse,
  },
  {
    slug: "catering",
    name: "Catering Services",
    category: "Catering",
    description:
      "Professional catering and food service support for homes, events and corporate functions.",
    image: "/images/catering.jpg",
    icon: Utensils,
  },
];


const categories = [
  "All",
  "Electrical",
  "Plumbing",
  "Construction",
  "Solar",
  "Mechanical",
  "Security",
  "Cleaning",
  "Healthcare",
  "Catering",
];


export default function Services() {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");


  const filteredServices = useMemo(() => {

    return services.filter((service) => {

      const matchesCategory =
        category === "All" ||
        service.category === category;

      const searchText =
        `${service.name} ${service.description} ${service.category}`
          .toLowerCase();

      const matchesSearch =
        searchText.includes(search.toLowerCase());

      return matchesCategory && matchesSearch;

    });

  }, [search, category]);


  return (

    <div className="min-h-screen bg-[#F5F5F5] text-black">

      {/* HERO */}

      <section className="bg-black text-white">

        <div className="max-w-7xl mx-auto px-6 md:px-8 py-14 md:py-20">

          <div className="max-w-3xl">

            <div
              className="
                inline-flex
                items-center
                gap-2
                bg-white/10
                px-4
                py-2
                rounded-full
              "
            >

              <span className="w-2 h-2 bg-green-500 rounded-full" />

              <span className="text-green-400 text-xs font-black">
                NYŨMBA DRAGON 888 MARKETPLACE
              </span>

            </div>


            <h1
              className="
                text-4xl
                md:text-6xl
                font-black
                leading-tight
                mt-6
              "
            >
              Find trusted professionals
              <span className="text-green-500"> for your project.</span>
            </h1>


            <p
              className="
                text-gray-300
                text-lg
                md:text-xl
                mt-5
                max-w-2xl
                font-medium
                leading-relaxed
              "
            >
              Connect with verified Kenyan professionals for
              construction, home improvement, technical,
              lifestyle and essential services.
            </p>

          </div>


          {/* SEARCH */}

          <div
            className="
              bg-white
              rounded-2xl
              p-2
              mt-10
              max-w-4xl
              flex
              flex-col
              md:flex-row
              gap-2
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
                flex-1
                px-4
                py-3
              "
            >

              <Search
                size={21}
                className="text-gray-500"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                type="text"
                placeholder="Search for a service..."
                className="
                  w-full
                  outline-none
                  text-black
                  font-semibold
                "
              />

            </div>


            <button
              onClick={() =>
                document
                  .getElementById("services-grid")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
              className="
                bg-green-700
                hover:bg-green-800
                text-white
                font-black
                px-8
                py-3
                rounded-xl
                transition
              "
            >
              Search Services
            </button>

          </div>

        </div>

      </section>


      {/* MARKETPLACE */}

      <main
        id="services-grid"
        className="
          max-w-7xl
          mx-auto
          px-6
          md:px-8
          py-12
        "
      >

        {/* HEADING */}

        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-end
            lg:justify-between
            gap-5
            mb-8
          "
        >

          <div>

            <p
              className="
                text-green-700
                text-sm
                font-black
                uppercase
                tracking-widest
              "
            >
              Explore our marketplace
            </p>

            <h2
              className="
                text-3xl
                md:text-4xl
                font-black
                mt-2
              "
            >
              Services for every need
            </h2>

            <p className="text-gray-600 mt-2 font-medium">
              Choose a category and find the right professional
              for your project.
            </p>

          </div>

        </div>


        {/* CATEGORY FILTER */}

        <div
          className="
            flex
            gap-2
            overflow-x-auto
            pb-3
            mb-8
          "
        >

          {categories.map((item) => (

            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`
                whitespace-nowrap
                px-5
                py-2.5
                rounded-full
                font-black
                text-sm
                transition
                ${
                  category === item
                    ? "bg-black text-white"
                    : "bg-white border border-gray-200 text-gray-700 hover:border-green-700 hover:text-green-700"
                }
              `}
            >
              {item}
            </button>

          ))}

        </div>


        {/* SERVICE CARDS */}

        {filteredServices.length > 0 ? (

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-6
            "
          >

            {filteredServices.map((service) => {

              const Icon = service.icon;

              return (

                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="
                    group
                    bg-white
                    rounded-3xl
                    overflow-hidden
                    border
                    border-gray-200
                    hover:border-green-700
                    hover:shadow-xl
                    transition
                  "
                >

                  {/* IMAGE */}

                  <div className="relative h-52 overflow-hidden">

                    <img
                      src={service.image}
                      alt={service.name}
                      className="
                        w-full
                        h-full
                        object-cover
                        group-hover:scale-105
                        transition
                        duration-500
                      "
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />


                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/70
                        via-black/10
                        to-transparent
                      "
                    />


                    <div
                      className="
                        absolute
                        left-4
                        bottom-4
                        flex
                        items-center
                        gap-2
                        text-white
                      "
                    >

                      <div
                        className="
                          w-10
                          h-10
                          rounded-xl
                          bg-white
                          text-black
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <Icon size={20} />
                      </div>

                      <span className="font-black">
                        {service.category}
                      </span>

                    </div>

                  </div>


                  {/* CONTENT */}

                  <div className="p-6">

                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-4
                      "
                    >

                      <h3
                        className="
                          text-xl
                          font-black
                        "
                      >
                        {service.name}
                      </h3>


                      <ArrowRight
                        size={20}
                        className="
                          text-red-600
                          shrink-0
                          group-hover:translate-x-1
                          transition
                        "
                      />

                    </div>


                    <p
                      className="
                        text-gray-600
                        mt-3
                        font-medium
                        leading-relaxed
                      "
                    >
                      {service.description}
                    </p>


                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        mt-6
                        pt-5
                        border-t
                        border-gray-100
                      "
                    >

                      <span
                        className="
                          text-sm
                          text-gray-500
                          font-bold
                          flex
                          items-center
                          gap-2
                        "
                      >
                        <MapPin size={15} />
                        Kenya
                      </span>


                      <span
                        className="
                          text-red-600
                          font-black
                          text-sm
                        "
                      >
                        Explore →
                      </span>

                    </div>

                  </div>

                </Link>

              );

            })}

          </div>

        ) : (

          <div
            className="
              bg-white
              rounded-3xl
              border
              border-gray-200
              p-12
              text-center
            "
          >

            <Search
              size={42}
              className="mx-auto text-gray-400"
            />

            <h3 className="text-2xl font-black mt-5">
              No services found
            </h3>

            <p className="text-gray-600 mt-2 font-medium">
              Try another search or category.
            </p>

          </div>

        )}


        {/* TRUST BANNER */}

        <section
          className="
            bg-black
            text-white
            rounded-3xl
            p-7
            md:p-9
            mt-12
          "
        >

          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-7
            "
          >

            <div>

              <div
                className="
                  flex
                  items-center
                  gap-3
                  mb-3
                "
              >

                <ShieldCheck
                  size={25}
                  className="text-green-500"
                />

                <span
                  className="
                    text-green-400
                    font-black
                    text-sm
                  "
                >
                  VERIFIED PROFESSIONALS
                </span>

              </div>


              <h2
                className="
                  text-2xl
                  md:text-3xl
                  font-black
                "
              >
                Local expertise. Trusted service.
              </h2>


              <p
                className="
                  text-gray-300
                  mt-2
                  max-w-2xl
                  font-medium
                "
              >
                Nyũmba Dragon 888 connects you with
                professionals you can confidently invite
                into your home, business or project.
              </p>

            </div>


            <Link
              to="/client/requests/new?service=electrical"
              className="
                bg-red-600
                hover:bg-red-700
                text-white
                font-black
                px-7
                py-4
                rounded-xl
                flex
                items-center
                justify-center
                gap-2
                whitespace-nowrap
                transition
              "
            >

              Request a Service

              <ArrowRight size={19} />

            </Link>

          </div>

        </section>

      </main>

    </div>

  );

}
