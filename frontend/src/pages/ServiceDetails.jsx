import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Wallet,
} from "lucide-react";

import { Link, useParams } from "react-router-dom";

import DashboardLayout from "../components/dashboard/DashboardLayout";


const services = {

  electrical: {
    title: "Electrical Services",
    description:
      "Professional electrical installation, repairs and maintenance for homes and businesses.",
    labour: [
      "House wiring",
      "Electrical fault diagnosis",
      "Socket and switch installation",
      "Lighting installation",
      "Distribution board upgrades",
    ],
    price: "KES 2,500 - KES 120,000",
  },

  plumbing: {
    title: "Plumbing Services",
    description:
      "Reliable plumbing solutions for homes, businesses and property maintenance.",
    labour: [
      "Pipe installation",
      "Leak repairs",
      "Bathroom plumbing",
      "Kitchen plumbing",
      "Water tank installation",
    ],
    price: "KES 1,500 - KES 80,000",
  },

  solar: {
    title: "Solar Services",
    description:
      "Professional solar installation, maintenance and renewable energy solutions.",
    labour: [
      "Solar panel installation",
      "Battery setup",
      "Inverter installation",
      "Solar maintenance",
      "System inspection",
    ],
    price: "KES 15,000 - KES 850,000",
  },

  mechanical: {
    title: "Mechanical Services",
    description:
      "Trusted mechanics for vehicles, equipment and general mechanical work.",
    labour: [
      "Engine diagnostics",
      "Brake repairs",
      "Oil service",
      "Suspension repairs",
      "General maintenance",
    ],
    price: "KES 2,000 - KES 250,000",
  },

  healthcare: {
    title: "Healthcare Services",
    description:
      "Professional home healthcare and support services.",
    labour: [
      "Home nursing",
      "Medical consultation",
      "Patient monitoring",
      "Elderly care",
      "Health assessments",
    ],
    price: "KES 1,000 - KES 50,000",
  },

  construction: {
    title: "Construction Services",
    description:
      "Construction, renovation, masonry, roofing and finishing services.",
    labour: [
      "House construction",
      "Renovations",
      "Roofing",
      "Painting",
      "Interior finishing",
    ],
    price: "KES 10,000 - KES 5,000,000",
  },

  cleaning: {
    title: "Cleaning Services",
    description:
      "Professional residential, commercial and deep cleaning services.",
    labour: [
      "Home cleaning",
      "Office cleaning",
      "Deep cleaning",
      "Carpet cleaning",
      "Post-construction cleaning",
    ],
    price: "KES 1,000 - KES 50,000",
  },

};


export default function ServiceDetails() {

  const { slug } = useParams();

  const service = services[slug];


  if (!service) {

    return (

      <DashboardLayout role="client">

        <div
          className="
            min-h-screen
            bg-[#F5F5F5]
            flex
            items-center
            justify-center
            p-6
          "
        >

          <div
            className="
              bg-white
              border
              border-gray-200
              rounded-3xl
              p-10
              text-center
              max-w-lg
            "
          >

            <h1 className="text-3xl font-black">
              Service Not Found
            </h1>

            <p className="text-gray-600 mt-3">
              The service you are looking for does not exist.
            </p>

            <Link
              to="/services"
              className="
                inline-flex
                items-center
                gap-2
                mt-6
                bg-black
                text-white
                px-6
                py-3
                rounded-xl
                font-black
              "
            >

              <ArrowLeft size={18} />

              Back to Services

            </Link>

          </div>

        </div>

      </DashboardLayout>

    );

  }


  return (

    <DashboardLayout role="client">

      <div className="min-h-screen bg-[#F5F5F5] text-black">

        {/* HEADER */}

        <section
          className="
            bg-black
            text-white
            rounded-3xl
            p-6
            md:p-8
            mb-8
          "
        >

          <Link
            to="/services"
            className="
              inline-flex
              items-center
              gap-2
              text-gray-300
              hover:text-white
              font-bold
              mb-6
            "
          >

            <ArrowLeft size={18} />

            Back to Services

          </Link>


          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:items-end
              lg:justify-between
              gap-6
            "
          >

            <div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-green-400
                  font-black
                  text-xs
                  uppercase
                  tracking-wider
                "
              >

                <ShieldCheck size={17} />

                Verified Service Category

              </div>


              <h1
                className="
                  text-3xl
                  md:text-5xl
                  font-black
                  mt-3
                "
              >
                {service.title}
              </h1>


              <p
                className="
                  text-gray-300
                  mt-4
                  max-w-3xl
                  text-lg
                  font-medium
                "
              >
                {service.description}
              </p>

            </div>


            <div
              className="
                bg-white/10
                rounded-2xl
                px-5
                py-4
                min-w-[220px]
              "
            >

              <p className="text-gray-400 text-sm font-bold">
                Estimated service range
              </p>

              <p className="text-green-400 text-xl font-black mt-1">
                {service.price}
              </p>

            </div>

          </div>

        </section>


        {/* CONTENT */}

        <div
          className="
            grid
            lg:grid-cols-3
            gap-6
            mb-10
          "
        >

          <section
            className="
              lg:col-span-2
              bg-white
              rounded-3xl
              border
              border-gray-200
              p-6
              md:p-8
            "
          >

            <h2 className="text-2xl font-black">
              What professionals can help with
            </h2>


            <div
              className="
                grid
                sm:grid-cols-2
                gap-4
                mt-6
              "
            >

              {service.labour.map((item) => (

                <div
                  key={item}
                  className="
                    flex
                    items-center
                    gap-3
                    bg-gray-50
                    border
                    border-gray-200
                    rounded-2xl
                    p-4
                  "
                >

                  <CheckCircle2
                    size={20}
                    className="text-green-700 shrink-0"
                  />

                  <span className="font-bold">
                    {item}
                  </span>

                </div>

              ))}

            </div>

          </section>


          {/* REQUEST CARD */}

          <section
            className="
              bg-white
              rounded-3xl
              border
              border-gray-200
              p-6
              h-fit
            "
          >

            <div
              className="
                w-14
                h-14
                bg-black
                text-white
                rounded-2xl
                flex
                items-center
                justify-center
              "
            >

              <Wallet size={24} />

            </div>


            <h2 className="text-xl font-black mt-5">
              Ready to book?
            </h2>


            <p className="text-gray-600 mt-2 font-medium">
              Submit your project details and let Nyũmba Dragon 888
              connect you with a suitable professional.
            </p>


            <div
              className="
                flex
                items-center
                gap-2
                text-gray-600
                font-bold
                text-sm
                mt-5
              "
            >

              <MapPin
                size={17}
                className="text-green-700"
              />

              Service available in your area

            </div>


            <Link
              to={`/client/requests/new?service=${slug}`}
              className="
                mt-6
                w-full
                bg-red-600
                hover:bg-red-700
                text-white
                font-black
                px-6
                py-4
                rounded-xl
                flex
                items-center
                justify-center
                gap-2
                transition
              "
            >

              Request Service

              <ArrowRight size={18} />

            </Link>

          </section>

        </div>

      </div>

    </DashboardLayout>

  );

}
