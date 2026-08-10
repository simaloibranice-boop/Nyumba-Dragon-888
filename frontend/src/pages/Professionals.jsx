import { Link } from "react-router-dom";
import { MapPin, Star, Briefcase, ShieldCheck } from "lucide-react";

const professionals = [
  {
    slug: "john-mwangi",
    name: "John Mwangi",
    role: "Electrician",
    location: "Nairobi",
    jobs: "500+",
    rating: "4.9",
    image: "/images/electrician.jpg",
  },
  {
    slug: "mary-wanjiku",
    name: "Mary Wanjiku",
    role: "Solar Technician",
    location: "Nakuru",
    jobs: "300+",
    rating: "4.8",
    image: "/images/solar-technician.jpg",
  },
  {
    slug: "peter-otieno",
    name: "Peter Otieno",
    role: "Mason",
    location: "Kisumu",
    jobs: "450+",
    rating: "4.9",
    image: "/images/mason.jpg",
  },
  {
    slug: "david-kamau",
    name: "David Kamau",
    role: "Carpenter",
    location: "Kiambu",
    jobs: "280+",
    rating: "4.7",
    image: "/images/carpenter.jpg",
  },
];

export default function Professionals() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-black text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-green-400 font-bold uppercase tracking-wider">
            Nyũmba Dragon 888
          </p>

          <h1 className="text-5xl md:text-6xl font-black mt-4">
            Trusted Professionals
          </h1>

          <p className="max-w-2xl mx-auto mt-6 text-white/70 text-lg">
            Discover verified Kenyan professionals ready to help with your
            home and property projects.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {professionals.map((pro) => (
            <div
              key={pro.slug}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border hover:shadow-xl transition"
            >
              <img
                src={pro.image}
                alt={pro.name}
                className="w-full h-64 object-cover"
              />

              <div className="p-6">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-black">
                    {pro.name}
                  </h2>

                  <ShieldCheck
                    size={18}
                    className="text-green-600"
                  />
                </div>

                <p className="text-green-700 font-semibold mt-1">
                  {pro.role}
                </p>

                <div className="mt-5 space-y-3 text-gray-500 text-sm">
                  <p className="flex items-center gap-2">
                    <MapPin size={17} />
                    {pro.location}
                  </p>

                  <p className="flex items-center gap-2">
                    <Star size={17} className="text-red-600" />
                    {pro.rating} Rating
                  </p>

                  <p className="flex items-center gap-2">
                    <Briefcase size={17} />
                    {pro.jobs} Jobs Completed
                  </p>
                </div>

                <Link
                  to={`/professionals/${pro.slug}`}
                  className="mt-6 w-full bg-black hover:bg-green-700 text-white py-3 rounded-xl font-bold flex items-center justify-center transition"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
