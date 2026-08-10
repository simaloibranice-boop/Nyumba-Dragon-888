import { useEffect, useState } from "react";

import {
  Settings,
  Bell,
  Eye,
  ShieldCheck,
  Save,
  RotateCcw,
  ArrowLeft,
  LogOut,
  Check,
  Lock,
  X,
  EyeOff,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import DashboardLayout from "../components/dashboard/DashboardLayout";

import api from "../services/api";


export default function TechnicianSettings() {

  const navigate = useNavigate();


  // ==========================================
  // SETTINGS
  // ==========================================

  const [settings, setSettings] = useState({
    notifications: true,
    jobAlerts: true,
    profileVisible: true,
  });


  const [saved, setSaved] = useState(false);


  // ==========================================
  // CHANGE PASSWORD
  // ==========================================

  const [showPasswordModal, setShowPasswordModal] =
    useState(false);

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [passwordLoading, setPasswordLoading] =
    useState(false);

  const [passwordError, setPasswordError] =
    useState("");

  const [passwordSuccess, setPasswordSuccess] =
    useState("");


  // ==========================================
  // LOAD SAVED SETTINGS
  // ==========================================

  useEffect(() => {

    const storedSettings =
      localStorage.getItem("technicianSettings");

    if (!storedSettings) {
      return;
    }

    try {

      const parsed =
        JSON.parse(storedSettings);

      setSettings((current) => ({
        ...current,
        ...parsed,
      }));

    } catch (error) {

      console.error(
        "Failed to load technician settings:",
        error
      );

    }

  }, []);


  // ==========================================
  // UPDATE SETTING
  // ==========================================

  const updateSetting = (name) => {

    setSettings((current) => ({
      ...current,
      [name]: !current[name],
    }));

    setSaved(false);
  };


  // ==========================================
  // SAVE SETTINGS
  // ==========================================

  const handleSave = () => {

    localStorage.setItem(
      "technicianSettings",
      JSON.stringify(settings)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };


  // ==========================================
  // RESET SETTINGS
  // ==========================================

  const handleReset = () => {

    const defaults = {
      notifications: true,
      jobAlerts: true,
      profileVisible: true,
    };

    setSettings(defaults);

    localStorage.removeItem(
      "technicianSettings"
    );

    setSaved(false);
  };


  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("technicianProfile");
    localStorage.removeItem("technicianSettings");
    localStorage.removeItem("clientProfile");

    navigate("/login");
  };


  // ==========================================
  // OPEN PASSWORD MODAL
  // ==========================================

  const openPasswordModal = () => {

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setPasswordError("");
    setPasswordSuccess("");

    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);

    setShowPasswordModal(true);
  };


  // ==========================================
  // CLOSE PASSWORD MODAL
  // ==========================================

  const closePasswordModal = () => {

    if (passwordLoading) {
      return;
    }

    setShowPasswordModal(false);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setPasswordError("");
    setPasswordSuccess("");
  };


  // ==========================================
  // CHANGE PASSWORD
  // ==========================================

  const handleChangePassword = async (event) => {

    event.preventDefault();

    setPasswordError("");
    setPasswordSuccess("");


    // ------------------------------------------
    // VALIDATION
    // ------------------------------------------

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {

      setPasswordError(
        "Please fill in all password fields."
      );

      return;
    }


    if (newPassword.length < 8) {

      setPasswordError(
        "New password must be at least 8 characters."
      );

      return;
    }


    if (newPassword !== confirmPassword) {

      setPasswordError(
        "New password and confirmation password do not match."
      );

      return;
    }


    if (currentPassword === newPassword) {

      setPasswordError(
        "Your new password must be different from your current password."
      );

      return;
    }


    // ------------------------------------------
    // SEND TO BACKEND
    // ------------------------------------------

    try {

      setPasswordLoading(true);


      const response = await api.put(
        "/auth/change-password",
        {
          current_password: currentPassword,
          new_password: newPassword,
        }
      );


      console.log(
        "Password change response:",
        response.data
      );


      setPasswordSuccess(
        response.data?.message ||
        "Password changed successfully."
      );


      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");


      // Keep success visible before closing.
      setTimeout(() => {

        setShowPasswordModal(false);

        setPasswordSuccess("");

      }, 2000);


    } catch (error) {

      console.error(
        "Change password error:",
        error
      );


      const message =
        error?.response?.data?.message ||
        "Unable to change password. Please try again.";


      setPasswordError(message);


    } finally {

      setPasswordLoading(false);

    }

  };


  return (

    <DashboardLayout role="technician">

      <div className="min-h-screen bg-gray-100 p-4 md:p-8">


        {/* =====================================
            HEADER
        ====================================== */}

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


        {/* =====================================
            SETTINGS
        ====================================== */}

        <section
          className="
            max-w-4xl
            mx-auto
            space-y-6
          "
        >


          {/* =====================================
              NOTIFICATIONS
          ====================================== */}

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
              onClick={() =>
                updateSetting("notifications")
              }
            />


            <SettingRow
              title="New Job Alerts"
              description="Get notified when jobs matching your skills become available."
              enabled={settings.jobAlerts}
              onClick={() =>
                updateSetting("jobAlerts")
              }
            />

          </div>


          {/* =====================================
              PROFILE VISIBILITY
          ====================================== */}

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
              onClick={() =>
                updateSetting("profileVisible")
              }
            />

          </div>


          {/* =====================================
              SECURITY
          ====================================== */}

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
              onClick={openPasswordModal}
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
                flex
                items-center
                justify-center
                gap-2
              "
            >

              <Lock size={18} />

              Change Password

            </button>

          </div>


          {/* =====================================
              SAVED MESSAGE
          ====================================== */}

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


          {/* =====================================
              SAVE / RESET
          ====================================== */}

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


          {/* =====================================
              LOGOUT
          ====================================== */}

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


        {/* =====================================
            CHANGE PASSWORD MODAL
        ====================================== */}

        {showPasswordModal && (

          <div
            className="
              fixed
              inset-0
              z-50
              bg-black/70
              backdrop-blur-sm
              flex
              items-center
              justify-center
              p-4
            "
            onMouseDown={(event) => {

              if (
                event.target === event.currentTarget &&
                !passwordLoading
              ) {
                closePasswordModal();
              }

            }}
          >

            <div
              className="
                w-full
                max-w-lg
                bg-white
                rounded-3xl
                shadow-2xl
                overflow-hidden
              "
            >


              {/* MODAL HEADER */}

              <div
                className="
                  bg-black
                  text-white
                  px-6
                  py-5
                  flex
                  items-center
                  justify-between
                "
              >

                <div className="flex items-center gap-3">

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

                    <Lock size={21} />

                  </div>


                  <div>

                    <h2 className="text-xl font-black">

                      Change Password

                    </h2>


                    <p className="text-gray-300 text-sm font-semibold">

                      Secure your Nyũmba Dragon account.

                    </p>

                  </div>

                </div>


                <button
                  type="button"
                  onClick={closePasswordModal}
                  disabled={passwordLoading}
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-white/10
                    hover:bg-red-600
                    flex
                    items-center
                    justify-center
                    transition
                    disabled:opacity-50
                  "
                  aria-label="Close"
                >

                  <X size={20} />

                </button>

              </div>


              {/* MODAL BODY */}

              <form
                onSubmit={handleChangePassword}
                className="p-6"
              >


                {/* ERROR */}

                {passwordError && (

                  <div
                    className="
                      mb-5
                      bg-red-50
                      border
                      border-red-200
                      text-red-800
                      rounded-2xl
                      p-4
                      flex
                      items-start
                      gap-3
                    "
                  >

                    <AlertCircle
                      size={20}
                      className="shrink-0 mt-0.5"
                    />

                    <p className="font-bold text-sm">

                      {passwordError}

                    </p>

                  </div>

                )}


                {/* SUCCESS */}

                {passwordSuccess && (

                  <div
                    className="
                      mb-5
                      bg-green-50
                      border
                      border-green-200
                      text-green-800
                      rounded-2xl
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

                    <p className="font-bold text-sm">

                      {passwordSuccess}

                    </p>

                  </div>

                )}


                {/* CURRENT PASSWORD */}

                <PasswordField
                  label="Current Password"
                  value={currentPassword}
                  onChange={setCurrentPassword}
                  visible={showCurrentPassword}
                  onToggle={() =>
                    setShowCurrentPassword(
                      (current) => !current
                    )
                  }
                  disabled={passwordLoading}
                  placeholder="Enter your current password"
                />


                {/* NEW PASSWORD */}

                <PasswordField
                  label="New Password"
                  value={newPassword}
                  onChange={setNewPassword}
                  visible={showNewPassword}
                  onToggle={() =>
                    setShowNewPassword(
                      (current) => !current
                    )
                  }
                  disabled={passwordLoading}
                  placeholder="Enter your new password"
                />


                {/* CONFIRM PASSWORD */}

                <PasswordField
                  label="Confirm New Password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  visible={showConfirmPassword}
                  onToggle={() =>
                    setShowConfirmPassword(
                      (current) => !current
                    )
                  }
                  disabled={passwordLoading}
                  placeholder="Confirm your new password"
                />


                {/* PASSWORD REQUIREMENTS */}

                <div
                  className="
                    mt-2
                    mb-6
                    bg-gray-50
                    border
                    border-gray-200
                    rounded-2xl
                    p-4
                  "
                >

                  <p
                    className="
                      text-black
                      font-black
                      text-sm
                      mb-2
                    "
                  >

                    Password requirements

                  </p>


                  <ul
                    className="
                      text-gray-600
                      text-sm
                      font-semibold
                      space-y-1
                    "
                  >

                    <li
                      className={
                        newPassword.length >= 8
                          ? "text-green-700"
                          : ""
                      }
                    >

                      • At least 8 characters

                    </li>


                    <li
                      className={
                        newPassword &&
                        newPassword === confirmPassword
                          ? "text-green-700"
                          : ""
                      }
                    >

                      • Passwords must match

                    </li>

                  </ul>

                </div>


                {/* ACTIONS */}

                <div
                  className="
                    flex
                    flex-col-reverse
                    sm:flex-row
                    gap-3
                  "
                >

                  <button
                    type="button"
                    onClick={closePasswordModal}
                    disabled={passwordLoading}
                    className="
                      flex-1
                      border-2
                      border-gray-300
                      text-black
                      font-black
                      py-3
                      rounded-xl
                      hover:bg-gray-100
                      transition
                      disabled:opacity-50
                    "
                  >

                    Cancel

                  </button>


                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="
                      flex-1
                      bg-red-600
                      hover:bg-red-700
                      text-white
                      font-black
                      py-3
                      rounded-xl
                      transition
                      flex
                      items-center
                      justify-center
                      gap-2
                      disabled:opacity-60
                      disabled:cursor-not-allowed
                    "
                  >

                    {passwordLoading ? (

                      <>

                        <Loader2
                          size={19}
                          className="animate-spin"
                        />

                        Changing...

                      </>

                    ) : (

                      <>

                        <ShieldCheck size={19} />

                        Change Password

                      </>

                    )}

                  </button>

                </div>

              </form>

            </div>

          </div>

        )}

      </div>

    </DashboardLayout>

  );
}


/* ==========================================
   SETTING ROW
========================================== */

function SettingRow({
  title,
  description,
  enabled,
  onClick,
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


/* ==========================================
   PASSWORD FIELD
========================================== */

function PasswordField({
  label,
  value,
  onChange,
  visible,
  onToggle,
  disabled,
  placeholder,
}) {

  return (

    <div className="mb-5">

      <label
        className="
          block
          text-black
          font-black
          mb-2
        "
      >

        {label}

      </label>


      <div className="relative">

        <Lock
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-green-700
          "
        />


        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          disabled={disabled}
          placeholder={placeholder}
          autoComplete="new-password"
          className="
            w-full
            border
            border-gray-300
            rounded-xl
            pl-12
            pr-12
            py-3
            text-black
            font-semibold
            outline-none
            focus:border-green-700
            focus:ring-2
            focus:ring-green-100
            transition
            disabled:bg-gray-100
            disabled:cursor-not-allowed
          "
        />


        <button
          type="button"
          onClick={onToggle}
          disabled={disabled}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            w-9
            h-9
            rounded-lg
            text-gray-500
            hover:bg-gray-100
            hover:text-black
            flex
            items-center
            justify-center
            transition
            disabled:opacity-50
          "
          aria-label={
            visible
              ? `Hide ${label}`
              : `Show ${label}`
          }
        >

          {visible ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}

        </button>

      </div>

    </div>

  );
}
