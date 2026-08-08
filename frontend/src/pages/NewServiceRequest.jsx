import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  FileText,
  MapPin,
  Wallet,
  ShieldCheck,
} from "lucide-react";

import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";

import DashboardLayout from "../components/dashboard/DashboardLayout";


const serviceNames = {
  electrical: "Electrical Services",
  plumbing: "Plumbing Services",
  solar: "Solar Services",
  mechanical: "Mechanical Services",
  healthcare: "Healthcare Services",
  construction: "Construction Services",
  cleaning: "Cleaning Services",
};


export default function NewServiceRequest() {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const selectedService =
    searchParams.get("service") || "electrical";

  const serviceName =
    serviceNames[selectedService] || "Electrical Services";


  const [form, setForm] = useState({
    service: selectedService,
    description: "",
    location: "",
    date: "",
    time: "",
    budget: "",
  });


  function update(field, value) {

    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

  }


  function handleSubmit(event) {

    event.preventDefault();

    navigate(
      `/client/requests/review?service=${selectedService}`,
      {
        state: {
          request: form,
        },
      }
    );

  }


  return (

    <DashboardLayout role="client">

      <div className="min-h-screen bg-[#F5F5F5] text-black">

        {/* HEADER */}

        <section
          className="
            bg-black
            text-white
            rounded-3xl
            p-6
            md:p-8
            mb-8
          "
        >

          <Link
            to={`/services/${selectedService}`}
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

            Back to Service

          </Link>


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
              "
            >

              <span className="w-2 h-2 bg-green-500 rounded-full" />

              <span className="text-green-400 text-xs font-black">
                SERVICE REQUEST
              </span>

            </div>


            <h1
              className="
                text-3xl
                md:text-4xl
                font-black
                mt-4
              "
            >
              Request {serviceName}
            </h1>


            <p className="text-gray-300 mt-2 font-medium">
              Tell us what you need and we'll help connect you
              with the right professional.
            </p>

          </div>

        </section>


        {/* PROGRESS */}

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
              flex-wrap
              items-center
              gap-4
            "
          >

            <ProgressStep
              number="1"
              label="Request Details"
              active
            />

            <div className="hidden sm:block flex-1 h-px bg-gray-200" />

            <ProgressStep
              number="2"
              label="Review"
            />

            <div className="hidden sm:block flex-1 h-px bg-gray-200" />

            <ProgressStep
              number="3"
              label="Payment"
            />

          </div>

        </section>


        <form onSubmit={handleSubmit}>

          <div
            className="
              grid
              lg:grid-cols-3
              gap-6
              pb-10
            "
          >

            {/* MAIN FORM */}

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

              <div className="flex items-center gap-3 mb-7">

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
                  "
                >

                  <FileText size={22} />

                </div>


                <div>

                  <h2 className="text-2xl font-black">
                    Project Details
                  </h2>

                  <p className="text-gray-600 font-medium">
                    Give the professional enough information
                    to understand your project.
                  </p>

                </div>

              </div>


              {/* SERVICE */}

              <div className="mb-6">

                <label className="block font-black mb-2">
                  Service
                </label>

                <select
                  value={form.service}
                  onChange={(event) =>
                    update("service", event.target.value)
                  }
                  className="
                    w-full
                    border
                    border-gray-300
                    rounded-xl
                    px-4
                    py-3
                    font-semibold
                    outline-none
                    focus:border-green-700
                  "
                >

                  {Object.entries(serviceNames).map(
                    ([value, label]) => (

                      <option
                        key={value}
                        value={value}
                      >
                        {label}
                      </option>

                    )
                  )}

                </select>

              </div>


              {/* DESCRIPTION */}

              <div className="mb-6">

                <label className="block font-black mb-2">
                  What do you need done?
                </label>

                <textarea
                  value={form.description}
                  onChange={(event) =>
                    update(
                      "description",
                      event.target.value
                    )
                  }
                  placeholder="Describe the work you need, the problem you're experiencing, materials involved, property type, or any important details..."
                  rows="6"
                  required
                  className="
                    w-full
                    border
                    border-gray-300
                    rounded-xl
                    px-4
                    py-3
                    font-medium
                    outline-none
                    resize-none
                    focus:border-green-700
                  "
                />

              </div>


              {/* LOCATION */}

              <div className="mb-6">

                <label className="block font-black mb-2">
                  Service Location
                </label>

                <div className="relative">

                  <MapPin
                    size={19}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-green-700
                    "
                  />

                  <input
                    type="text"
                    value={form.location}
                    onChange={(event) =>
                      update(
                        "location",
                        event.target.value
                      )
                    }
                    placeholder="e.g. Westlands, Nairobi"
                    required
                    className="
                      w-full
                      border
                      border-gray-300
                      rounded-xl
                      pl-11
                      pr-4
                      py-3
                      font-semibold
                      outline-none
                      focus:border-green-700
                    "
                  />

                </div>

              </div>


              {/* DATE / TIME */}

              <div
                className="
                  grid
                  md:grid-cols-2
                  gap-5
                  mb-6
                "
              >

                <div>

                  <label className="block font-black mb-2">
                    Preferred Date
                  </label>

                  <div className="relative">

                    <CalendarDays
                      size={19}
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-green-700
                      "
                    />

                    <input
                      type="date"
                      value={form.date}
                      onChange={(event) =>
                        update("date", event.target.value)
                      }
                      required
                      className="
                        w-full
                        border
                        border-gray-300
                        rounded-xl
                        pl-11
                        pr-4
                        py-3
                        font-semibold
                        outline-none
                        focus:border-green-700
                      "
                    />

                  </div>

                </div>


                <div>

                  <label className="block font-black mb-2">
                    Preferred Time
                  </label>

                  <input
                    type="time"
                    value={form.time}
                    onChange={(event) =>
                      update("time", event.target.value)
                    }
                    required
                    className="
                      w-full
                      border
                      border-gray-300
                      rounded-xl
                      px-4
                      py-3
                      font-semibold
                      outline-none
                      focus:border-green-700
                    "
                  />

                </div>

              </div>


              {/* BUDGET */}

              <div className="mb-8">

                <label className="block font-black mb-2">
                  Estimated Budget
                </label>

                <div className="relative">

                  <span
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      font-black
                      text-green-700
                    "
                  >
                    KES
                  </span>

                  <input
                    type="number"
                    min="0"
                    value={form.budget}
                    onChange={(event) =>
                      update("budget", event.target.value)
                    }
                    placeholder="e.g. 15000"
                    required
                    className="
                      w-full
                      border
                      border-gray-300
                      rounded-xl
                      pl-16
                      pr-4
                      py-3
                      font-semibold
                      outline-none
                      focus:border-green-700
                    "
                  />

                </div>

                <p className="text-gray-500 text-sm mt-2">
                  This helps professionals understand the
                  expected scope of the project.
                </p>

              </div>


              <button
                type="submit"
                className="
                  w-full
                  bg-red-600
                  hover:bg-red-700
                  text-white
                  font-black
                  px-6
                  py-4
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition
                "
              >

                Continue to Review

                <ArrowRight size={19} />

              </button>

            </section>


            {/* SIDE CARD */}

            <aside className="space-y-5">

              <div
                className="
                  bg-white
                  border
                  border-gray-200
                  rounded-3xl
                  p-6
                "
              >

                <div
                  className="
                    w-12
                    h-12
                    rounded-xl
                    bg-green-100
                    text-green-700
                    flex
                    items-center
                    justify-center
                  "
                >

                  <ShieldCheck size={23} />

                </div>


                <h3 className="text-xl font-black mt-5">
                  Safe & Trusted
                </h3>


                <p className="text-gray-600 mt-2 font-medium">
                  Your request will be matched with suitable
                  professionals on Nyũmba Dragon 888.
                </p>


                <div className="mt-5 space-y-3">

                  <TrustItem text="Verified professionals" />

                  <TrustItem text="Transparent service process" />

                  <TrustItem text="Secure payment" />

                </div>

              </div>


              <div
                className="
                  bg-black
                  text-white
                  rounded-3xl
                  p-6
                "
              >

                <Wallet
                  size={24}
                  className="text-green-500"
                />

                <h3 className="text-xl font-black mt-4">
                  Payment comes later
                </h3>

                <p className="text-gray-300 mt-2 font-medium">
                  You will review your request before
                  proceeding to payment.
                </p>

              </div>

            </aside>

          </div>

        </form>

      </div>

    </DashboardLayout>

  );

}


/* PROGRESS */

function ProgressStep({
  number,
  label,
  active = false,
}) {

  return (

    <div className="flex items-center gap-3">

      <div
        className={`
          w-9
          h-9
          rounded-full
          flex
          items-center
          justify-center
          font-black
          ${
            active
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-500"
          }
        `}
      >

        {number}

      </div>

      <span
        className={`
          font-black
          text-sm
          ${
            active
              ? "text-black"
              : "text-gray-500"
          }
        `}
      >
        {label}
      </span>

    </div>

  );

}


/* TRUST ITEM */

function TrustItem({ text }) {

  return (

    <div
      className="
        flex
        items-center
        gap-3
        text-sm
        font-bold
      "
    >

      <CheckCircle2
        size={17}
        className="text-green-600"
      />

      {text}

    </div>

  );

}
