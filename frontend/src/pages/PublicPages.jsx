import { Link } from "react-router-dom";

const content = {
  "/about": {
    label: "ABOUT US",
    title: "Building a better way to manage homes.",
    text: "Nyũmba Dragon 888 is a Kenyan digital platform connecting clients with trusted professionals for home and property services.",
    points: [
      "Connect clients with skilled professionals.",
      "Promote trust and transparency.",
      "Make home services easier to access.",
      "Build a stronger digital services ecosystem in Kenya.",
    ],
  },

  "/how-it-works": {
    label: "HOW IT WORKS",
    title: "Getting help should be simple.",
    text: "Nyũmba Dragon 888 makes it easier to find, book and manage professional home services.",
    points: [
      "Choose the service you need.",
      "Find a verified professional.",
      "Submit your service request.",
      "Track the work and manage payment securely.",
    ],
  },

  "/careers": {
    label: "CAREERS",
    title: "Build the future with us.",
    text: "We are building technology that connects people, skills and opportunities across Kenya.",
    points: [
      "Software Engineering",
      "Operations",
      "Customer Experience",
      "Sales and Partnerships",
    ],
  },

  "/partners": {
    label: "PARTNERS",
    title: "Let's build together.",
    text: "We work with organizations, professionals and businesses that want to improve access to reliable home and property services.",
    points: [
      "Professional networks",
      "Property companies",
      "Technology partners",
      "Community organizations",
    ],
  },

  "/contact": {
    label: "CONTACT",
    title: "We're here to help.",
    text: "Have a question about Nyũmba Dragon 888? Get in touch with our team.",
    points: [
      "Customer support",
      "Professional registration",
      "Business partnerships",
      "Platform enquiries",
    ],
  },
};

export default function PublicPages({ page }) {
  const contentData = content[page];

  if (!contentData) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-black text-white pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-green-400 font-bold tracking-wider">
            {contentData.label}
          </p>

          <h1 className="text-5xl md:text-6xl font-black mt-4 leading-tight">
            {contentData.title}
          </h1>

          <p className="mt-6 text-xl text-white/70 max-w-3xl leading-relaxed">
            {contentData.text}
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl shadow-sm border p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-6">
            {contentData.points.map((point, index) => (
              <div
                key={index}
                className="rounded-2xl bg-gray-50 p-6 border"
              >
                <div className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center font-black">
                  {index + 1}
                </div>

                <p className="mt-4 text-lg font-bold text-black">
                  {point}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/register"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition"
            >
              Get Started
            </Link>

            <Link
              to="/"
              className="border border-black hover:bg-black hover:text-white px-6 py-3 rounded-xl font-bold transition"
            >
              Back Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
