import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  MapPin,
  Briefcase,
  ShieldCheck,
  Phone,
} from "lucide-react";

const professionals = {
  "john-mwangi": {
    name: "John Mwangi",
    role: "Electrician",
    location: "Nairobi",
    jobs: "500+",
    rating: "4.9",
    image: "/images/electrician.jpg",
    description:
      "Experienced electrician providing reliable residential and commercial electrical services across Nairobi.",
  },

  "mary-wanjiku": {
    name: "Mary Wanjiku",
    role: "Solar Technician",
    location: "Nakuru",
    jobs: "300+",
    rating: "4.8",
    image: "/images/solar-technician.jpg",
    description:
      "Professional solar technician helping homes and businesses access reliable and affordable solar solutions.",
  },

  "peter-otieno": {
    name: "Peter Otieno",
    role: "Mason",
    location: "Kisumu",
    jobs: "450+",
    rating: "4.9",
    image: "/images/mason.jpg",
    description:
      "Skilled mason specializing in construction, renovation, masonry and finishing projects.",
  },

  "david-kamau": {
    name: "David Kamau",
    role: "Carpenter",
    location: "Kiambu",
    jobs: "280+",
    rating: "4.7",
    image: "/images/carpenter.jpg",
    description:
      "Experienced carpenter delivering quality custom woodwork, furniture and home improvement projects.",
  },
};

export default function PublicProfessionalProfile() {
  const { slug } = useParams();

  const professional = professionals[slug];

  if (!professional) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-black text-black">
            Professional Not Found
          </h1>

          <p className="mt-4 text-gray-500">
            The professional profile you're looking for does not exist.
          </p>

          <Link
            to="/"
            className="
              inline-flex
              items-center
              gap-2
              mt-8
              bg-black
              text-white
              px-6
              py-3
              rounded-xl
              font-bold
              hover:bg-green-700
              transition
            "
          >
            <ArrowLeft size={18} />
            Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}

      <header className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <Link
            to="/"
            className="
              inline-flex
              items-center
              gap-2
              text-white
              hover:text-green-400
              transition
              font-semibold
            "
          >
            <ArrowLeft size={18} />
            Back to Nyũmba Dragon 888
          </Link>
        </div>
      </header>

      {/* PROFILE */}

      <main className="max-w-5xl mx-auto px-6 py-12">

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* COVER */}

          <div className="h-48 bg-black relative">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-green-900 opacity-90" />
          </div>

          {/* PROFILE CONTENT */}

          <div className="px-6 md:px-10 pb-10">

            <div className="-mt-24 relative">

              <img
                src={professional.image}
                alt={professional.name}
                className="
                  w-40
                  h-40
                  rounded-3xl
                  object-cover
                  border-8
                  border-white
                  shadow-xl
                "
              />

            </div>

            <div className="mt-6 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

              <div>

                <div className="flex items-center gap-3 flex-wrap">

                  <h1 className="text-4xl font-black text-black">
                    {professional.name}
                  </h1>

                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1
                      bg-green-100
                      text-green-700
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      font-bold
                    "
                  >
                    <ShieldCheck size={16} />
                    Verified
                  </span>

                </div>

                <p className="text-green-700 text-xl font-semibold mt-2">
                  {professional.role}
                </p>

                <div className="flex flex-wrap gap-5 mt-4 text-gray-500">

                  <span className="flex items-center gap-2">
                    <MapPin size={18} />
                    {professional.location}
                  </span>

                  <span className="flex items-center gap-2">
                    <Star
                      size={18}
                      className="text-red-600"
                    />
                    {professional.rating} Rating
                  </span>

                  <span className="flex items-center gap-2">
                    <Briefcase size={18} />
                    {professional.jobs} Jobs
                  </span>

                </div>

              </div>

              <Link
                to={`/client/requests/new?professional=${slug}`}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  bg-red-600
                  hover:bg-red-700
                  text-white
                  px-7
                  py-4
                  rounded-xl
                  font-black
                  transition
                "
              >
                Book This Professional
              </Link>

            </div>

            {/* ABOUT */}

            <div className="mt-12 border-t pt-8">

              <h2 className="text-2xl font-black text-black">
                About {professional.name}
              </h2>

              <p className="mt-4 text-gray-600 leading-relaxed max-w-3xl">
                {professional.description}
              </p>

            </div>

            {/* STATS */}

            <div className="grid md:grid-cols-3 gap-5 mt-10">

              <div className="bg-gray-50 rounded-2xl p-6">
                <ShieldCheck className="text-green-600" size={28} />

                <p className="text-2xl font-black text-black mt-3">
                  Verified
                </p>

                <p className="text-gray-500 mt-1">
                  Nyũmba Dragon professional
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <Star className="text-red-600" size={28} />

                <p className="text-2xl font-black text-black mt-3">
                  {professional.rating}
                </p>

                <p className="text-gray-500 mt-1">
                  Customer rating
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <Briefcase className="text-green-600" size={28} />

                <p className="text-2xl font-black text-black mt-3">
                  {professional.jobs}
                </p>

                <p className="text-gray-500 mt-1">
                  Jobs completed
                </p>
              </div>

            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
