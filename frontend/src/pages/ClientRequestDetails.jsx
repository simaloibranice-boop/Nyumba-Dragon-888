import { useEffect, useState } from "react";

import {
  ArrowLeft,
  MapPin,
  CalendarDays,
  Wallet,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Phone,
  RefreshCw,
  AlertCircle,
  CreditCard,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import DashboardLayout from "../components/dashboard/DashboardLayout";

import {
  getClientRequest,
} from "../services/clientService";


export default function ClientRequestDetails() {

  const { id } = useParams();

  const [request, setRequest] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  const loadRequest = async () => {

    try {

      setLoading(true);

      setError("");

      const data = await getClientRequest(id);

      setRequest(
        data.request || data
      );

    } catch (err) {

      console.error(
        "Failed to load request:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Failed to load service request."
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    loadRequest();

  }, [id]);


  const formatAmount = (value) => {

    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {

      return "Price pending";

    }

    return `KES ${Number(value).toLocaleString()}`;

  };


  const formatDate = (value) => {

    if (!value) {

      return "Date unavailable";

    }

    try {

      return new Date(value).toLocaleDateString(
        "en-KE",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      );

    } catch {

      return value;

    }

  };


  const normalizedStatus =
    String(request?.status || "")
      .toUpperCase();


  const isPending =
    normalizedStatus === "PENDING";


  const isAccepted =
    normalizedStatus === "ACCEPTED";


  const isInProgress =
    normalizedStatus === "IN PROGRESS";


  const isCompleted =
    normalizedStatus === "COMPLETED";


  if (loading) {

    return (

      <DashboardLayout role="client">

        <div className="min-h-screen bg-gray-100 flex items-center justify-center">

          <div className="text-center">

            <RefreshCw
              size={34}
              className="animate-spin mx-auto mb-4"
            />

            <p className="font-bold text-gray-700">
              Loading request...
            </p>

          </div>

        </div>

      </DashboardLayout>

    );

  }


  if (error || !request) {

    return (

      <DashboardLayout role="client">

        <div className="min-h-screen bg-gray-100 p-6">

          <div className="max-w-3xl mx-auto">

            <Link
              to="/client/requests"
              className="
                inline-flex
                items-center
                gap-2
                font-bold
                mb-6
                hover:text-green-700
              "
            >

              <ArrowLeft size={18} />

              Back to Requests

            </Link>


            <div
              className="
                bg-red-50
                border
                border-red-200
                rounded-2xl
                p-6
                text-red-700
                flex
                items-start
                gap-3
              "
            >

              <AlertCircle size={22} />

              <div>

                <h2 className="font-black text-lg">
                  Unable to load request
                </h2>

                <p className="mt-1">
                  {error || "Request not found."}
                </p>

              </div>

            </div>

          </div>

        </div>

      </DashboardLayout>

    );

  }


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

              <p className="text-green-400 text-sm font-black uppercase">
                Service Request #{request.id}
              </p>

              <h1
                className="
                  text-3xl
                  md:text-4xl
                  font-black
                  mt-2
                "
              >
                {request.title || "Service Request"}
              </h1>

              <p className="text-gray-300 mt-2 font-medium">
                Submitted {formatDate(request.created_at)}
              </p>

            </div>


            <StatusBadge
              status={request.status}
            />

          </div>

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

            <h2
              className="
                text-2xl
                font-black
                mb-5
              "
            >
              Request Details
            </h2>


            <p
              className="
                text-gray-700
                font-medium
                text-lg
                leading-relaxed
              "
            >
              {request.description ||
                "No description provided."}
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
                value={
                  request.location ||
                  "Not provided"
                }
              />

              <InfoCard
                icon={<CalendarDays />}
                label="Request Date"
                value={formatDate(
                  request.created_at
                )}
              />

              <InfoCard
                icon={<Wallet />}
                label="Service Price"
                value={formatAmount(
                  request.price
                )}
              />

              <InfoCard
                icon={<ShieldCheck />}
                label="Professional"
                value={
                  request.technician_id
                    ? `Technician #${request.technician_id}`
                    : "Waiting for assignment"
                }
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
                  completed={
                    !isPending
                  }
                />


                <ProgressItem
                  title="Work In Progress"
                  description="The professional is working on your project."
                  completed={
                    isInProgress ||
                    isCompleted
                  }
                />


                <ProgressItem
                  title="Service Completed"
                  description="Your service has been completed."
                  completed={
                    isCompleted
                  }
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


              {/* PAYMENT */}

              {(isAccepted ||
                isInProgress) && (

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

                  <CreditCard size={19} />

                  Pay for Service

                </button>

              )}


              {/* CONTACT */}

              {(
                isAccepted ||
                isInProgress
              ) && (

                <button
                  className="
                    w-full
                    bg-black
                    hover:bg-gray-800
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


              {/* PENDING */}

              {isPending && (

                <div
                  className="
                    bg-yellow-50
                    border
                    border-yellow-200
                    text-yellow-800
                    rounded-xl
                    p-4
                    flex
                    items-start
                    gap-3
                  "
                >

                  <Clock3
                    size={20}
                    className="shrink-0 mt-0.5"
                  />

                  <div>

                    <p className="font-black">
                      Waiting for assignment
                    </p>

                    <p className="text-sm mt-1">
                      A verified professional will be assigned to your request.
                    </p>

                  </div>

                </div>

              )}


              {/* COMPLETED */}

              {isCompleted && (

                <div
                  className="
                    bg-green-50
                    border
                    border-green-200
                    text-green-800
                    rounded-xl
                    p-4
                    flex
                    items-start
                    gap-3
                  "
                >

                  <CheckCircle2
                    size={20}
                    className="shrink-0 mt-0.5"
                  />

                  <div>

                    <p className="font-black">
                      Service Completed
                    </p>

                    <p className="text-sm mt-1">
                      This service request has been completed.
                    </p>

                  </div>

                </div>

              )}

            </div>


            {/* PAYMENT SUMMARY */}

            <div
              className="
                border-t
                border-gray-200
                mt-6
                pt-6
              "
            >

              <p className="text-xs text-gray-500 font-black uppercase">
                Service Amount
              </p>

              <p className="text-3xl font-black mt-2">
                {formatAmount(request.price)}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Secure payment will be processed through Nyũmba Dragon 888.
              </p>

            </div>

          </aside>

        </div>

      </div>

    </DashboardLayout>

  );

}


function StatusBadge({
  status,
}) {

  const normalized =
    String(status || "").toUpperCase();


  let classes =
    "bg-yellow-100 text-yellow-700";


  if (
    normalized === "ACCEPTED" ||
    normalized === "IN PROGRESS"
  ) {

    classes =
      "bg-green-100 text-green-700";

  }


  if (normalized === "COMPLETED") {

    classes =
      "bg-green-200 text-green-800";

  }


  if (normalized === "CANCELLED") {

    classes =
      "bg-red-100 text-red-700";

  }


  const label =
    normalized === "IN PROGRESS"
      ? "In Progress"
      : normalized.charAt(0) +
        normalized.slice(1).toLowerCase();


  return (

    <span
      className={`
        inline-flex
        items-center
        gap-2
        px-4
        py-2
        rounded-full
        text-sm
        font-black
        ${classes}
      `}
    >

      <span
        className="
          w-2
          h-2
          rounded-full
          bg-current
        "
      />

      {label}

    </span>

  );

}


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
          flex
          items-center
          gap-3
          mb-3
          text-green-700
        "
      >

        {icon}

        <span
          className="
            text-xs
            font-black
            uppercase
            text-gray-500
          "
        >
          {label}
        </span>

      </div>


      <p className="font-black text-gray-900">
        {value}
      </p>

    </div>

  );

}


function ProgressItem({
  title,
  description,
  completed,
}) {

  return (

    <div className="flex gap-4">

      <div
        className={`
          w-10
          h-10
          rounded-full
          flex
          items-center
          justify-center
          shrink-0
          ${
            completed
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-400"
          }
        `}
      >

        {completed ? (

          <CheckCircle2 size={21} />

        ) : (

          <Clock3 size={21} />

        )}

      </div>


      <div>

        <p className="font-black text-gray-900">
          {title}
        </p>

        <p className="text-sm text-gray-500 mt-1">
          {description}
        </p>

      </div>

    </div>

  );

}
