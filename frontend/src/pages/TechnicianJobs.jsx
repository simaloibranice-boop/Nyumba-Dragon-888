import {
  Search,
  SlidersHorizontal,
  MapPin,
  Clock3,
  CalendarDays,
  BriefcaseBusiness,
  ArrowRight
} from "lucide-react";

import { useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import DashboardPage from "../components/dashboard/DashboardPage";


export default function TechnicianJobs() {

  const navigate = useNavigate();


  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All Statuses");

  const [location, setLocation] = useState("All Locations");



  const jobs = [

    {
      id: 1,
      title: "House Wiring Installation",
      category: "Electrical",
      location: "Nairobi",
      price: "KES 8,000",
      status: "AVAILABLE",
      urgent: true,
      duration: "1–2 days",
      date: "Today"
    },

    {
      id: 2,
      title: "Solar Panel Repair",
      category: "Solar",
      location: "Kiambu",
      price: "KES 5,500",
      status: "AVAILABLE",
      urgent: false,
      duration: "1 day",
      date: "Today"
    },

    {
      id: 3,
      title: "Kitchen Plumbing",
      category: "Plumbing",
      location: "Nakuru",
      price: "KES 3,500",
      status: "ACCEPTED",
      urgent: false,
      duration: "1–2 days",
      date: "Yesterday"
    },

    {
      id: 4,
      title: "CCTV Installation",
      category: "Security",
      location: "Nairobi",
      price: "KES 12,000",
      status: "AVAILABLE",
      urgent: false,
      duration: "2 days",
      date: "Yesterday"
    },

    {
      id: 5,
      title: "Office Electrical Maintenance",
      category: "Electrical",
      location: "Westlands",
      price: "KES 7,500",
      status: "COMPLETED",
      urgent: false,
      duration: "1 day",
      date: "Monday"
    }

  ];



  const filteredJobs = useMemo(() => {

    return jobs.filter((job) => {

      const matchesSearch =
        job.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||

        job.category
          .toLowerCase()
          .includes(search.toLowerCase());


      const matchesStatus =
        status === "All Statuses" ||
        job.status === status;


      const matchesLocation =
        location === "All Locations" ||
        job.location === location;


      return (
        matchesSearch &&
        matchesStatus &&
        matchesLocation
      );

    });

  }, [search, status, location]);



  return (

    <DashboardLayout role="technician">

      <DashboardPage

        eyebrow="Professional Workspace"

        title="My Jobs"

        subtitle="Find, manage and complete service requests."

      >


        {/* JOB SUMMARY */}

        <div
          className="
            grid
            grid-cols-2
            xl:grid-cols-4
            gap-4
            mb-8
          "
        >

          <div
            className="
              bg-white
              border
              border-gray-200
              rounded-3xl
              p-5
            "
          >

            <p
              className="
                text-gray-600
                font-bold
              "
            >
              Available
            </p>

            <h3
              className="
                text-3xl
                font-black
                text-green-700
                mt-2
              "
            >
              3
            </h3>

          </div>



          <div
            className="
              bg-white
              border
              border-gray-200
              rounded-3xl
              p-5
            "
          >

            <p
              className="
                text-gray-600
                font-bold
              "
            >
              Accepted
            </p>

            <h3
              className="
                text-3xl
                font-black
                text-red-600
                mt-2
              "
            >
              1
            </h3>

          </div>



          <div
            className="
              bg-white
              border
              border-gray-200
              rounded-3xl
              p-5
            "
          >

            <p
              className="
                text-gray-600
                font-bold
              "
            >
              Completed
            </p>

            <h3
              className="
                text-3xl
                font-black
                text-black
                mt-2
              "
            >
              1
            </h3>

          </div>



          <div
            className="
              bg-black
              text-white
              rounded-3xl
              p-5
            "
          >

            <p
              className="
                text-gray-300
                font-bold
              "
            >
              Total Jobs
            </p>

            <h3
              className="
                text-3xl
                font-black
                text-white
                mt-2
              "
            >
              5
            </h3>

          </div>

        </div>



        {/* SEARCH */}

        <section
          className="
            bg-white
            border
            border-gray-200
            rounded-3xl
            p-5
            md:p-6
            mb-8
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
              mb-5
            "
          >

            <SlidersHorizontal size={20}/>

            <h2
              className="
                text-lg
                font-black
                text-black
              "
            >
              Find a Job
            </h2>

          </div>



          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-3
              gap-3
            "
          >

            {/* SEARCH */}

            <div
              className="
                relative
              "
            >

              <Search
                size={19}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                "
              />

              <input

                value={search}

                onChange={(event) =>
                  setSearch(event.target.value)
                }

                placeholder="Search jobs..."

                className="
                  w-full
                  h-13
                  bg-gray-100
                  border
                  border-gray-200
                  rounded-xl
                  pl-11
                  pr-4
                  font-semibold
                  text-black
                  outline-none
                  focus:border-black
                "

              />

            </div>



            {/* STATUS */}

            <select

              value={status}

              onChange={(event) =>
                setStatus(event.target.value)
              }

              className="
                h-13
                bg-gray-100
                border
                border-gray-200
                rounded-xl
                px-4
                font-bold
                text-black
                outline-none
                focus:border-black
              "

            >

              <option>All Statuses</option>

              <option>AVAILABLE</option>

              <option>ACCEPTED</option>

              <option>COMPLETED</option>

            </select>



            {/* LOCATION */}

            <select

              value={location}

              onChange={(event) =>
                setLocation(event.target.value)
              }

              className="
                h-13
                bg-gray-100
                border
                border-gray-200
                rounded-xl
                px-4
                font-bold
                text-black
                outline-none
                focus:border-black
              "

            >

              <option>All Locations</option>

              <option>Nairobi</option>

              <option>Kiambu</option>

              <option>Nakuru</option>

              <option>Westlands</option>

            </select>

          </div>

        </section>



        {/* SERVICE REQUESTS */}

        <section>

          <div
            className="
              flex
              justify-between
              items-center
              mb-5
            "
          >

            <h2
              className="
                text-2xl
                font-black
                text-black
              "
            >
              Service Requests
            </h2>


            <span
              className="
                text-gray-600
                font-black
              "
            >

              {filteredJobs.length} results

            </span>

          </div>



          <div className="space-y-4">

            {filteredJobs.map((job) => (

              <article
                key={job.id}
                className="
                  bg-white
                  border
                  border-gray-200
                  rounded-3xl
                  p-5
                  md:p-6
                  hover:border-black
                  transition
                "
              >

                <div
                  className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    justify-between
                    gap-5
                  "
                >

                  <div className="min-w-0">

                    {/* BADGES */}

                    <div
                      className="
                        flex
                        flex-wrap
                        gap-2
                        mb-4
                      "
                    >

                      <span
                        className={`
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-black

                          ${
                            job.status === "AVAILABLE"

                              ? "bg-green-100 text-green-700"

                              : job.status === "ACCEPTED"

                              ? "bg-red-100 text-red-700"

                              : "bg-gray-200 text-gray-700"
                          }
                        `}
                      >

                        {job.status}

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



                    {/* TITLE */}

                    <h3
                      className="
                        text-xl
                        font-black
                        text-black
                      "
                    >

                      {job.title}

                    </h3>


                    <p
                      className="
                        text-gray-600
                        font-bold
                        mt-1
                      "
                    >

                      {job.category}

                    </p>



                    {/* META */}

                    <div
                      className="
                        flex
                        flex-wrap
                        gap-x-5
                        gap-y-2
                        mt-4
                        text-gray-600
                        font-semibold
                        text-sm
                      "
                    >

                      <span
                        className="
                          flex
                          items-center
                          gap-2
                        "
                      >

                        <MapPin size={16}/>

                        {job.location}

                      </span>


                      <span
                        className="
                          flex
                          items-center
                          gap-2
                        "
                      >

                        <Clock3 size={16}/>

                        {job.duration}

                      </span>


                      <span
                        className="
                          flex
                          items-center
                          gap-2
                        "
                      >

                        <CalendarDays size={16}/>

                        {job.date}

                      </span>

                    </div>

                  </div>



                  {/* RIGHT */}

                  <div
                    className="
                      flex
                      flex-col
                      md:items-end
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

                      {job.price}

                    </p>


                    <button
                      onClick={() =>
                        navigate(
                          `/technician/jobs/${job.id}`
                        )
                      }
                      className="
                        bg-black
                        text-white
                        px-6
                        py-3
                        rounded-xl
                        font-black
                        flex
                        items-center
                        justify-center
                        gap-2
                        hover:bg-green-700
                        transition
                      "
                    >

                      View Details

                      <ArrowRight size={17}/>

                    </button>

                  </div>

                </div>

              </article>

            ))}


            {filteredJobs.length === 0 && (

              <div
                className="
                  bg-white
                  border
                  border-gray-200
                  rounded-3xl
                  p-12
                  text-center
                "
              >

                <BriefcaseBusiness
                  size={40}
                  className="
                    mx-auto
                    text-gray-400
                  "
                />

                <h3
                  className="
                    text-xl
                    font-black
                    text-black
                    mt-4
                  "
                >

                  No jobs found

                </h3>

                <p
                  className="
                    text-gray-600
                    font-semibold
                    mt-2
                  "
                >

                  Try changing your search or filters.

                </p>

              </div>

            )}

          </div>

        </section>


      </DashboardPage>

    </DashboardLayout>

  );

}
