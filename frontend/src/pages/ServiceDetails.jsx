import { useParams, Link } from "react-router-dom";

const services = {
  electrical: {
    title: "Electrical Intelligence",
    description: "Certified electricians for residential and commercial systems.",
    labour: [
      "House wiring",
      "Electrical fault diagnosis",
      "Socket & switch installation",
      "Lighting installation",
      "Distribution board upgrades"
    ],
    price: "KSh 2,500 - KSh 120,000"
  },

  plumbing: {
    title: "Plumbing Network",
    description: "Professional plumbing solutions and maintenance.",
    labour: [
      "Pipe installation",
      "Leak repairs",
      "Bathroom plumbing",
      "Kitchen plumbing",
      "Water tank installation"
    ],
    price: "KSh 1,500 - KSh 80,000"
  },

  solar: {
    title: "Solar Infrastructure",
    description: "Renewable energy installation and support.",
    labour: [
      "Solar panel installation",
      "Battery setup",
      "Inverter installation",
      "Solar maintenance",
      "System inspection"
    ],
    price: "KSh 15,000 - KSh 850,000"
  },

  mechanical: {
    title: "Mechanical Experts",
    description: "Vehicle and equipment repair professionals.",
    labour: [
      "Engine diagnostics",
      "Brake repairs",
      "Oil service",
      "Suspension repairs",
      "General maintenance"
    ],
    price: "KSh 2,000 - KSh 250,000"
  },

  healthcare: {
    title: "Healthcare Network",
    description: "Trusted healthcare professionals.",
    labour: [
      "Home nursing",
      "Medical consultation",
      "Patient monitoring",
      "Elderly care",
      "Health assessments"
    ],
    price: "KSh 1,000 - KSh 50,000"
  },

  construction: {
    title: "Construction",
    description: "Building, renovation and maintenance services.",
    labour: [
      "House construction",
      "Renovations",
      "Roofing",
      "Painting",
      "Interior finishing"
    ],
    price: "KSh 10,000 - KSh 5,000,000"
  },

  cleaning: {
    title: "Cleaning Services",
    description: "Professional cleaning and facility support.",
    labour: [
      "Home cleaning",
      "Office cleaning",
      "Deep cleaning",
      "Carpet cleaning",
      "Post-construction cleaning"
    ],
    price: "KSh 1,000 - KSh 50,000"
  }
};

export default function ServiceDetails() {
  const { slug } = useParams();

  const service = services[slug];

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#071A33] to-[#111827] text-white flex items-center justify-center">
        <h1 className="text-4xl font-black">Service Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#071A33] to-[#111827] text-white px-8 py-24">

      <div className="max-w-5xl mx-auto">

        <Link
          to="/services"
          className="text-cyan-300 hover:text-cyan-200 font-bold"
        >
          ← Back to Marketplace
        </Link>

        <h1 className="text-5xl font-black text-cyan-300 mt-6">
          {service.title}
        </h1>

        <p className="text-gray-300 mt-5 text-xl">
          {service.description}
        </p>

        <div className="mt-12 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

          <h2 className="text-3xl font-black text-white">
            Labour Specifications
          </h2>

          <ul className="mt-6 space-y-3">
            {service.labour.map(item => (
              <li
                key={item}
                className="text-gray-300"
              >
                • {item}
              </li>
            ))}
          </ul>

          <div className="mt-10">

            <h3 className="text-2xl font-black text-cyan-300">
              Estimated Labour Charges
            </h3>

            <p className="text-3xl font-black text-yellow-300 mt-3">
              {service.price}
            </p>

          </div>

          <Link
            to="/client"
            className="inline-block mt-10 px-8 py-4 rounded-2xl bg-cyan-400 text-black font-black hover:bg-cyan-300 transition"
          >
            Request Service
          </Link>

        </div>

      </div>

    </div>
  );
}
