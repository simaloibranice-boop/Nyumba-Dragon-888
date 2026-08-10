import {
  ClipboardList,
  MapPin,
  CalendarDays,
  Wallet,
  ArrowRight,
  Plus,
  Clock3,
  CheckCircle2,
  XCircle,
  Search,
  ShieldCheck,
} from "lucide-react";

import { Link } from "react-router-dom";

import DashboardLayout from "../components/dashboard/DashboardLayout";


const requests = [
  {
    id: 1,
    title: "Electrical Installation",
    description: "Complete house wiring and electrical installation.",
    location: "Westlands, Nairobi",
    date: "08 Aug 2026",
    price: "KES 8,000",
    status: "In Progress",
    technician: "Verified Electrician",
  },
  {
    id: 2,
    title: "Plumbing Repair",
    description: "Kitchen sink and bathroom pipe repair.",
    location: "Kilimani, Nairobi",
    date: "07 Aug 2026",
    price: "KES 4,500",
    status: "Pending",
    technician: "Waiting for assignment",
  },
  {
    id: 3,
    title: "CCTV Installation",
    description: "Installation of CCTV cameras around the property.",
    location: "Kasarani, Nairobi",
    date: "04 Aug 2026",
    price: "KES 12,000",
    status: "Completed",
    technician: "Verified Security Technician",
  },
];


export default function ClientRequests() {

  return (

    <DashboardLayout role="client">

      <div className="min-h-screen bg-gray-100 text-black">


        {/* HEADER */}

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

          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:items-center
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
                  bg-white/10
                  px-4
                  py-2
                  rounded-full
                  mb-4
                "
              >

                <ClipboardList
                  size={16}
                  className="text-green-500"
                />

                <span
                  className="
                    text-green-400
                    text-xs
                    font-black
                  "
                >
                  MY SERVICE REQUESTS
                </span>

              </div>


              <h1
                className="
                  text-3xl
                  md:text-4xl
                  font-black
                "
              >
                My Requests
              </h1>


              <p
                className="
                  text-gray-300
                  mt-2
                  font-medium
                "
              >
                Track every service request from booking to completion.
              </p>

            </div>


            <Link
              to="/services"
              className="
                bg-red-600
                hover:bg-red-700
                text-white
                font-black
                px-6
                py-4
                rounded-2xl
                flex
                items-center
                justify-center
                gap-2
                transition
              "
            >

              <Plus size={20} />

              New Request

            </Link>

          </div>

        </section>



        {/* SUMMARY */}

        <section
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-5
            mb-8
          "
        >

          <SummaryCard
            icon={<ClipboardList />}
            title="All Requests"
            value="12"
          />

          <SummaryCard
            icon={<Clock3 />}
            title="Pending"
            value="2"
            green
          />

          <SummaryCard
            icon={<Clock3 />}
            title="In Progress"
            value="1"
          />

          <SummaryCard
            icon={<CheckCircle2 />}
            title="Completed"
            value="9"
            green
          />

        </section>



        {/* SEARCH + FILTER */}

        <section
          className="
            bg-white
            rounded-3xl
            border
            border-gray-200
            p-4
            md:p-5
            mb-8
          "
        >

          <div
            className="
              flex
              flex-col
              md:flex-row
              gap-3
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                flex-1
              "
            >

              <Search
                size={20}
                className="text-gray-500"
              />

              <input
                type="text"
                placeholder="Search requests..."
                className="
                  outline-none
                  w-full
                  text-black
                  font-semibold
                "
              />

            </div>


            <button
              className="
                border
                border-gray-300
                rounded-xl
                px-6
                py-3
                font-black
                bg-white
                hover:bg-gray-100
                transition
              "
            >
              All Requests
            </button>


            <button
              className="
                border
                border-green-700
                text-green-700
                rounded-xl
                px-6
                py-3
                font-black
                hover:bg-green-50
                transition
              "
            >
              Active
            </button>


            <button
              className="
                border
                border-gray-300
                rounded-xl
                px-6
                py-3
                font-black
                hover:bg-gray-100
                transition
              "
            >
              Completed
            </button>

          </div>

        </section>



        {/* REQUEST LIST */}

        <section
          className="
            bg-white
            rounded-3xl
            border
            border-gray-200
            p-6
            md:p-8
            mb-8
          "
        >

          <div className="mb-6">

            <h2
              className="
                text-2xl
                font-black
              "
            >
              Service Requests
            </h2>

            <p
              className="
                text-gray-600
                mt-1
                font-medium
              "
            >
              Your recent bookings and their current status.
            </p>

          </div>


          <div className="space-y-5">

            {requests.map((request) => (

              <RequestCard
                key={request.id}
                request={request}
              />

            ))}

          </div>

        </section>



        {/* TRUST STRIP */}

        <section
          className="
            bg-black
            rounded-3xl
            p-6
            md:p-8
            text-white
          "
        >

          <div
            className="
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-6
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
                  className="text-green-500"
                  size={26}
                />

                <span
                  className="
                    text-green-400
                    font-black
                  "
                >
                  NYŨMBA DRAGON 888
                </span>

              </div>


              <h2
                className="
                  text-2xl
                  font-black
                "
              >
                Need another professional?
              </h2>


              <p
                className="
                  text-gray-300
                  mt-2
                  font-medium
                "
              >
                Find verified electricians, plumbers, masons,
                cleaners, security technicians and more.
              </p>

            </div>


            <Link
              to="/services"
              className="
                bg-green-700
                hover:bg-green-800
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

              Find a Professional

              <ArrowRight size={19} />

            </Link>

          </div>

        </section>


      </div>

    </DashboardLayout>

  );
}



/* SUMMARY CARD */

function SummaryCard({
  icon,
  title,
  value,
  green = false,
}) {

  return (

    <div
      className="
        bg-white
        rounded-3xl
        border
        border-gray-200
        p-6
      "
    >

      <div
        className={`
          w-12
          h-12
          rounded-xl
          flex
          items-center
          justify-center
          mb-5
          ${
            green
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-black"
          }
        `}
      >

        {icon}

      </div>


      <p
        className="
          text-gray-600
          font-bold
        "
      >
        {title}
      </p>


      <h3
        className="
          text-3xl
          font-black
          mt-1
        "
      >
        {value}
      </h3>

    </div>

  );

}



/* REQUEST CARD */

function RequestCard({
  request,
}) {

  const statusStyles = {

    "In Progress":
      "bg-green-100 text-green-800",

    Pending:
      "bg-yellow-100 text-yellow-800",

    Completed:
      "bg-gray-200 text-gray-800",

  };


  const statusIcon = {

    "In Progress":
      <Clock3 size={16} />,

    Pending:
      <Clock3 size={16} />,

    Completed:
      <CheckCircle2 size={16} />,

  };


  return (

    <div
      className="
        border
        border-gray-200
        rounded-2xl
        p-5
        md:p-6
        hover:shadow-md
        transition
      "
    >

      <div
        className="
          flex
          flex-col
          xl:flex-row
          xl:items-center
          xl:justify-between
          gap-6
        "
      >


        {/* LEFT */}

        <div
          className="
            flex
            items-start
            gap-4
          "
        >

          <div
            className="
              w-12
              h-12
              rounded-xl
              bg-black
              text-white
              flex
              items-center
              justify-center
              shrink-0
            "
          >

            <ClipboardList size={21} />

          </div>


          <div>

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-3
              "
            >

              <h3
                className="
                  text-lg
                  font-black
                "
              >
                {request.title}
              </h3>


              <span
                className={`
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-black
                  flex
                  items-center
                  gap-1
                  ${statusStyles[request.status]}
                `}
              >

                {statusIcon[request.status]}

                {request.status}

              </span>

            </div>


            <p
              className="
                text-gray-600
                mt-2
                font-medium
              "
            >
              {request.description}
            </p>


            <div
              className="
                flex
                flex-wrap
                gap-4
                mt-3
                text-sm
                text-gray-600
                font-bold
              "
            >

              <span
                className="
                  flex
                  items-center
                  gap-1
                "
              >

                <MapPin size={15} />

                {request.location}

              </span>


              <span
                className="
                  flex
                  items-center
                  gap-1
                "
              >

                <CalendarDays size={15} />

                {request.date}

              </span>


              <span
                className="
                  flex
                  items-center
                  gap-1
                "
              >

                <Wallet size={15} />

                {request.price}

              </span>

            </div>

          </div>

        </div>



        {/* RIGHT */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            xl:flex-col
            xl:items-end
            gap-3
          "
        >

          <p
            className="
              text-gray-600
              text-sm
              font-bold
            "
          >
            {request.technician}
          </p>


          <Link
            to={`/client/requests/${request.id}`}
            className="
              bg-black
              hover:bg-green-700
              text-white
              font-black
              px-6
              py-3
              rounded-xl
              flex
              items-center
              justify-center
              gap-2
              transition
            "
          >

            View Details

            <ArrowRight size={17} />

          </Link>

        </div>


      </div>

    </div>

  );

}
