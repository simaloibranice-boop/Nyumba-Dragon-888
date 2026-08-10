import { useEffect, useMemo, useState } from "react";

import {
  ClipboardList,
  MapPin,
  CalendarDays,
  Wallet,
  ArrowRight,
  Plus,
  Clock3,
  CheckCircle2,
  Search,
  ShieldCheck,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

import { Link } from "react-router-dom";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import { getClientRequests } from "../services/clientService";


export default function ClientRequests() {

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");


  const loadRequests = async () => {

    try {

      setLoading(true);
      setError("");

      const data = await getClientRequests();

      setRequests(
        Array.isArray(data)
          ? data
          : data.requests || []
      );

    } catch (err) {

      console.error(
        "Failed to load client requests:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Failed to load your service requests."
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    loadRequests();
  }, []);


  const normalizedRequests = useMemo(() => {

    return requests.filter((request) => {

      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        String(request.title || "")
          .toLowerCase()
          .includes(searchText) ||
        String(request.description || "")
          .toLowerCase()
          .includes(searchText) ||
        String(request.location || "")
          .toLowerCase()
          .includes(searchText);


      const status =
        String(request.status || "").toUpperCase();

      const matchesFilter =
        filter === "ALL" ||
        status === filter;

      return matchesSearch && matchesFilter;

    });

  }, [requests, search, filter]);


  const countStatus = (status) => {

    return requests.filter(
      (request) =>
        String(request.status || "").toUpperCase() === status
    ).length;

  };


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
          month: "short",
          year: "numeric",
        }
      );

    } catch {

      return value;

    }

  };


  const getStatusLabel = (status) => {

    const normalized =
      String(status || "").toUpperCase();

    if (normalized === "PENDING") {
      return "Pending";
    }

    if (
      normalized === "ACCEPTED" ||
      normalized === "IN PROGRESS"
    ) {
      return "In Progress";
    }

    if (normalized === "COMPLETED") {
      return "Completed";
    }

    if (normalized === "CANCELLED") {
      return "Cancelled";
    }

    return status || "Unknown";

  };


  const getStatusClasses = (status) => {

    const normalized =
      String(status || "").toUpperCase();

    if (normalized === "COMPLETED") {
      return "bg-green-100 text-green-700";
    }

    if (
      normalized === "ACCEPTED" ||
      normalized === "IN PROGRESS"
    ) {
      return "bg-green-50 text-green-700";
    }

    if (normalized === "CANCELLED") {
      return "bg-red-100 text-red-700";
    }

    return "bg-yellow-100 text-yellow-700";

  };


  if (loading) {

    return (

      <DashboardLayout role="client">

        <div className="min-h-screen bg-gray-100 flex items-center justify-center">

          <div className="text-center">

            <RefreshCw
              size={32}
              className="animate-spin mx-auto mb-4"
            />

            <p className="font-bold text-gray-700">
              Loading your requests...
            </p>

          </div>

        </div>

      </DashboardLayout>

    );

  }


  return (

    <DashboardLayout role="client">

      <div className="min-h-screen bg-gray-100 text-black">

        <section className="bg-black rounded-3xl p-6 md:p-8 text-white mb-8">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div>

              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-4">

                <ClipboardList
                  size={16}
                  className="text-green-500"
                />

                <span className="text-green-400 text-xs font-black">
                  MY SERVICE REQUESTS
                </span>

              </div>

              <h1 className="text-3xl md:text-4xl font-black">
                My Requests
              </h1>

              <p className="text-gray-300 mt-2 font-medium">
                Track every service request from booking to completion.
              </p>

            </div>

            <div className="flex gap-3">

              <button
                onClick={loadRequests}
                className="bg-white/10 hover:bg-white/20 text-white font-black px-5 py-4 rounded-2xl flex items-center justify-center gap-2 transition"
              >

                <RefreshCw size={18} />

                Refresh

              </button>

              <Link
                to="/services"
                className="bg-red-600 hover:bg-red-700 text-white font-black px-6 py-4 rounded-2xl flex items-center justify-center gap-2 transition"
              >

                <Plus size={20} />

                New Request

              </Link>

            </div>

          </div>

        </section>


        {error && (

          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 mb-8 flex items-center gap-3">

            <AlertCircle size={20} />

            <span className="font-semibold">
              {error}
            </span>

          </div>

        )}


        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          <SummaryCard
            icon={<ClipboardList />}
            title="All Requests"
            value={requests.length}
          />

          <SummaryCard
            icon={<Clock3 />}
            title="Pending"
            value={countStatus("PENDING")}
          />

          <SummaryCard
            icon={<Clock3 />}
            title="In Progress"
            value={
              countStatus("ACCEPTED") +
              countStatus("IN PROGRESS")
            }
          />

          <SummaryCard
            icon={<CheckCircle2 />}
            title="Completed"
            value={countStatus("COMPLETED")}
            green
          />

        </section>


        <section className="bg-white rounded-3xl border border-gray-200 p-4 md:p-5 mb-8">

          <div className="flex flex-col md:flex-row gap-3">

            <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3 flex-1">

              <Search
                size={20}
                className="text-gray-500"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search requests..."
                className="outline-none w-full text-black font-semibold"
              />

            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-xl px-5 py-3 font-black bg-white outline-none"
            >

              <option value="ALL">
                All Requests
              </option>

              <option value="PENDING">
                Pending
              </option>

              <option value="ACCEPTED">
                Accepted
              </option>

              <option value="IN PROGRESS">
                In Progress
              </option>

              <option value="COMPLETED">
                Completed
              </option>

            </select>

          </div>

        </section>


        {normalizedRequests.length === 0 ? (

          <section className="bg-white rounded-3xl border border-gray-200 p-12 text-center">

            <ClipboardList
              size={48}
              className="mx-auto mb-4 text-gray-300"
            />

            <h2 className="text-xl font-black">
              No requests found
            </h2>

            <p className="text-gray-500 mt-2">

              {requests.length === 0
                ? "You have not created any service requests yet."
                : "Try changing your search or filter."
              }

            </p>

            {requests.length === 0 && (

              <Link
                to="/services"
                className="inline-flex items-center gap-2 mt-6 bg-red-600 hover:bg-red-700 text-white font-black px-6 py-3 rounded-xl"
              >

                <Plus size={18} />

                Create Request

              </Link>

            )}

          </section>

        ) : (

          <section className="space-y-5">

            {normalizedRequests.map((request) => (

              <div
                key={request.id}
                className="bg-white rounded-3xl border border-gray-200 p-6 md:p-7 hover:shadow-md transition"
              >

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                  <div className="flex-1">

                    <div className="flex flex-wrap items-center gap-3 mb-3">

                      <h2 className="text-xl font-black">
                        {request.title || "Service Request"}
                      </h2>

                      <span
                        className={`
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-black
                          ${getStatusClasses(request.status)}
                        `}
                      >
                        {getStatusLabel(request.status)}
                      </span>

                    </div>

                    <p className="text-gray-600 font-medium mb-5">
                      {request.description || "No description provided."}
                    </p>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

                      <RequestInfo
                        icon={<MapPin size={17} />}
                        label="Location"
                        value={request.location || "Not provided"}
                      />

                      <RequestInfo
                        icon={<CalendarDays size={17} />}
                        label="Requested"
                        value={formatDate(request.created_at)}
                      />

                      <RequestInfo
                        icon={<Wallet size={17} />}
                        label="Price"
                        value={formatAmount(request.price)}
                      />

                      <RequestInfo
                        icon={<ShieldCheck size={17} />}
                        label="Technician"
                        value={
                          request.technician_id
                            ? `Technician #${request.technician_id}`
                            : "Waiting for assignment"
                        }
                      />

                    </div>

                  </div>

                  <Link
                    to={`/client/requests/${request.id}`}
                    className="shrink-0 bg-black hover:bg-green-700 text-white font-black px-6 py-4 rounded-xl flex items-center justify-center gap-2 transition"
                  >

                    View Details

                    <ArrowRight size={18} />

                  </Link>

                </div>

              </div>

            ))}

          </section>

        )}

      </div>

    </DashboardLayout>

  );

}


function SummaryCard({
  icon,
  title,
  value,
  green = false,
}) {

  return (

    <div className="bg-white rounded-2xl border border-gray-200 p-5">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-gray-500 text-sm font-bold">
            {title}
          </p>

          <p className="text-3xl font-black mt-2">
            {value}
          </p>

        </div>

        <div
          className={`
            p-3
            rounded-xl
            ${
              green
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
            }
          `}
        >

          {icon}

        </div>

      </div>

    </div>

  );

}


function RequestInfo({
  icon,
  label,
  value,
}) {

  return (

    <div className="flex items-start gap-3">

      <div className="text-green-700 mt-0.5">
        {icon}
      </div>

      <div>

        <p className="text-xs text-gray-400 font-bold uppercase">
          {label}
        </p>

        <p className="text-sm font-bold text-gray-800 mt-1">
          {value}
        </p>

      </div>

    </div>

  );

}
