import { NavLink } from "react-router-dom";

import {
  Home,
  BriefcaseBusiness,
  WalletCards,
  BarChart3,
  UserRound,
  Settings,
  LogOut,
  X,
  ChevronRight
} from "lucide-react";


export default function Sidebar({
  role = "technician",
  open = false,
  setOpen = () => {}
}) {


  const technicianLinks = [

    {
      name: "Dashboard",
      path: "/technician/dashboard",
      icon: Home
    },

    {
      name: "Jobs",
      path: "/technician/jobs",
      icon: BriefcaseBusiness
    },

    {
      name: "Earnings",
      path: "/technician/earnings",
      icon: WalletCards
    },

    {
      name: "Analytics",
      path: "/technician/analytics",
      icon: BarChart3
    },

    {
      name: "Profile",
      path: "/technician/profile",
      icon: UserRound
    },

    {
      name: "Settings",
      path: "/technician/settings",
      icon: Settings
    }

  ];


  const clientLinks = [

    {
      name: "Dashboard",
      path: "/client/dashboard",
      icon: Home
    },

    {
      name: "Requests",
      path: "/client/requests",
      icon: BriefcaseBusiness
    },

    {
      name: "Services",
      path: "/services",
      icon: BriefcaseBusiness
    },

    {
      name: "Profile",
      path: "/client/profile",
      icon: UserRound
    },

    {
      name: "Settings",
      path: "/client/settings",
      icon: Settings
    }

  ];


  const links =
    role === "technician"
      ? technicianLinks
      : clientLinks;



  return (

    <aside

      className={`
        fixed
        left-0
        top-0
        z-50

        h-screen
        w-[280px]

        bg-[#0B0B0B]
        text-white

        border-r
        border-white/10

        flex
        flex-col

        transition-transform
        duration-300

        ${open
          ? "translate-x-0"
          : "-translate-x-full"
        }

        lg:translate-x-0
      `}

    >


      {/* MOBILE CLOSE BUTTON */}

      <div
        className="
          lg:hidden
          absolute
          top-5
          right-5
        "
      >

        <button

          onClick={() => setOpen(false)}

          className="
            w-10
            h-10
            rounded-xl
            bg-white/10
            flex
            items-center
            justify-center
            hover:bg-red-600
            transition
          "

        >

          <X size={20}/>

        </button>

      </div>



      {/* BRAND */}

      <div

        className="
          px-7
          pt-7
          pb-6
          border-b
          border-white/10
        "

      >

        <div
          className="
            flex
            items-center
            gap-4
          "
        >

          {/* LOGO */}

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
              shrink-0
            "

          >

            <img

              src="/images/logo.png"

              alt="Nyũmba Dragon 888"

              className="
                w-full
                h-full
                object-contain
              "

              onError={(event) => {

                event.currentTarget.style.display = "none";

              }}

            />

          </div>



          {/* BRAND NAME */}

          <div>

            <h1

              className="
                text-[15px]
                font-black
                tracking-tight
              "

            >

              NYŨMBA DRAGON

            </h1>


            <p

              className="
                text-green-500
                text-[11px]
                font-black
                tracking-wide
                mt-0.5
              "

            >

              888 PLATFORM

            </p>

          </div>

        </div>

      </div>



      {/* NAVIGATION */}

      <div

        className="
          flex-1
          overflow-y-auto
          px-4
          py-7
        "

      >


        {/* SECTION TITLE */}

        <p

          className="
            px-4
            mb-4
            text-[10px]
            uppercase
            tracking-[0.25em]
            text-gray-500
            font-black
          "

        >

          Professional

        </p>



        {/* NAV ITEMS */}

        <nav

          className="
            flex
            flex-col
            gap-2
          "

        >

          {links.map((item) => {

            const Icon = item.icon;


            return (

              <NavLink

                key={item.path}

                to={item.path}

                onClick={() => setOpen(false)}

                className={({ isActive }) => `

                  group

                  w-full

                  min-h-[54px]

                  px-4

                  rounded-2xl

                  flex
                  items-center
                  justify-between

                  font-black
                  text-[14px]

                  transition-all
                  duration-200

                  ${
                    isActive

                    ?

                    `
                      bg-white
                      text-black
                      shadow-sm
                    `

                    :

                    `
                      bg-transparent
                      text-gray-300
                      hover:bg-white/10
                      hover:text-white
                    `
                  }

                `}

              >


                {/* LEFT SIDE */}

                <div

                  className="
                    flex
                    items-center
                    gap-4
                  "

                >

                  <Icon

                    size={20}

                    strokeWidth={2.2}

                  />

                  <span>

                    {item.name}

                  </span>

                </div>



                {/* RIGHT ARROW */}

                <ChevronRight

                  size={18}

                  strokeWidth={2.5}

                  className="
                    opacity-60
                    group-hover:opacity-100
                    transition
                  "

                />

              </NavLink>

            );

          })}

        </nav>

      </div>



      {/* BOTTOM AREA */}

      <div

        className="
          border-t
          border-white/10
          px-4
          pt-4
          pb-5
        "

      >


        {/* LOGOUT */}

        <button

          onClick={() => {

            localStorage.removeItem("token");

            localStorage.removeItem("user");

            window.location.href = "/login";

          }}

          className="
            w-full
            min-h-[52px]
            px-4
            rounded-2xl

            flex
            items-center
            justify-between

            text-gray-300

            font-black
            text-[14px]

            hover:bg-red-600
            hover:text-white

            transition
          "

        >

          <div

            className="
              flex
              items-center
              gap-4
            "

          >

            <LogOut

              size={20}

              strokeWidth={2.2}

            />

            <span>

              Logout

            </span>

          </div>


          <ChevronRight

            size={18}

          />

        </button>



        {/* KENYAN IDENTITY */}

        <div

          className="
            mt-4
            pt-4
            border-t
            border-white/10
            flex
            items-center
            justify-between
          "

        >

          <div>

            <p

              className="
                text-[10px]
                uppercase
                tracking-widest
                text-gray-500
                font-black
              "

            >

              Built for Kenya

            </p>


            <p

              className="
                text-xs
                text-white
                font-black
                mt-1
              "

            >

              Nyũmba Dragon 888

            </p>

          </div>



          {/* KENYAN FLAG */}

          <div

            className="
              relative
              w-10
              h-7
              rounded-md
              overflow-hidden
              border
              border-white/20
              shadow-lg
              shrink-0
            "

            title="Kenya"

          >

            {/* GREEN */}

            <div

              className="
                absolute
                top-0
                left-0
                right-0
                h-[30%]
                bg-[#006B3C]
              "

            />



            {/* WHITE */}

            <div

              className="
                absolute
                top-[30%]
                left-0
                right-0
                h-[10%]
                bg-white
              "

            />



            {/* RED */}

            <div

              className="
                absolute
                top-[40%]
                left-0
                right-0
                h-[20%]
                bg-[#BB0000]
              "

            />



            {/* WHITE */}

            <div

              className="
                absolute
                top-[60%]
                left-0
                right-0
                h-[10%]
                bg-white
              "

            />



            {/* GREEN */}

            <div

              className="
                absolute
                bottom-0
                left-0
                right-0
                h-[30%]
                bg-[#006B3C]
              "

            />



            {/* BLACK SHIELD */}

            <div

              className="
                absolute
                left-1/2
                top-1/2
                -translate-x-1/2
                -translate-y-1/2

                w-[8px]
                h-[22px]

                bg-black

                rounded-[50%]
              "

            />

          </div>

        </div>


      </div>


    </aside>

  );

}
