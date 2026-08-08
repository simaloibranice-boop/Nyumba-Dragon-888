import { useState } from "react";

import {
  Settings,
  Bell,
  Briefcase,
  Eye,
  ShieldCheck,
  Save,
  RotateCcw,
  ArrowLeft,
  LogOut,
  Check
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import DashboardLayout from "../components/dashboard/DashboardLayout";


export default function TechnicianSettings() {

  const navigate = useNavigate();


  const [settings, setSettings] = useState({
    notifications: true,
    jobAlerts: true,
    profileVisible: true
  });


  const [saved, setSaved] = useState(false);


  const updateSetting = (name) => {

    setSettings((current) => ({
      ...current,
      [name]: !current[name]
    }));

    setSaved(false);
  };


  const handleSave = () => {

    localStorage.setItem(
      "technicianSettings",
      JSON.stringify(settings)
    );

    setSaved(true);
  };


  const handleReset = () => {

    const defaults = {
      notifications: true,
      jobAlerts: true,
      profileVisible: true
    };

    setSettings(defaults);

    localStorage.removeItem("technicianSettings");

    setSaved(false);
  };


  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("technicianProfile");
    localStorage.removeItem("technicianSettings");

    navigate("/login");
  };


  return (

    <DashboardLayout role="technician">

      <div className="min-h-screen bg-gray-100 p-4 md:p-8">

        {/* HEADER */}

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

              <div
                className="
                  flex
                  items-center
                  gap-3
                  mb-3
                "
              >

                <div
                  className="
                    w-11
                    h-11
                    bg-green-600
                    rounded-xl
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Settings size={24} />
                </div>


                <span
                  className="
                    text-green-400
                    font-black
                    text-sm
                    uppercase
                  "
                >
                  Account Controls
                </span>

              </div>


              <h1
                className="
                  text-2xl
                  md:text-4xl
                  font-black
                "
              >
                Settings
              </h1>


              <p
                className="
                  text-gray-300
                  font-bold
                  mt-2
                "
              >
                Control your notifications, job visibility and account preferences.
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
                flex
                items-center
                gap-2
                w-fit
              "
            >

              <ArrowLeft size={18} />

              Dashboard

            </Link>

          </div>

        </section>


        {/* SETTINGS */}

        <section
          className="
            max-w-4xl
            mx-auto
            space-y-6
          "
        >

          {/* NOTIFICATIONS */}

          <div
            className="
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
                gap-3
                mb-6
              "
            >

              <div
                className="
                  bg-green-100
                  text-green-700
                  w-11
                  h-11
                  rounded-xl
                  flex
                  items-center
                  justify-center
                "
              >
                <Bell size={22} />
              </div>


              <div>

                <h2
                  className="
                    text-black
                    font-black
                    text-xl
                  "
                >
                  Notifications
                </h2>

                <p
                  className="
                    text-black
                    font-bold
                    text-sm
                  "
                >
                  Choose how Nyũmba Dragon keeps you informed.
                </p>

              </div>

            </div>


            <SettingRow
              title="Push Notifications"
              description="Receive important updates about your account."
              enabled={settings.notifications}
              onClick={() => updateSetting("notifications")}
            />


            <SettingRow
              title="New Job Alerts"
              description="Get notified when jobs matching your skills become available."
              enabled={settings.jobAlerts}
              onClick={() => updateSetting("jobAlerts")}
            />

          </div>


          {/* PROFILE VISIBILITY */}

          <div
            className="
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
                gap-3
                mb-6
              "
            >

              <div
                className="
                  bg-red-100
                  text-red-700
                  w-11
                  h-11
                  rounded-xl
                  flex
                  items-center
                  justify-center
                "
              >
                <Eye size={22} />
              </div>


              <div>

                <h2
                  className="
                    text-black
                    font-black
                    text-xl
                  "
                >
                  Profile Visibility
                </h2>

                <p
                  className="
                    text-black
                    font-bold
                    text-sm
                  "
                >
                  Control whether customers can discover your profile.
                </p>

              </div>

            </div>


            <SettingRow
              title="Show My Profile"
              description="Allow customers to find you when searching for professionals."
              enabled={settings.profileVisible}
              onClick={() => updateSetting("profileVisible")}
            />

          </div>


          {/* SECURITY */}

          <div
            className="
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
                gap-3
                mb-6
              "
            >

              <div
                className="
                  bg-gray-200
                  text-black
                  w-11
                  h-11
                  rounded-xl
                  flex
                  items-center
                  justify-center
                "
              >
                <ShieldCheck size={22} />
              </div>


              <div>

                <h2
                  className="
                    text-black
                    font-black
                    text-xl
                  "
                >
                  Security
                </h2>

                <p
                  className="
                    text-black
                    font-bold
                    text-sm
                  "
                >
                  Manage your account security.
                </p>

              </div>

            </div>


            <button
              type="button"
              onClick={() => alert("Password change will be connected to the backend next.")}
              className="
                w-full
                border-2
                border-black
                text-black
                font-black
                rounded-xl
                py-3
                hover:bg-black
                hover:text-white
                transition
              "
            >
              Change Password
            </button>

          </div>


          {/* SAVE */}

          {saved && (

            <div
              className="
                bg-green-100
                border
                border-green-300
                text-green-800
                font-black
                rounded-xl
                p-4
                flex
                items-center
                gap-2
              "
            >

              <Check size={20} />

              Settings saved successfully.

            </div>

          )}


          <div
            className="
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
                flex-col
                sm:flex-row
                gap-3
              "
            >

              <button
                type="button"
                onClick={handleSave}
                className="
                  flex-1
                  bg-red-600
                  text-white
                  font-black
                  py-3
                  rounded-xl
                  hover:bg-red-700
                  transition
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >

                <Save size={19} />

                Save Settings

              </button>


              <button
                type="button"
                onClick={handleReset}
                className="
                  flex-1
                  border-2
                  border-black
                  text-black
                  font-black
                  py-3
                  rounded-xl
                  hover:bg-black
                  hover:text-white
                  transition
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >

                <RotateCcw size={18} />

                Reset

              </button>

            </div>

          </div>


          {/* LOGOUT */}

          <div
            className="
              bg-red-50
              border
              border-red-200
              rounded-3xl
              p-6
            "
          >

            <div
              className="
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-4
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
                  Sign Out
                </h2>

                <p
                  className="
                    text-black
                    font-bold
                    text-sm
                    mt-1
                  "
                >
                  Sign out of your Nyũmba Dragon technician account.
                </p>

              </div>


              <button
                type="button"
                onClick={handleLogout}
                className="
                  bg-black
                  text-white
                  font-black
                  px-6
                  py-3
                  rounded-xl
                  hover:bg-red-600
                  transition
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >

                <LogOut size={19} />

                Log Out

              </button>

            </div>

          </div>

        </section>

      </div>

    </DashboardLayout>

  );
}


/* SETTING ROW */

function SettingRow({
  title,
  description,
  enabled,
  onClick
}) {

  return (

    <div
      className="
        flex
        items-center
        justify-between
        gap-5
        py-5
        border-b
        border-gray-200
        last:border-b-0
      "
    >

      <div>

        <h3
          className="
            text-black
            font-black
          "
        >
          {title}
        </h3>

        <p
          className="
            text-black
            font-bold
            text-sm
            mt-1
            max-w-xl
          "
        >
          {description}
        </p>

      </div>


      <button
        type="button"
        onClick={onClick}
        aria-label={`Toggle ${title}`}
        className={`
          relative
          shrink-0
          w-14
          h-8
          rounded-full
          transition
          ${
            enabled
              ? "bg-green-600"
              : "bg-gray-400"
          }
        `}
      >

        <span
          className={`
            absolute
            top-1
            w-6
            h-6
            bg-white
            rounded-full
            shadow
            transition
            ${
              enabled
                ? "left-7"
                : "left-1"
            }
          `}
        />

      </button>

    </div>

  );
}
