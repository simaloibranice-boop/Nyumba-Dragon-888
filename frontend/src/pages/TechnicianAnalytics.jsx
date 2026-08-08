import {
  BarChart3,
  TrendingUp,
  Star,
  Briefcase,
  CheckCircle,
  Clock,
  Wallet,
  ArrowUpRight,
  Target,
  Activity,
  ChevronRight
} from "lucide-react";

import { Link } from "react-router-dom";
import DashboardLayout from "../components/dashboard/DashboardLayout";


export default function TechnicianAnalytics() {

  const performance = [
    {
      title: "Jobs Completed",
      value: "146",
      subtitle: "+12 this month",
      icon: <CheckCircle size={22} />,
      iconBg: "bg-green-100",
      iconColor: "text-green-700"
    },

    {
      title: "Active Jobs",
      value: "8",
      subtitle: "3 due today",
      icon: <Briefcase size={22} />,
      iconBg: "bg-red-100",
      iconColor: "text-red-700"
    },

    {
      title: "Customer Rating",
      value: "4.9",
      subtitle: "Excellent rating",
      icon: <Star size={22} />,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-700"
    },

    {
      title: "Reliability",
      value: "96%",
      subtitle: "+4% this month",
      icon: <Target size={22} />,
      iconBg: "bg-green-100",
      iconColor: "text-green-700"
    }
  ];


  const jobStats = [
    {
      label: "Completed",
      value: 146,
      percentage: 82,
      color: "bg-green-600"
    },

    {
      label: "Accepted",
      value: 18,
      percentage: 10,
      color: "bg-black"
    },

    {
      label: "Pending",
      value: 9,
      percentage: 5,
      color: "bg-red-600"
    },

    {
      label: "Cancelled",
      value: 5,
      percentage: 3,
      color: "bg-gray-500"
    }
  ];


  const monthlyPerformance = [
    {
      month: "Jan",
      jobs: 12,
      earnings: "KES 42K"
    },

    {
      month: "Feb",
      jobs: 18,
      earnings: "KES 56K"
    },

    {
      month: "Mar",
      jobs: 21,
      earnings: "KES 63K"
    },

    {
      month: "Apr",
      jobs: 16,
      earnings: "KES 51K"
    },

    {
      month: "May",
      jobs: 24,
      earnings: "KES 72K"
    },

    {
      month: "Jun",
      jobs: 28,
      earnings: "KES 85K"
    }
  ];


  const maxJobs = Math.max(
    ...monthlyPerformance.map(item => item.jobs)
  );


  return (

    <DashboardLayout role="technician">

      <div className="min-h-screen bg-gray-100 p-4 md:p-8">

        {/* PAGE HEADER */}

        <section
          className="
            bg-black
            rounded-3xl
            p-6
            md:p-8
            mb-8
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
              gap-5
            "
          >

            <div>

              <div className="flex items-center gap-3 mb-3">

                <div
                  className="
                    w-11
                    h-11
                    rounded-xl
                    bg-green-600
                    flex
                    items-center
                    justify-center
                  "
                >
                  <BarChart3 size={24} />
                </div>

                <span
                  className="
                    text-green-400
                    font-bold
                    text-sm
                    uppercase
                    tracking-wide
                  "
                >
                  Performance Intelligence
                </span>

              </div>


              <h1
                className="
                  text-2xl
                  md:text-4xl
                  font-black
                "
              >
                Technician Analytics
              </h1>


              <p
                className="
                  text-gray-300
                  font-medium
                  mt-2
                  max-w-2xl
                "
              >
                Track your jobs, earnings, customer satisfaction
                and overall professional performance.
              </p>

            </div>


            <Link
              to="/technician/dashboard"
              className="
                bg-white
                text-black
                font-black
                px-5
                py-3
                rounded-xl
                hover:bg-green-500
                transition
                inline-flex
                items-center
                gap-2
              "
            >
              Dashboard
              <ChevronRight size={18} />
            </Link>

          </div>

        </section>


        {/* PERFORMANCE CARDS */}

        <section
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4
            gap-5
            mb-8
          "
        >

          {performance.map((item) => (

            <div
              key={item.title}
              className="
                bg-white
                rounded-2xl
                border
                border-gray-200
                p-5
                shadow-sm
                hover:shadow-md
                transition
              "
            >

              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-4
                "
              >

                <div>

                  <p
                    className="
                      text-black
                      font-black
                      text-sm
                    "
                  >
                    {item.title}
                  </p>


                  <h2
                    className="
                      text-black
                      font-black
                      text-3xl
                      mt-2
                    "
                  >
                    {item.value}
                  </h2>


                  <p
                    className="
                      text-green-700
                      font-bold
                      text-sm
                      mt-2
                    "
                  >
                    {item.subtitle}
                  </p>

                </div>


                <div
                  className={`
                    ${item.iconBg}
                    ${item.iconColor}
                    w-11
                    h-11
                    rounded-xl
                    flex
                    items-center
                    justify-center
                  `}
                >
                  {item.icon}
                </div>

              </div>

            </div>

          ))}

        </section>


        {/* MAIN ANALYTICS */}

        <section
          className="
            grid
            lg:grid-cols-3
            gap-6
            mb-8
          "
        >

          {/* JOB PERFORMANCE */}

          <div
            className="
              lg:col-span-2
              bg-white
              rounded-3xl
              border
              border-gray-200
              p-6
              shadow-sm
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
                mb-7
              "
            >

              <div>

                <h2
                  className="
                    text-black
                    font-black
                    text-xl
                  "
                >
                  Job Performance
                </h2>

                <p
                  className="
                    text-black
                    font-bold
                    text-sm
                    mt-1
                  "
                >
                  Breakdown of your current jobs
                </p>

              </div>


              <Activity
                className="text-green-700"
                size={26}
              />

            </div>


            <div className="space-y-6">

              {jobStats.map((item) => (

                <div key={item.label}>

                  <div
                    className="
                      flex
                      justify-between
                      items-center
                      mb-2
                    "
                  >

                    <span
                      className="
                        text-black
                        font-black
                      "
                    >
                      {item.label}
                    </span>


                    <span
                      className="
                        text-black
                        font-black
                      "
                    >
                      {item.value}
                    </span>

                  </div>


                  <div
                    className="
                      w-full
                      h-3
                      bg-gray-200
                      rounded-full
                      overflow-hidden
                    "
                  >

                    <div
                      className={`
                        ${item.color}
                        h-full
                        rounded-full
                      `}
                      style={{
                        width: `${item.percentage}%`
                      }}
                    />

                  </div>

                </div>

              ))}

            </div>

          </div>


          {/* EARNINGS SUMMARY */}

          <div
            className="
              bg-black
              rounded-3xl
              p-6
              text-white
            "
          >

            <div
              className="
                w-12
                h-12
                bg-green-600
                rounded-xl
                flex
                items-center
                justify-center
                mb-5
              "
            >
              <Wallet size={25} />
            </div>


            <p
              className="
                text-gray-300
                font-bold
              "
            >
              Total Earnings
            </p>


            <h2
              className="
                text-4xl
                font-black
                mt-2
              "
            >
              KES 369K
            </h2>


            <div
              className="
                flex
                items-center
                gap-2
                text-green-400
                font-black
                mt-4
              "
            >

              <ArrowUpRight size={20} />

              18.5% this year

            </div>


            <div
              className="
                border-t
                border-white/20
                mt-6
                pt-6
                space-y-4
              "
            >

              <div
                className="
                  flex
                  justify-between
                "
              >

                <span className="text-gray-300 font-bold">
                  This month
                </span>

                <span className="font-black">
                  KES 85,000
                </span>

              </div>


              <div
                className="
                  flex
                  justify-between
                "
              >

                <span className="text-gray-300 font-bold">
                  Completed jobs
                </span>

                <span className="font-black">
                  28
                </span>

              </div>


              <div
                className="
                  flex
                  justify-between
                "
              >

                <span className="text-gray-300 font-bold">
                  Average job
                </span>

                <span className="font-black">
                  KES 3,036
                </span>

              </div>

            </div>

          </div>

        </section>


        {/* MONTHLY PERFORMANCE */}

        <section
          className="
            bg-white
            rounded-3xl
            border
            border-gray-200
            p-6
            mb-8
            shadow-sm
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
              mb-8
            "
          >

            <div>

              <h2
                className="
                  text-black
                  font-black
                  text-xl
                "
              >
                Monthly Performance
              </h2>

              <p
                className="
                  text-black
                  font-bold
                  text-sm
                  mt-1
                "
              >
                Jobs completed over the last six months
              </p>

            </div>


            <TrendingUp
              className="text-green-700"
              size={26}
            />

          </div>


          <div
            className="
              flex
              items-end
              justify-between
              gap-3
              h-64
              border-b
              border-gray-300
              px-2
            "
          >

            {monthlyPerformance.map((item) => {

              const height =
                (item.jobs / maxJobs) * 100;

              return (

                <div
                  key={item.month}
                  className="
                    flex
                    flex-col
                    items-center
                    justify-end
                    h-full
                    flex-1
                    gap-2
                  "
                >

                  <span
                    className="
                      text-black
                      font-black
                      text-xs
                    "
                  >
                    {item.jobs}
                  </span>


                  <div
                    className="
                      w-full
                      max-w-12
                      bg-gray-100
                      rounded-t-xl
                      flex
                      items-end
                      h-44
                    "
                  >

                    <div
                      className="
                        w-full
                        bg-green-600
                        rounded-t-xl
                        hover:bg-red-600
                        transition
                      "
                      style={{
                        height: `${height}%`
                      }}
                    />

                  </div>


                  <span
                    className="
                      text-black
                      font-black
                      text-xs
                    "
                  >
                    {item.month}
                  </span>

                </div>

              );

            })}

          </div>

        </section>


        {/* MONTHLY TABLE */}

        <section
          className="
            bg-white
            rounded-3xl
            border
            border-gray-200
            p-6
            shadow-sm
          "
        >

          <div className="flex items-center gap-3 mb-6">

            <Clock
              className="text-red-600"
              size={25}
            />

            <div>

              <h2
                className="
                  text-black
                  font-black
                  text-xl
                "
              >
                Performance History
              </h2>

              <p
                className="
                  text-black
                  font-bold
                  text-sm
                "
              >
                Monthly job and earnings summary
              </p>

            </div>

          </div>


          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr
                  className="
                    border-b-2
                    border-gray-200
                  "
                >

                  <th
                    className="
                      text-left
                      text-black
                      font-black
                      p-4
                    "
                  >
                    Month
                  </th>

                  <th
                    className="
                      text-left
                      text-black
                      font-black
                      p-4
                    "
                  >
                    Jobs
                  </th>

                  <th
                    className="
                      text-left
                      text-black
                      font-black
                      p-4
                    "
                  >
                    Earnings
                  </th>

                  <th
                    className="
                      text-left
                      text-black
                      font-black
                      p-4
                    "
                  >
                    Growth
                  </th>

                </tr>

              </thead>


              <tbody>

                {monthlyPerformance.map(
                  (item, index) => (

                    <tr
                      key={item.month}
                      className="
                        border-b
                        border-gray-100
                        hover:bg-gray-50
                      "
                    >

                      <td
                        className="
                          p-4
                          text-black
                          font-black
                        "
                      >
                        {item.month}
                      </td>


                      <td
                        className="
                          p-4
                          text-black
                          font-bold
                        "
                      >
                        {item.jobs}
                      </td>


                      <td
                        className="
                          p-4
                          text-green-700
                          font-black
                        "
                      >
                        {item.earnings}
                      </td>


                      <td className="p-4">

                        <span
                          className={`
                            inline-flex
                            items-center
                            gap-1
                            px-3
                            py-1
                            rounded-full
                            text-sm
                            font-black
                            ${
                              index === 0
                                ? "bg-gray-100 text-black"
                                : "bg-green-100 text-green-700"
                            }
                          `}
                        >

                          {index === 0
                            ? "—"
                            : "+12%"
                          }

                        </span>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </section>


      </div>

    </DashboardLayout>

  );

}
