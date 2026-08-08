import {
  BriefcaseBusiness,
  CheckCircle2,
  Star,
  WalletCards,
  MapPin,
  ArrowRight,
  UserRound,
  TrendingUp
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import DashboardPage from "../components/dashboard/DashboardPage";
import AvailabilityToggle from "../components/dashboard/AvailabilityToggle";


export default function TechnicianDashboard() {

  const navigate = useNavigate();


  const jobs = [

    {
      title: "House Wiring Installation",
      category: "Electrical",
      location: "Nairobi",
      payment: "KES 8,000",
      urgent: true
    },

    {
      title: "Solar Panel Repair",
      category: "Solar",
      location: "Kiambu",
      payment: "KES 5,500",
      urgent: false
    },

    {
      title: "Kitchen Plumbing",
      category: "Plumbing",
      location: "Nakuru",
      payment: "KES 3,500",
      urgent: false
    }

  ];


  return (

    <DashboardLayout role="technician">

      <DashboardPage

        eyebrow="Professional Dashboard"

        title="Welcome Back, Fundi 👋🏾"

        subtitle="Manage your jobs, customers and earnings."

      >


        {/* AVAILABILITY */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            justify-between
            items-start
            sm:items-center
            gap-4
            mb-8
          "
        >

          <div>

            <h2
              className="
                text-2xl
                font-black
                text-black
              "
            >

              Dashboard Overview

            </h2>

            <p
              className="
                text-gray-600
                font-semibold
                mt-1
              "
            >

              Here's what's happening with your work.

            </p>

          </div>


          <AvailabilityToggle />

        </div>



        {/* STATISTICS */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-5
            mb-10
          "
        >

          {/* AVAILABLE */}

          <div
            className="
              bg-white
              border
              border-gray-200
              rounded-3xl
              p-6
              shadow-sm
            "
          >

            <div
              className="
                flex
                justify-between
                items-start
              "
            >

              <div>

                <p
                  className="
                    text-gray-600
                    font-bold
                  "
                >
                  Available Jobs
                </p>


                <h3
                  className="
                    text-3xl
                    font-black
                    text-black
                    mt-2
                  "
                >
                  12
                </h3>

              </div>


              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-green-100
                  text-green-700
                  flex
                  items-center
                  justify-center
                "
              >

                <BriefcaseBusiness size={22}/>

              </div>

            </div>

          </div>



          {/* COMPLETED */}

          <div
            className="
              bg-white
              border
              border-gray-200
              rounded-3xl
              p-6
              shadow-sm
            "
          >

            <div
              className="
                flex
                justify-between
                items-start
              "
            >

              <div>

                <p
                  className="
                    text-gray-600
                    font-bold
                  "
                >
                  Completed Jobs
                </p>


                <h3
                  className="
                    text-3xl
                    font-black
                    text-black
                    mt-2
                  "
                >
                  146
                </h3>

              </div>


              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-green-100
                  text-green-700
                  flex
                  items-center
                  justify-center
                "
              >

                <CheckCircle2 size={22}/>

              </div>

            </div>

          </div>



          {/* RATING */}

          <div
            className="
              bg-white
              border
              border-gray-200
              rounded-3xl
              p-6
              shadow-sm
            "
          >

            <div
              className="
                flex
                justify-between
                items-start
              "
            >

              <div>

                <p
                  className="
                    text-gray-600
                    font-bold
                  "
                >
                  Customer Rating
                </p>


                <h3
                  className="
                    text-3xl
                    font-black
                    text-black
                    mt-2
                  "
                >
                  4.9
                </h3>

              </div>


              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-green-100
                  text-green-700
                  flex
                  items-center
                  justify-center
                "
              >

                <Star size={22}/>

              </div>

            </div>

          </div>



          {/* EARNINGS */}

          <div
            className="
              bg-black
              text-white
              rounded-3xl
              p-6
              shadow-sm
            "
          >

            <div
              className="
                flex
                justify-between
                items-start
              "
            >

              <div>

                <p
                  className="
                    text-gray-300
                    font-bold
                  "
                >
                  Monthly Earnings
                </p>


                <h3
                  className="
                    text-3xl
                    font-black
                    text-white
                    mt-2
                  "
                >
                  KES 85K
                </h3>

              </div>


              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-white/10
                  text-green-400
                  flex
                  items-center
                  justify-center
                "
              >

                <WalletCards size={22}/>

              </div>

            </div>

          </div>

        </div>



        {/* QUICK ACTIONS */}

        <section className="mb-10">

          <div
            className="
              flex
              justify-between
              items-center
              mb-5
            "
          >

            <div>

              <h2
                className="
                  text-2xl
                  font-black
                  text-black
                "
              >

                Quick Actions

              </h2>

              <p
                className="
                  text-gray-600
                  font-semibold
                  mt-1
                "
              >

                Access your most important tools.

              </p>

            </div>

          </div>



          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-4
            "
          >

            <button
              onClick={() => navigate("/technician/jobs")}
              className="
                bg-red-600
                text-white
                rounded-2xl
                p-5
                text-left
                font-black
                hover:bg-red-700
                transition
              "
            >

              <BriefcaseBusiness size={24}/>

              <span
                className="
                  block
                  mt-4
                "
              >
                View Jobs
              </span>

            </button>



            <button
              onClick={() => navigate("/technician/earnings")}
              className="
                bg-white
                border
                border-gray-200
                rounded-2xl
                p-5
                text-left
                font-black
                text-black
                hover:border-black
                transition
              "
            >

              <WalletCards size={24}/>

              <span
                className="
                  block
                  mt-4
                "
              >
                Earnings
              </span>

            </button>



            <button
              onClick={() => navigate("/technician/profile")}
              className="
                bg-white
                border
                border-gray-200
                rounded-2xl
                p-5
                text-left
                font-black
                text-black
                hover:border-black
                transition
              "
            >

              <UserRound size={24}/>

              <span
                className="
                  block
                  mt-4
                "
              >
                My Profile
              </span>

            </button>



            <button
              onClick={() => navigate("/technician/analytics")}
              className="
                bg-white
                border
                border-gray-200
                rounded-2xl
                p-5
                text-left
                font-black
                text-black
                hover:border-black
                transition
              "
            >

              <TrendingUp size={24}/>

              <span
                className="
                  block
                  mt-4
                "
              >
                Performance
              </span>

            </button>

          </div>

        </section>



        {/* AVAILABLE JOBS */}

        <section
          className="
            bg-white
            border
            border-gray-200
            rounded-3xl
            p-6
            md:p-7
          "
        >

          <div
            className="
              flex
              flex-col
              sm:flex-row
              justify-between
              gap-3
              mb-6
            "
          >

            <div>

              <h2
                className="
                  text-2xl
                  font-black
                  text-black
                "
              >

                Available Jobs

              </h2>

              <p
                className="
                  text-gray-600
                  font-semibold
                  mt-1
                "
              >

                Jobs that match your professional services.

              </p>

            </div>


            <button
              onClick={() => navigate("/technician/jobs")}
              className="
                text-red-600
                font-black
                flex
                items-center
                gap-2
                hover:text-red-700
              "
            >

              View all

              <ArrowRight size={18}/>

            </button>

          </div>



          <div className="space-y-4">

            {jobs.map((job, index) => (

              <div
                key={index}
                className="
                  border
                  border-gray-200
                  rounded-2xl
                  p-5
                  flex
                  flex-col
                  md:flex-row
                  justify-between
                  gap-5
                "
              >

                <div>

                  <div
                    className="
                      flex
                      flex-wrap
                      gap-2
                      mb-3
                    "
                  >

                    <span
                      className="
                        bg-green-100
                        text-green-700
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-black
                      "
                    >
                      AVAILABLE
                    </span>


                    {job.urgent && (

                      <span
                        className="
                          bg-red-100
                          text-red-700
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-black
                        "
                      >
                        URGENT
                      </span>

                    )}

                  </div>


                  <h3
                    className="
                      text-lg
                      font-black
                      text-black
                    "
                  >

                    {job.title}

                  </h3>


                  <p
                    className="
                      text-gray-600
                      font-semibold
                      mt-1
                    "
                  >

                    {job.category}

                  </p>


                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-gray-600
                      font-semibold
                      mt-3
                    "
                  >

                    <MapPin size={17}/>

                    {job.location}

                  </div>

                </div>



                <div
                  className="
                    flex
                    flex-col
                    md:items-end
                    justify-between
                    gap-4
                  "
                >

                  <p
                    className="
                      text-green-700
                      text-xl
                      font-black
                    "
                  >

                    {job.payment}

                  </p>


                  <button
                    onClick={() => navigate("/technician/jobs")}
                    className="
                      bg-black
                      text-white
                      px-6
                      py-3
                      rounded-xl
                      font-black
                      hover:bg-green-700
                      transition
                    "
                  >

                    View Details

                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>


      </DashboardPage>

    </DashboardLayout>

  );

}
