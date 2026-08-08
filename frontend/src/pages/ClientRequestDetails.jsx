import {
  ArrowLeft,
  MapPin,
  CalendarDays,
  Wallet,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Phone,
} from "lucide-react";

import { Link, useParams } from "react-router-dom";

import DashboardLayout from "../components/dashboard/DashboardLayout";


const requestData = {
  1: {
    title: "Electrical Installation",
    description:
      "Complete house wiring and electrical installation.",
    location: "Westlands, Nairobi",
    date: "08 Aug 2026",
    price: "KES 8,000",
    status: "In Progress",
    technician: "Verified Electrician",
  },

  2: {
    title: "Plumbing Repair",
    description:
      "Kitchen sink and bathroom pipe repair.",
    location: "Kilimani, Nairobi",
    date: "07 Aug 2026",
    price: "KES 4,500",
    status: "Pending",
    technician: "Waiting for assignment",
  },

  3: {
    title: "CCTV Installation",
    description:
      "Installation of CCTV cameras around the property.",
    location: "Kasarani, Nairobi",
    date: "04 Aug 2026",
    price: "KES 12,000",
    status: "Completed",
    technician: "Verified Security Technician",
  },
};


export default function ClientRequestDetails() {

  const { id } = useParams();

  const request = requestData[id] || requestData[1];


  return (

    <DashboardLayout role="client">

      <div className="min-h-screen bg-gray-100 text-black">


        {/* TOP HEADER */}

        <section
          className="
            bg-black
            rounded-3xl
            p-6
            md:p-8
            text-white
            mb-8
          "
        >

          <Link
            to="/client/requests"
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

            Back to Requests

          </Link>


          <h1
            className="
              text-3xl
              md:text-4xl
              font-black
            "
          >
            {request.title}
          </h1>


          <p
            className="
              text-gray-300
              mt-2
              font-medium
            "
          >
            Request #{id}
          </p>

        </section>



        {/* MAIN GRID */}

        <div
          className="
            grid
            lg:grid-cols-3
            gap-8
          "
        >


          {/* REQUEST INFORMATION */}

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

            <div
              className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-4
                mb-8
              "
            >

              <h2
                className="
                  text-2xl
                  font-black
                "
              >
                Request Details
              </h2>


              <StatusBadge status={request.status} />

            </div>


            <p
              className="
                text-gray-700
                font-medium
                text-lg
                leading-relaxed
              "
            >
              {request.description}
            </p>


            <div
              className="
                grid
                sm:grid-cols-2
                gap-4
                mt-8
              "
            >

              <InfoCard
                icon={<MapPin />}
                label="Service Location"
                value={request.location}
              />

              <InfoCard
                icon={<CalendarDays />}
                label="Request Date"
                value={request.date}
              />

              <InfoCard
                icon={<Wallet />}
                label="Estimated Price"
                value={request.price}
              />

              <InfoCard
                icon={<ShieldCheck />}
                label="Professional"
                value={request.technician}
              />

            </div>



            {/* PROGRESS */}

            <div className="mt-10">

              <h3
                className="
                  text-xl
                  font-black
                  mb-6
                "
              >
                Service Progress
              </h3>


              <div className="space-y-5">

                <ProgressItem
                  title="Request Submitted"
                  description="Your service request was received."
                  completed
                />

                <ProgressItem
                  title="Professional Assignment"
                  description="A verified professional is assigned to your request."
                  completed={request.status !== "Pending"}
                />

                <ProgressItem
                  title="Work In Progress"
                  description="The professional is working on your project."
                  completed={request.status === "In Progress" || request.status === "Completed"}
                />

                <ProgressItem
                  title="Service Completed"
                  description="Your service has been completed."
                  completed={request.status === "Completed"}
                />

              </div>

            </div>

          </section>



          {/* ACTION PANEL */}

          <aside
            className="
              bg-white
              rounded-3xl
              border
              border-gray-200
              p-6
              h-fit
            "
          >

            <h2
              className="
                text-xl
                font-black
                mb-6
              "
            >
              Request Actions
            </h2>


            <div className="space-y-3">


              {request.status === "In Progress" && (

                <button
                  className="
                    w-full
                    bg-green-700
                    hover:bg-green-800
                    text-white
                    font-black
                    py-4
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    gap-2
                    transition
                  "
                >

                  <Phone size={18} />

                  Contact Professional

                </button>

              )}


              {request.status === "Pending" && (

                <button
                  className="
                    w-full
                    bg-red-600
                    hover:bg-red-700
                    text-white
                    font-black
                    py-4
                    rounded-xl
                    transition
                  "
                >

                  Cancel Request

                </button>

              )}


              {request.status === "Completed" && (

                <button
                  className="
                    w-full
                    bg-black
                    hover:bg-green-700
                    text-white
                    font-black
                    py-4
                    rounded-xl
                    transition
                  "
                >

                  Leave a Review

                </button>

              )}


              <Link
                to="/services"
                className="
                  w-full
                  border
                  border-black
                  hover:bg-black
                  hover:text-white
                  text-black
                  font-black
                  py-4
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  transition
                "
              >

                Book Another Service

              </Link>

            </div>


            {/* TRUST */}

            <div
              className="
                bg-gray-100
                rounded-2xl
                p-5
                mt-6
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <ShieldCheck
                  className="text-green-700"
                  size={23}
                />

                <div>

                  <p
                    className="
                      font-black
                    "
                  >
                    Nyũmba Verified
                  </p>

                  <p
                    className="
                      text-sm
                      text-gray-600
                      font-medium
                    "
                  >
                    Your service is protected by our platform.
                  </p>

                </div>

              </div>

            </div>

          </aside>

        </div>

      </div>

    </DashboardLayout>

  );
}



/* STATUS */

function StatusBadge({ status }) {

  const styles = {

    Pending:
      "bg-yellow-100 text-yellow-800",

    "In Progress":
      "bg-green-100 text-green-800",

    Completed:
      "bg-gray-200 text-black",

  };


  return (

    <span
      className={`
        inline-flex
        items-center
        gap-2
        px-4
        py-2
        rounded-full
        font-black
        text-sm
        ${styles[status]}
      `}
    >

      {status === "Completed" ? (
        <CheckCircle2 size={17} />
      ) : (
        <Clock3 size={17} />
      )}

      {status}

    </span>

  );

}



/* INFO CARD */

function InfoCard({
  icon,
  label,
  value,
}) {

  return (

    <div
      className="
        bg-gray-50
        border
        border-gray-200
        rounded-2xl
        p-5
      "
    >

      <div
        className="
          w-10
          h-10
          rounded-xl
          bg-black
          text-white
          flex
          items-center
          justify-center
          mb-4
        "
      >

        {icon}

      </div>


      <p
        className="
          text-sm
          text-gray-600
          font-bold
        "
      >
        {label}
      </p>


      <p
        className="
          font-black
          mt-1
        "
      >
        {value}
      </p>

    </div>

  );

}



/* PROGRESS */

function ProgressItem({
  title,
  description,
  completed,
}) {

  return (

    <div
      className="
        flex
        items-start
        gap-4
      "
    >

      <div
        className={`
          w-9
          h-9
          rounded-full
          flex
          items-center
          justify-center
          shrink-0
          ${
            completed
              ? "bg-green-700 text-white"
              : "bg-gray-200 text-gray-500"
          }
        `}
      >

        <CheckCircle2 size={18} />

      </div>


      <div>

        <h4
          className="
            font-black
          "
        >
          {title}
        </h4>


        <p
          className="
            text-sm
            text-gray-600
            font-medium
            mt-1
          "
        >
          {description}
        </p>

      </div>

    </div>

  );

}
