import { useState } from "react";
import {
  Menu,
  X,
  Home,
  Briefcase,
  Wallet,
  BarChart3,
  User,
  Settings,
  LogOut,
  ChevronRight
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";


export default function DashboardLayout({
  children,
  role = "technician"
}) {

  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();


  const technicianLinks = [
    {
      label: "Dashboard",
      path: "/technician/dashboard",
      icon: Home
    },
    {
      label: "Jobs",
      path: "/technician/jobs",
      icon: Briefcase
    },
    {
      label: "Earnings",
      path: "/technician/earnings",
      icon: Wallet
    },
    {
      label: "Analytics",
      path: "/technician/analytics",
      icon: BarChart3
    },
    {
      label: "Profile",
      path: "/technician/profile",
      icon: User
    },
    {
      label: "Settings",
      path: "/technician/settings",
      icon: Settings
    }
  ];


  const clientLinks = [
    {
      label: "Dashboard",
      path: "/client/dashboard",
      icon: Home
    },
    {
      label: "Requests",
      path: "/client/requests",
      icon: Briefcase
    },
    {
      label: "Services",
      path: "/services",
      icon: Briefcase
    },
    {
      label: "Profile",
      path: "/client/profile",
      icon: User
    },
    {
      label: "Settings",
      path: "/client/settings",
      icon: Settings
    }
  ];


  const links =
    role === "technician"
      ? technicianLinks
      : clientLinks;


  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };


  const isActive = (path) => {

    return location.pathname === path;

  };


  return (

    <div className="min-h-screen bg-[#F5F5F5] text-black">


      {/* =========================
          DESKTOP SIDEBAR
      ========================= */}

      <aside
        className="
          hidden
          lg:flex
          fixed
          left-0
          top-0
          bottom-0
          w-72
          bg-[#0F0F0F]
          text-white
          flex-col
          z-50
        "
      >


        {/* BRAND */}

        <div className="px-7 py-7 border-b border-white/10">

          <Link
            to={
              role === "technician"
                ? "/technician/dashboard"
                : "/client/dashboard"
            }
            className="flex items-center gap-3"
          >

            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-white
                flex
                items-center
                justify-center
                overflow-hidden
              "
            >

              <img
                src="/images/logo.png"
                alt="Nyũmba Dragon 888"
                className="w-full h-full object-contain"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

            </div>


            <div>

              <p className="font-black tracking-wide">
                NYŨMBA DRAGON
              </p>

              <p className="text-xs text-green-500 font-semibold">
                888 PLATFORM
              </p>

            </div>

          </Link>

        </div>


        {/* NAVIGATION */}

        <nav className="flex-1 px-4 py-6 space-y-2">

          <p
            className="
              px-3
              mb-4
              text-[11px]
              uppercase
              tracking-[0.2em]
              text-gray-500
              font-bold
            "
          >
            {role === "technician" ? "Professional" : "Customer"}
          </p>


          {links.map((item) => {

            const Icon = item.icon;

            const active = isActive(item.path);


            return (

              <Link
                key={item.path}
                to={item.path}
                className={`
                  group
                  flex
                  items-center
                  justify-between
                  px-4
                  py-3.5
                  rounded-xl
                  transition-all
                  duration-200
                  font-semibold

                  ${
                    active
                      ? "bg-white text-black shadow-lg"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }
                `}
              >

                <div className="flex items-center gap-3">

                  <Icon size={19} />

                  <span>
                    {item.label}
                  </span>

                </div>


                {active && (
                  <ChevronRight size={17} />
                )}

              </Link>

            );

          })}

        </nav>


        {/* LOGOUT */}

        <div className="p-4 border-t border-white/10">

          <button
            onClick={logout}
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              text-gray-300
              hover:bg-red-600
              hover:text-white
              transition
              font-semibold
            "
          >

            <LogOut size={19} />

            Logout

          </button>

        </div>

      </aside>


      {/* =========================
          MOBILE HEADER
      ========================= */}

      <header
        className="
          lg:hidden
          sticky
          top-0
          z-40
          bg-[#0F0F0F]
          text-white
          px-4
          py-3
          flex
          items-center
          justify-between
        "
      >

        <Link
          to={
            role === "technician"
              ? "/technician/dashboard"
              : "/client/dashboard"
          }
          className="flex items-center gap-3"
        >

          <div className="w-9 h-9 bg-white rounded-lg overflow-hidden">

            <img
              src="/images/logo.png"
              alt="Nyũmba Dragon 888"
              className="w-full h-full object-contain"
            />

          </div>

          <div>

            <p className="font-black text-sm">
              NYŨMBA DRAGON
            </p>

            <p className="text-green-500 text-[10px] font-bold">
              888 PLATFORM
            </p>

          </div>

        </Link>


        <button
          onClick={() => setMobileOpen(true)}
          className="
            w-10
            h-10
            rounded-xl
            bg-white/10
            flex
            items-center
            justify-center
          "
        >

          <Menu size={24} />

        </button>

      </header>


      {/* =========================
          MOBILE DRAWER
      ========================= */}

      {mobileOpen && (

        <div
          className="
            fixed
            inset-0
            z-[100]
            bg-black/60
            lg:hidden
          "
          onClick={() => setMobileOpen(false)}
        >

          <aside
            className="
              absolute
              left-0
              top-0
              bottom-0
              w-[85%]
              max-w-sm
              bg-[#0F0F0F]
              text-white
              p-5
              flex
              flex-col
            "
            onClick={(event) => event.stopPropagation()}
          >

            <div className="flex items-center justify-between mb-8">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 bg-white rounded-xl overflow-hidden">

                  <img
                    src="/images/logo.png"
                    alt="Nyũmba Dragon 888"
                    className="w-full h-full object-contain"
                  />

                </div>

                <div>

                  <p className="font-black">
                    NYŨMBA DRAGON
                  </p>

                  <p className="text-green-500 text-xs font-bold">
                    888 PLATFORM
                  </p>

                </div>

              </div>


              <button
                onClick={() => setMobileOpen(false)}
                className="text-gray-300"
              >

                <X size={25} />

              </button>

            </div>


            <nav className="space-y-2">

              {links.map((item) => {

                const Icon = item.icon;

                return (

                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`
                      flex
                      items-center
                      gap-4
                      px-4
                      py-4
                      rounded-xl
                      font-bold

                      ${
                        isActive(item.path)
                          ? "bg-white text-black"
                          : "text-gray-300 hover:bg-white/10"
                      }
                    `}
                  >

                    <Icon size={20} />

                    {item.label}

                  </Link>

                );

              })}

            </nav>


            <button
              onClick={logout}
              className="
                mt-auto
                flex
                items-center
                gap-3
                px-4
                py-4
                rounded-xl
                bg-red-600
                text-white
                font-bold
              "
            >

              <LogOut size={20} />

              Logout

            </button>

          </aside>

        </div>

      )}


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main
        className="
          lg:ml-72
          min-h-screen
          pb-24
          lg:pb-8
        "
      >

        {children}

      </main>


      {/* =========================
          MOBILE BOTTOM NAV
      ========================= */}

      <nav
        className="
          lg:hidden
          fixed
          bottom-0
          left-0
          right-0
          z-40
          bg-white
          border-t
          border-gray-200
          px-2
          py-2
          grid
          grid-cols-4
        "
      >

        {links.slice(0, 4).map((item) => {

          const Icon = item.icon;

          return (

            <Link
              key={item.path}
              to={item.path}
              className={`
                flex
                flex-col
                items-center
                justify-center
                gap-1
                py-2
                rounded-xl
                text-[10px]
                font-bold

                ${
                  isActive(item.path)
                    ? "text-red-600"
                    : "text-gray-500"
                }
              `}
            >

              <Icon size={19} />

              {item.label}

            </Link>

          );

        })}

      </nav>

    </div>

  );

}
