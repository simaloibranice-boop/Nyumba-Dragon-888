import {
  Search,
  MapPin,
  ClipboardList,
  CheckCircle,
  Clock,
  Wallet,
  ArrowRight,
  Plus,
  ShieldCheck,
  ChevronRight,
  RefreshCw,
  AlertCircle,
  Loader2,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import DashboardLayout from "../components/dashboard/DashboardLayout";

import { AuthContext } from "../context/AuthContext";

import {
  getClientRequests,
  getClientServices,
} from "../services/clientService";


export default function ClientDashboard() {

  const {
    user,
    loading: authLoading,
  } = useContext(AuthContext);

  const navigate = useNavigate();


  const [requests, setRequests] = useState([]);

  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [refreshing, setRefreshing] = useState(false);


  /*
  |--------------------------------------------------------------------------
  | LOAD CLIENT DATA
  |--------------------------------------------------------------------------
  */

  const loadDashboard = async () => {

    try {

      setError("");

      setRefreshing(true);


      const [
        requestData,
        serviceData,
      ] = await Promise.all([

        getClientRequests(),

        getClientServices(),

      ]);


      setRequests(
        Array.isArray(requestData)
          ? requestData
          : []
      );


      setServices(
        Array.isArray(serviceData)
          ? serviceData
          : []
      );


    } catch (err) {

      console.error(
        "CLIENT DASHBOARD ERROR:",
        err
      );


      if (
        err?.response?.status === 401
      ) {

        setError(
          "Your session has expired. Please log in again."
        );

      } else {

        setError(
          "We could not load your dashboard right now."
        );

      }

    } finally {

      setLoading(false);

      setRefreshing(false);

    }

  };


  useEffect(() => {

    if (!authLoading) {

      loadDashboard();

    }

  }, [authLoading]);


  /*
  |--------------------------------------------------------------------------
  | CALCULATIONS
  |--------------------------------------------------------------------------
  */

  const totalRequests =
    requests.length;


  const activeRequests =
    requests.filter((request) => {

      const status =
        String(
          request.status || ""
        ).toUpperCase();

      return [
        "PENDING",
        "ACCEPTED",
        "IN PROGRESS",
        "IN_PROGRESS",
      ].includes(status);

    }).length;


  const completedRequests =
    requests.filter((request) => {

      const status =
        String(
          request.status || ""
        ).toUpperCase();

      return status === "COMPLETED";

    }).length;


  const totalSpent =
    requests.reduce(
      (total, request) => {

        const price =
          Number(
            request.price || 0
          );

        return total + price;

      },
      0
    );


  /*
  |--------------------------------------------------------------------------
  | SEARCH
  |--------------------------------------------------------------------------
  */

  const filteredRequests =
    useMemo(() => {

      const query =
        search
          .trim()
          .toLowerCase();


      if (!query) {

        return requests;

      }


      return requests.filter(
        (request) => {

          return (

            String(
              request.title || ""
            )
              .toLowerCase()
              .includes(query)

            ||

            String(
              request.description || ""
            )
              .toLowerCase()
              .includes(query)

            ||

            String(
              request.location || ""
            )
              .toLowerCase()
              .includes(query)

            ||

            String(
              request.status || ""
            )
              .toLowerCase()
              .includes(query)

          );

        }
      );

    }, [requests, search]);


  /*
  |--------------------------------------------------------------------------
  | RECENT REQUESTS
  |--------------------------------------------------------------------------
  */

  const recentRequests =
    filteredRequests.slice(0, 5);


  /*
  |--------------------------------------------------------------------------
  | USER NAME
  |--------------------------------------------------------------------------
  */

  const firstName =
    user?.username
      ? user.username.split(" ")[0]
      : "there";


  /*
  |--------------------------------------------------------------------------
  | FORMAT MONEY
  |--------------------------------------------------------------------------
  */

  const formatMoney = (amount) => {

    return new Intl.NumberFormat(
      "en-KE",
      {
        style: "currency",
        currency: "KES",
        maximumFractionDigits: 0,
      }
    ).format(
      Number(amount || 0)
    );

  };


  /*
  |--------------------------------------------------------------------------
  | FORMAT DATE
  |--------------------------------------------------------------------------
  */

  const formatDate = (date) => {

    if (!date) {

      return "Date unavailable";

    }


    const parsed =
      new Date(date);


    if (
      Number.isNaN(
        parsed.getTime()
      )
    ) {

      return "Date unavailable";

    }


    return parsed.toLocaleDateString(
      "en-KE",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  };


  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (authLoading || loading) {

    return (

      <DashboardLayout role="client">

        <div
          className="
            min-h-screen
            bg-gray-100
            flex
            items-center
            justify-center
            p-6
          "
        >

          <div
            className="
              bg-white
              rounded-3xl
              border
              border-gray-200
              p-10
              text-center
              max-w-md
              w-full
            "
          >

            <div
              className="
                w-16
                h-16
                mx-auto
                rounded-2xl
                bg-black
                text-white
                flex
                items-center
                justify-center
                mb-5
              "
            >

              <Loader2
                size={28}
                className="animate-spin"
              />

            </div>


            <h2
              className="
                text-2xl
                font-black
              "
            >
              Loading your dashboard
            </h2>


            <p
              className="
                text-gray-500
                mt-2
                font-medium
              "
            >
              Preparing your Nyũmba Dragon experience...
            </p>

          </div>

        </div>

      </DashboardLayout>

    );

  }


  /*
  |--------------------------------------------------------------------------
  | DASHBOARD
  |--------------------------------------------------------------------------
  */

  return (

    <DashboardLayout role="client">

      <div
        className="
          min-h-screen
          bg-gray-100
          text-black
          p-4
          md:p-6
          lg:p-8
        "
      >


        {/* =====================================================
            HERO
        ====================================================== */}

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

                <span
                  className="
                    w-2
                    h-2
                    bg-green-500
                    rounded-full
                  "
                />

                <span
                  className="
                    text-green-400
                    text-xs
                    font-black
                  "
                >
                  NYŨMBA DRAGON 888
                </span>

              </div>


              <h1
                className="
                  text-3xl
                  md:text-4xl
                  font-black
                "
              >
                Welcome back, {firstName} 👋🏾
              </h1>


              <p
                className="
                  text-gray-300
                  mt-2
                  font-medium
                  max-w-2xl
                "
              >
                Find trusted professionals, manage your
                projects and keep track of every service
                request from one place.
              </p>

            </div>


            <div
              className="
                flex
                flex-col
                sm:flex-row
                gap-3
              "
            >

              <button
                onClick={loadDashboard}
                disabled={refreshing}
                className="
                  border
                  border-white/20
                  hover:bg-white/10
                  text-white
                  font-black
                  px-5
                  py-4
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition
                  disabled:opacity-50
                "
              >

                <RefreshCw
                  size={18}
                  className={
                    refreshing
                      ? "animate-spin"
                      : ""
                  }
                />

                Refresh

              </button>


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
                  gap-3
                  transition
                "
              >

                <Plus size={20} />

                Book a Service

              </Link>

            </div>

          </div>


          {/* SEARCH */}

          <div
            className="
              mt-8
              bg-white
              rounded-2xl
              p-2
              flex
              flex-col
              md:flex-row
              gap-2
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
                px-4
                py-3
                text-black
                md:w-56
              "
            >

              <MapPin
                size={19}
                className="text-green-700"
              />

              <span className="font-bold">
                Kenya
              </span>

            </div>


            <div
              className="
                flex-1
                flex
                items-center
                gap-3
                px-4
                py-3
                text-gray-500
              "
            >

              <Search size={20} />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search your requests..."
                className="
                  w-full
                  outline-none
                  text-black
                  font-semibold
                "
              />

            </div>


            <Link
              to="/services"
              className="
                bg-green-700
                hover:bg-green-800
                text-white
                font-black
                px-7
                py-3
                rounded-xl
                flex
                items-center
                justify-center
                gap-2
              "
            >

              Find a Professional

              <ArrowRight size={18} />

            </Link>

          </div>

        </section>


        {/* =====================================================
            ERROR
        ====================================================== */}

        {error && (

          <section
            className="
              bg-red-50
              border
              border-red-200
              rounded-2xl
              p-5
              mb-8
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-4
            "
          >

            <div
              className="
                flex
                items-start
                gap-3
              "
            >

              <AlertCircle
                className="
                  text-red-600
                  mt-0.5
                  flex-shrink-0
                "
              />

              <div>

                <p
                  className="
                    font-black
                    text-red-800
                  "
                >
                  Dashboard unavailable
                </p>

                <p
                  className="
                    text-red-700
                    text-sm
                    mt-1
                    font-medium
                  "
                >
                  {error}
                </p>

              </div>

            </div>


            <button
              onClick={loadDashboard}
              className="
                bg-red-600
                hover:bg-red-700
                text-white
                px-5
                py-3
                rounded-xl
                font-black
              "
            >
              Try Again
            </button>

          </section>

        )}


        {/* =====================================================
            STATS
        ====================================================== */}

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

          <Stat
            icon={<ClipboardList />}
            title="Total Requests"
            value={totalRequests}
            detail="All your service requests"
          />


          <Stat
            icon={<Clock />}
            title="Active Requests"
            value={activeRequests}
            detail="Currently being handled"
            green
          />


          <Stat
            icon={<CheckCircle />}
            title="Completed"
            value={completedRequests}
            detail="Successfully completed"
          />


          <Stat
            icon={<Wallet />}
            title="Total Spent"
            value={formatMoney(totalSpent)}
            detail="Across your service requests"
          />

        </section>


        {/* =====================================================
            QUICK ACTIONS
        ====================================================== */}

        <section className="mb-8">

          <h2
            className="
              text-2xl
              font-black
              mb-5
            "
          >
            Quick Actions
          </h2>


          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-3
              gap-5
            "
          >

            <QuickAction
              to="/services"
              icon={<Search />}
              title="Find a Professional"
              description="Browse services and verified professionals."
            />


            <QuickAction
              to="/client/requests"
              icon={<ClipboardList />}
              title="My Requests"
              description="Track your current and completed projects."
            />


            <QuickAction
              to="/client/profile"
              icon={<ShieldCheck />}
              title="My Profile"
              description="Manage your personal account information."
            />

          </div>

        </section>


        {/* =====================================================
            RECENT REQUESTS
        ====================================================== */}

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

          <div
            className="
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-3
              mb-6
            "
          >

            <div>

              <h2
                className="
                  text-2xl
                  font-black
                "
              >
                Recent Requests
              </h2>

              <p
                className="
                  text-gray-600
                  mt-1
                  font-medium
                "
              >
                Keep track of your home projects.
              </p>

            </div>


            <Link
              to="/client/requests"
              className="
                text-red-600
                font-black
                flex
                items-center
                gap-1
              "
            >

              View All

              <ChevronRight size={18} />

            </Link>

          </div>


          {recentRequests.length === 0 ? (

            <EmptyRequests />

          ) : (

            <div className="space-y-4">

              {recentRequests.map(
                (request) => (

                  <RequestCard
                    key={request.id}
                    request={request}
                    formatMoney={formatMoney}
                    formatDate={formatDate}
                  />

                )
              )}

            </div>

          )}

        </section>


        {/* =====================================================
            POPULAR SERVICES
        ====================================================== */}

        <section className="mb-10">

          <div
            className="
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-3
              mb-6
            "
          >

            <div>

              <h2
                className="
                  text-2xl
                  font-black
                "
              >
                Popular Services
              </h2>

              <p
                className="
                  text-gray-600
                  mt-1
                  font-medium
                "
              >
                {services.length > 0
                  ? `${services.length} services available on Nyũmba Dragon 888.`
                  : "Trusted professionals ready to help."
                }
              </p>

            </div>


            <Link
              to="/services"
              className="
                text-red-600
                font-black
                flex
                items-center
                gap-1
              "
            >

              Browse All

              <ArrowRight size={18} />

            </Link>

          </div>


          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-4
              gap-5
            "
          >

            {getPopularServices(
              services
            ).map(
              (service) => (

                <ServiceCard
                  key={service.id || service.title}
                  service={service}
                />

              )
            )}

          </div>

        </section>


        {/* =====================================================
            TRUST BANNER
        ====================================================== */}

        <section
          className="
            bg-black
            rounded-3xl
            p-6
            md:p-8
            text-white
            mb-10
          "
        >

          <div
            className="
              grid
              md:grid-cols-3
              gap-6
              items-center
            "
          >

            <div
              className="
                md:col-span-2
              "
            >

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
                  size={25}
                />

                <span
                  className="
                    text-green-400
                    font-black
                  "
                >
                  VERIFIED PROFESSIONALS
                </span>

              </div>


              <h2
                className="
                  text-2xl
                  md:text-3xl
                  font-black
                "
              >
                Your home is in trusted hands.
              </h2>


              <p
                className="
                  text-gray-300
                  mt-2
                  font-medium
                  max-w-2xl
                "
              >
                Nyũmba Dragon 888 connects you with
                professionals for electrical work,
                plumbing, construction, solar and other
                essential services.
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
                rounded-xl
                text-center
                transition
              "
            >
              Explore Services
            </Link>

          </div>

        </section>

      </div>

    </DashboardLayout>

  );

}


/* ============================================================
   STAT CARD
============================================================ */

function Stat({
  icon,
  title,
  value,
  detail,
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
          text-2xl
          font-black
          mt-1
        "
      >
        {value}
      </h3>


      <p
        className="
          text-gray-500
          text-sm
          mt-2
          font-medium
        "
      >
        {detail}
      </p>

    </div>

  );

}


/* ============================================================
   QUICK ACTION
============================================================ */

function QuickAction({
  to,
  icon,
  title,
  description,
}) {

  return (

    <Link
      to={to}
      className="
        bg-white
        border
        border-gray-200
        rounded-3xl
        p-6
        flex
        items-center
        gap-5
        hover:border-green-700
        hover:shadow-lg
        transition
        group
      "
    >

      <div
        className="
          bg-black
          text-white
          p-4
          rounded-2xl
          group-hover:bg-green-700
          transition
        "
      >

        {icon}

      </div>


      <div className="flex-1">

        <h3
          className="
            font-black
            text-lg
          "
        >
          {title}
        </h3>


        <p
          className="
            text-gray-600
            text-sm
            mt-1
            font-medium
          "
        >
          {description}
        </p>

      </div>


      <ArrowRight
        className="
          text-red-600
          group-hover:translate-x-1
          transition
        "
      />

    </Link>

  );

}


/* ============================================================
   REQUEST CARD
============================================================ */

function RequestCard({
  request,
  formatMoney,
  formatDate,
}) {

  const status =
    String(
      request.status || "Pending"
    );


  const normalizedStatus =
    status.toUpperCase();


  let statusColor =
    "yellow";


  if (
    normalizedStatus === "COMPLETED"
  ) {

    statusColor = "green";

  }


  if (
    normalizedStatus === "CANCELLED" ||
    normalizedStatus === "REJECTED"
  ) {

    statusColor = "red";

  }


  const technician =
    request.technician_id
      ? "Professional assigned"
      : "Waiting for professional assignment";


  return (

    <div
      className="
        bg-gray-50
        border
        border-gray-200
        rounded-2xl
        p-5
        flex
        flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between
        gap-5
      "
    >

      <div
        className="
          flex
          items-start
          gap-4
        "
      >

        <div
          className="
            bg-black
            text-white
            p-3
            rounded-xl
            flex-shrink-0
          "
        >

          <ClipboardList size={21} />

        </div>


        <div>

          <h3
            className="
              font-black
              text-lg
            "
          >
            {request.title || "Service Request"}
          </h3>


          <p
            className="
              text-gray-600
              mt-1
              font-medium
              flex
              items-center
              gap-1
            "
          >

            <MapPin size={15} />

            {request.location || "Location not provided"}

          </p>


          <p
            className="
              text-gray-500
              text-sm
              mt-2
              font-medium
            "
          >
            {technician}
            {" • "}
            {formatDate(
              request.created_at
            )}
          </p>

        </div>

      </div>


      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          gap-4
        "
      >

        <p
          className="
            text-green-700
            font-black
            text-lg
          "
        >
          {formatMoney(
            request.price
          )}
        </p>


        <StatusBadge
          status={status}
          color={statusColor}
        />


        <Link
          to={`/client/requests/${request.id}`}
          className="
            bg-black
            hover:bg-green-700
            text-white
            font-black
            px-5
            py-3
            rounded-xl
            transition
            text-center
          "
        >
          View
        </Link>

      </div>

    </div>

  );

}


/* ============================================================
   STATUS BADGE
============================================================ */

function StatusBadge({
  status,
  color,
}) {

  const styles = {

    green:
      "bg-green-100 text-green-800",

    yellow:
      "bg-yellow-100 text-yellow-800",

    red:
      "bg-red-100 text-red-800",

  };


  return (

    <span
      className={`
        px-4
        py-2
        rounded-full
        text-sm
        font-black
        whitespace-nowrap
        ${styles[color] || styles.yellow}
      `}
    >

      {status}

    </span>

  );

}


/* ============================================================
   EMPTY REQUESTS
============================================================ */

function EmptyRequests() {

  return (

    <div
      className="
        border-2
        border-dashed
        border-gray-200
        rounded-2xl
        p-10
        text-center
      "
    >

      <div
        className="
          w-16
          h-16
          mx-auto
          bg-gray-100
          rounded-2xl
          flex
          items-center
          justify-center
          mb-5
        "
      >

        <ClipboardList
          size={28}
          className="text-gray-500"
        />

      </div>


      <h3
        className="
          text-xl
          font-black
        "
      >
        No service requests yet
      </h3>


      <p
        className="
          text-gray-500
          mt-2
          font-medium
          max-w-md
          mx-auto
        "
      >
        Your service requests will appear here
        once you book your first professional.
      </p>


      <Link
        to="/services"
        className="
          inline-flex
          items-center
          gap-2
          mt-6
          bg-red-600
          hover:bg-red-700
          text-white
          font-black
          px-6
          py-3
          rounded-xl
        "
      >

        Find a Professional

        <ArrowRight size={18} />

      </Link>

    </div>

  );

}


/* ============================================================
   POPULAR SERVICES
============================================================ */

function getPopularServices(services) {

  const fallback = [

    {
      id: "electrician",
      title: "Electrician",
      description:
        "Wiring, installations and electrical repairs.",
      image:
        "/images/electrician.jpg",
      path:
        "/services",
    },

    {
      id: "plumber",
      title: "Plumber",
      description:
        "Leak repairs, piping and installations.",
      image:
        "/images/plumber.jpg",
      path:
        "/services",
    },

    {
      id: "mason",
      title: "Mason",
      description:
        "Brickwork, construction and plastering.",
      image:
        "/images/mason.jpg",
      path:
        "/services",
    },

    {
      id: "solar",
      title: "Solar Technician",
      description:
        "Solar installation and maintenance.",
      image:
        "/images/solar-technician.jpg",
      path:
        "/services",
    },

  ];


  if (!services.length) {

    return fallback;

  }


  return services
    .slice(0, 4)
    .map((service) => ({

      id: service.id,

      title:
        service.name ||
        service.title ||
        "Professional Service",

      description:
        service.description ||
        "Book a trusted professional for this service.",

      image:
        service.image ||
        service.image_url ||
        "/images/logo.png",

      path:
        `/services/${service.id}`,

    }));

}


/* ============================================================
   SERVICE CARD
============================================================ */

function ServiceCard({
  service,
}) {

  return (

    <Link
      to={service.path}
      className="
        group
        bg-white
        rounded-3xl
        overflow-hidden
        border
        border-gray-200
        hover:shadow-xl
        hover:-translate-y-1
        transition
      "
    >

      <div
        className="
          h-44
          overflow-hidden
          bg-gray-100
        "
      >

        <img
          src={service.image}
          alt={service.title}
          className="
            w-full
            h-full
            object-cover
            group-hover:scale-105
            transition
            duration-500
          "
          onError={(event) => {

            event.currentTarget.src =
              "/images/logo.png";

          }}
        />

      </div>


      <div className="p-5">

        <div
          className="
            flex
            items-center
            justify-between
            gap-3
          "
        >

          <h3
            className="
              font-black
              text-lg
            "
          >
            {service.title}
          </h3>


          <ArrowRight
            size={19}
            className="
              text-red-600
              group-hover:translate-x-1
              transition
              flex-shrink-0
            "
          />

        </div>


        <p
          className="
            text-gray-600
            mt-2
            text-sm
            font-medium
            line-clamp-2
          "
        >
          {service.description}
        </p>

      </div>

    </Link>

  );

}
