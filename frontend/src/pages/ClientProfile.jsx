import { useEffect, useState } from "react";

import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Edit3,
  Save,
  X,
  CheckCircle2,
  Camera,
  Lock,
  Calendar,
  Briefcase,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";

import DashboardLayout from "../components/dashboard/DashboardLayout";

import api from "../services/api";


export default function ClientProfile() {

  // ==========================================
  // STATE
  // ==========================================

  const [user, setUser] = useState(null);

  const [draft, setDraft] = useState({
    full_name: "",
    email: "",
    phone: "",
    location: "",
  });

  const [editing, setEditing] = useState(false);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [saved, setSaved] = useState(false);

  const [error, setError] = useState("");

  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [changingPassword, setChangingPassword] = useState(false);

  const [passwordMessage, setPasswordMessage] = useState("");

  const [passwordError, setPasswordError] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  // ==========================================
  // LOAD PROFILE FROM BACKEND
  // ==========================================

  useEffect(() => {

    loadProfile();

  }, []);


  async function loadProfile() {

    try {

      setLoading(true);

      setError("");

      const response = await api.get(
        "/auth/profile"
      );

      const authenticatedUser =
        response.data.user;

      setUser(authenticatedUser);

      setDraft({
        full_name:
          authenticatedUser.full_name || "",

        email:
          authenticatedUser.email || "",

        phone:
          authenticatedUser.phone || "",

        location:
          authenticatedUser.location || "",
      });


      // Keep localStorage synchronized
      localStorage.setItem(
        "user",
        JSON.stringify(authenticatedUser)
      );


    } catch (err) {

      console.error(
        "Failed to load profile:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Unable to load your profile."
      );

    } finally {

      setLoading(false);

    }

  }


  // ==========================================
  // UPDATE DRAFT
  // ==========================================

  function updateField(field, value) {

    setDraft((previous) => ({
      ...previous,
      [field]: value,
    }));

  }


  // ==========================================
  // START EDITING
  // ==========================================

  function startEditing() {

    if (!user) {
      return;
    }

    setDraft({
      full_name:
        user.full_name || "",

      email:
        user.email || "",

      phone:
        user.phone || "",

      location:
        user.location || "",
    });

    setSaved(false);

    setError("");

    setEditing(true);

  }


  // ==========================================
  // CANCEL EDITING
  // ==========================================

  function cancelEditing() {

    if (user) {

      setDraft({
        full_name:
          user.full_name || "",

        email:
          user.email || "",

        phone:
          user.phone || "",

        location:
          user.location || "",
      });

    }

    setEditing(false);

    setError("");

  }


  // ==========================================
  // SAVE PROFILE
  // ==========================================

  async function saveProfile(event) {

    event.preventDefault();

    try {

      setSaving(true);

      setError("");

      setSaved(false);


      const response = await api.put(
        "/auth/profile",
        {
          full_name:
            draft.full_name,

          email:
            draft.email,

          phone:
            draft.phone,

          // NOTE:
          // location is not currently
          // supported by the backend
          // User model/profile endpoint.
        }
      );


      const updatedUser =
        response.data.user;


      setUser(updatedUser);


      setDraft({
        full_name:
          updatedUser.full_name || "",

        email:
          updatedUser.email || "",

        phone:
          updatedUser.phone || "",

        location:
          updatedUser.location || "",
      });


      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );


      setEditing(false);

      setSaved(true);


      setTimeout(() => {

        setSaved(false);

      }, 3000);


    } catch (err) {

      console.error(
        "Failed to update profile:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Unable to update your profile."
      );

    } finally {

      setSaving(false);

    }

  }


  // ==========================================
  // PASSWORD MODAL
  // ==========================================

  function openPasswordModal() {

    setPasswordData({
      current_password: "",
      new_password: "",
      confirm_password: "",
    });

    setPasswordMessage("");

    setPasswordError("");

    setShowCurrentPassword(false);

    setShowNewPassword(false);

    setShowConfirmPassword(false);

    setShowPasswordModal(true);

  }


  function closePasswordModal() {

    if (changingPassword) {
      return;
    }

    setShowPasswordModal(false);

    setPasswordData({
      current_password: "",
      new_password: "",
      confirm_password: "",
    });

    setPasswordMessage("");

    setPasswordError("");

  }


  function updatePasswordField(field, value) {

    setPasswordData((previous) => ({
      ...previous,
      [field]: value,
    }));

  }


  async function changePassword(event) {

    event.preventDefault();

    setPasswordMessage("");

    setPasswordError("");


    const {
      current_password,
      new_password,
      confirm_password,
    } = passwordData;


    if (!current_password || !new_password || !confirm_password) {

      setPasswordError(
        "All password fields are required."
      );

      return;

    }


    if (new_password.length < 8) {

      setPasswordError(
        "New password must be at least 8 characters."
      );

      return;

    }


    if (new_password !== confirm_password) {

      setPasswordError(
        "New password and confirmation do not match."
      );

      return;

    }


    if (current_password === new_password) {

      setPasswordError(
        "New password must be different from your current password."
      );

      return;

    }


    try {

      setChangingPassword(true);


      const response = await api.put(
        "/auth/change-password",
        {
          current_password,
          new_password,
        }
      );


      setPasswordMessage(
        response.data.message ||
        "Password changed successfully."
      );


      setPasswordData({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });


      setTimeout(() => {

        setShowPasswordModal(false);

        setPasswordMessage("");

      }, 1800);


    } catch (err) {

      console.error(
        "Failed to change password:",
        err
      );


      setPasswordError(
        err.response?.data?.message ||
        "Unable to change your password."
      );


    } finally {

      setChangingPassword(false);

    }

  }


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <DashboardLayout role="client">

        <div className="
          min-h-screen
          bg-[#F5F5F5]
          flex
          items-center
          justify-center
        ">

          <div className="
            flex
            flex-col
            items-center
            gap-4
          ">

            <Loader2
              size={42}
              className="animate-spin text-green-700"
            />

            <p className="font-black">
              Loading your profile...
            </p>

          </div>

        </div>

      </DashboardLayout>

    );

  }


  // ==========================================
  // ERROR
  // ==========================================

  if (!user) {

    return (

      <DashboardLayout role="client">

        <div className="
          min-h-screen
          bg-[#F5F5F5]
          p-6
          flex
          items-center
          justify-center
        ">

          <div className="
            max-w-lg
            w-full
            bg-white
            border
            border-red-200
            rounded-3xl
            p-8
            text-center
          ">

            <AlertCircle
              size={48}
              className="text-red-600 mx-auto mb-4"
            />

            <h1 className="
              text-2xl
              font-black
            ">

              Unable to load profile

            </h1>

            <p className="
              text-gray-600
              mt-2
              font-medium
            ">

              {error || "Please log in again."}

            </p>


            <button
              onClick={loadProfile}
              className="
                mt-6
                bg-black
                text-white
                px-6
                py-3
                rounded-xl
                font-black
              "
            >

              Try Again

            </button>

          </div>

        </div>

      </DashboardLayout>

    );

  }


  // ==========================================
  // PROFILE VALUES
  // ==========================================

  const fullName =
    user.full_name || "Nyũmba Client";

  const email =
    user.email || "Not provided";

  const phone =
    user.phone || "Not provided";

  const age =
    user.age ?? "Not provided";

  const role =
    user.role || "CLIENT";

  const location =
    user.location || "Not provided";


  const accountType =
    role === "TECHNICIAN"
      ? "Technician Account"
      : role === "ADMIN"
      ? "Administrator Account"
      : "Client Account";


  // ==========================================
  // INITIALS
  // ==========================================

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();


  // ==========================================
  // UI
  // ==========================================

  return (

    <DashboardLayout role="client">

      <div className="
        min-h-screen
        bg-[#F5F5F5]
        text-black
        p-4
        md:p-6
        lg:p-8
      ">


        {/* =====================================
            HEADER
        ====================================== */}

        <section className="
          bg-black
          text-white
          rounded-3xl
          p-6
          md:p-8
          mb-6
        ">

          <div className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-6
          ">

            <div>

              <div className="
                inline-flex
                items-center
                gap-2
                bg-white/10
                px-4
                py-2
                rounded-full
                mb-4
              ">

                <User
                  size={15}
                  className="text-green-500"
                />

                <span className="
                  text-green-400
                  text-xs
                  font-black
                  tracking-wide
                ">

                  {role === "TECHNICIAN"
                    ? "TECHNICIAN ACCOUNT"
                    : "CLIENT ACCOUNT"}

                </span>

              </div>


              <h1 className="
                text-3xl
                md:text-4xl
                font-black
              ">

                My Profile

              </h1>


              <p className="
                text-gray-300
                mt-2
                font-medium
              ">

                Manage your personal information and account details.

              </p>

            </div>


            {!editing ? (

              <button
                onClick={startEditing}
                className="
                  bg-white
                  text-black
                  hover:bg-green-500
                  px-6
                  py-3
                  rounded-xl
                  font-black
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition
                "
              >

                <Edit3 size={18} />

                Edit Profile

              </button>

            ) : (

              <button
                onClick={cancelEditing}
                disabled={saving}
                className="
                  bg-white/10
                  hover:bg-red-600
                  text-white
                  px-6
                  py-3
                  rounded-xl
                  font-black
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition
                "
              >

                <X size={18} />

                Cancel

              </button>

            )}

          </div>

        </section>


        {/* =====================================
            SUCCESS
        ====================================== */}

        {saved && (

          <div className="
            mb-6
            bg-green-50
            border
            border-green-200
            text-green-800
            rounded-2xl
            px-5
            py-4
            flex
            items-center
            gap-3
            font-bold
          ">

            <CheckCircle2 size={20} />

            Profile updated successfully.

          </div>

        )}


        {/* =====================================
            ERROR
        ====================================== */}

        {error && (

          <div className="
            mb-6
            bg-red-50
            border
            border-red-200
            text-red-800
            rounded-2xl
            px-5
            py-4
            flex
            items-center
            gap-3
            font-bold
          ">

            <AlertCircle size={20} />

            {error}

          </div>

        )}


        <div className="
          grid
          lg:grid-cols-3
          gap-6
        ">


          {/* =====================================
              PROFILE SUMMARY
          ====================================== */}

          <section className="
            bg-white
            border
            border-gray-200
            rounded-3xl
            p-6
          ">

            <div className="
              flex
              flex-col
              items-center
              text-center
            ">


              {/* AVATAR */}

              <div className="relative">

                <div className="
                  w-28
                  h-28
                  rounded-full
                  bg-black
                  text-white
                  flex
                  items-center
                  justify-center
                  text-3xl
                  font-black
                  border-4
                  border-white
                  shadow-lg
                ">

                  {initials}

                </div>


                <button
                  type="button"
                  className="
                    absolute
                    bottom-0
                    right-0
                    w-10
                    h-10
                    rounded-full
                    bg-green-600
                    text-white
                    flex
                    items-center
                    justify-center
                    border-4
                    border-white
                  "
                  title="Profile photo"
                >

                  <Camera size={17} />

                </button>

              </div>


              {/* NAME */}

              <h2 className="
                text-2xl
                font-black
                mt-5
              ">

                {fullName}

              </h2>


              <p className="
                text-green-700
                font-black
                mt-1
              ">

                {accountType}

              </p>


              <p className="
                text-gray-600
                font-semibold
                mt-1
              ">

                {phone}

              </p>


              {/* VERIFIED */}

              <div className="mt-6 w-full">

                <div className="
                  bg-green-50
                  border
                  border-green-200
                  rounded-2xl
                  p-4
                  flex
                  items-center
                  gap-3
                  text-left
                ">

                  <ShieldCheck
                    size={24}
                    className="text-green-700 shrink-0"
                  />

                  <div>

                    <p className="
                      font-black
                      text-green-800
                    ">

                      Account Active

                    </p>

                    <p className="
                      text-sm
                      text-green-700
                      mt-1
                    ">

                      Your account is active and protected.

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* =====================================
              PERSONAL INFORMATION
          ====================================== */}

          <section className="
            lg:col-span-2
            bg-white
            border
            border-gray-200
            rounded-3xl
            p-6
            md:p-8
          ">


            <div className="
              flex
              items-center
              gap-3
              mb-7
            ">

              <div className="
                w-11
                h-11
                rounded-xl
                bg-black
                text-white
                flex
                items-center
                justify-center
              ">

                <User size={20} />

              </div>


              <div>

                <h2 className="
                  text-2xl
                  font-black
                ">

                  Personal Information

                </h2>


                <p className="
                  text-gray-600
                  font-medium
                ">

                  Information from your Nyũmba Dragon 888 account.

                </p>

              </div>

            </div>


            <form onSubmit={saveProfile}>


              <div className="
                grid
                md:grid-cols-2
                gap-5
              ">


                {/* FULL NAME */}

                <ProfileField
                  label="Full Name"
                  value={
                    editing
                      ? draft.full_name
                      : fullName
                  }
                  icon={<User size={18} />}
                  disabled={!editing || saving}
                  onChange={(value) =>
                    updateField(
                      "full_name",
                      value
                    )
                  }
                />


                {/* EMAIL */}

                <ProfileField
                  label="Email Address"
                  value={
                    editing
                      ? draft.email
                      : email
                  }
                  icon={<Mail size={18} />}
                  disabled={!editing || saving}
                  onChange={(value) =>
                    updateField(
                      "email",
                      value
                    )
                  }
                />


                {/* PHONE */}

                <ProfileField
                  label="Phone Number"
                  value={
                    editing
                      ? draft.phone
                      : phone
                  }
                  icon={<Phone size={18} />}
                  disabled={!editing || saving}
                  onChange={(value) =>
                    updateField(
                      "phone",
                      value
                    )
                  }
                />


                {/* AGE */}

                <ProfileField
                  label="Age"
                  value={age}
                  icon={<Calendar size={18} />}
                  disabled={true}
                />


                {/* ACCOUNT TYPE */}

                <ProfileField
                  label="Account Type"
                  value={accountType}
                  icon={<Briefcase size={18} />}
                  disabled={true}
                />


                {/* LOCATION */}

                <ProfileField
                  label="Location"
                  value={location}
                  icon={<MapPin size={18} />}
                  disabled={true}
                />


                {/* PASSWORD */}

                <ProfileField
                  label="Password"
                  value="••••••••••••"
                  icon={<Lock size={18} />}
                  disabled={true}
                />

              </div>


              {/* SAVE BUTTONS */}

              {editing && (

                <div className="
                  mt-8
                  flex
                  flex-col
                  sm:flex-row
                  gap-3
                ">

                  <button
                    type="submit"
                    disabled={saving}
                    className="
                      bg-red-600
                      hover:bg-red-700
                      disabled:bg-red-300
                      text-white
                      px-7
                      py-3
                      rounded-xl
                      font-black
                      flex
                      items-center
                      justify-center
                      gap-2
                      transition
                    "
                  >

                    {saving ? (

                      <>
                        <Loader2
                          size={18}
                          className="animate-spin"
                        />

                        Saving...

                      </>

                    ) : (

                      <>
                        <Save size={18} />

                        Save Changes
                      </>

                    )}

                  </button>


                  <button
                    type="button"
                    onClick={cancelEditing}
                    disabled={saving}
                    className="
                      bg-gray-100
                      hover:bg-gray-200
                      text-black
                      px-7
                      py-3
                      rounded-xl
                      font-black
                      flex
                      items-center
                      justify-center
                      gap-2
                    "
                  >

                    <X size={18} />

                    Cancel

                  </button>

                </div>

              )}

            </form>

          </section>

        </div>


        {/* =====================================
            SECURITY
        ====================================== */}

        <section className="
          mt-6
          bg-black
          text-white
          rounded-3xl
          p-6
          md:p-8
        ">

          <div className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-5
          ">

            <div className="
              flex
              items-start
              gap-4
            ">

              <div className="
                w-11
                h-11
                rounded-xl
                bg-white/10
                flex
                items-center
                justify-center
                shrink-0
              ">

                <Lock
                  size={21}
                  className="text-green-500"
                />

              </div>


              <div>

                <h2 className="text-xl font-black">

                  Account Security

                </h2>


                <p className="
                  text-gray-300
                  mt-1
                  font-medium
                ">

                  Your password is securely encrypted and never displayed.

                </p>

              </div>

            </div>


            <button
              type="button"
              onClick={openPasswordModal}
              className="
                bg-green-700
                hover:bg-green-800
                text-white
                px-6
                py-3
                rounded-xl
                font-black
                transition
              "
            >

              Change Password

            </button>

          </div>

        </section>

      </div>


      {/* =====================================
          CHANGE PASSWORD MODAL
      ====================================== */}

      {showPasswordModal && (

        <div className="
          fixed
          inset-0
          z-50
          bg-black/60
          backdrop-blur-sm
          flex
          items-center
          justify-center
          p-4
        ">

          <div className="
            w-full
            max-w-lg
            bg-white
            rounded-3xl
            shadow-2xl
            overflow-hidden
          ">


            {/* MODAL HEADER */}

            <div className="
              bg-black
              text-white
              p-6
              flex
              items-center
              justify-between
            ">

              <div className="
                flex
                items-center
                gap-3
              ">

                <div className="
                  w-11
                  h-11
                  rounded-xl
                  bg-white/10
                  flex
                  items-center
                  justify-center
                ">

                  <Lock
                    size={21}
                    className="text-green-500"
                  />

                </div>


                <div>

                  <h2 className="
                    text-xl
                    font-black
                  ">

                    Change Password

                  </h2>

                  <p className="
                    text-gray-300
                    text-sm
                    mt-1
                  ">

                    Protect your account with a new password.

                  </p>

                </div>

              </div>


              <button
                type="button"
                onClick={closePasswordModal}
                disabled={changingPassword}
                className="
                  w-9
                  h-9
                  rounded-full
                  bg-white/10
                  hover:bg-red-600
                  flex
                  items-center
                  justify-center
                  transition
                "
              >

                <X size={18} />

              </button>

            </div>


            {/* MODAL BODY */}

            <form
              onSubmit={changePassword}
              className="p-6"
            >


              {/* SUCCESS */}

              {passwordMessage && (

                <div className="
                  mb-5
                  bg-green-50
                  border
                  border-green-200
                  text-green-800
                  rounded-2xl
                  px-4
                  py-3
                  flex
                  items-center
                  gap-3
                  font-bold
                ">

                  <CheckCircle2 size={19} />

                  {passwordMessage}

                </div>

              )}


              {/* ERROR */}

              {passwordError && (

                <div className="
                  mb-5
                  bg-red-50
                  border
                  border-red-200
                  text-red-800
                  rounded-2xl
                  px-4
                  py-3
                  flex
                  items-center
                  gap-3
                  font-bold
                ">

                  <AlertCircle size={19} />

                  {passwordError}

                </div>

              )}


              <div className="space-y-5">


                {/* CURRENT PASSWORD */}

                <PasswordField
                  label="Current Password"
                  value={
                    passwordData.current_password
                  }
                  visible={
                    showCurrentPassword
                  }
                  disabled={changingPassword}
                  onChange={(value) =>
                    updatePasswordField(
                      "current_password",
                      value
                    )
                  }
                  onToggle={() =>
                    setShowCurrentPassword(
                      (previous) => !previous
                    )
                  }
                />


                {/* NEW PASSWORD */}

                <PasswordField
                  label="New Password"
                  value={
                    passwordData.new_password
                  }
                  visible={
                    showNewPassword
                  }
                  disabled={changingPassword}
                  onChange={(value) =>
                    updatePasswordField(
                      "new_password",
                      value
                    )
                  }
                  onToggle={() =>
                    setShowNewPassword(
                      (previous) => !previous
                    )
                  }
                />


                {/* CONFIRM PASSWORD */}

                <PasswordField
                  label="Confirm New Password"
                  value={
                    passwordData.confirm_password
                  }
                  visible={
                    showConfirmPassword
                  }
                  disabled={changingPassword}
                  onChange={(value) =>
                    updatePasswordField(
                      "confirm_password",
                      value
                    )
                  }
                  onToggle={() =>
                    setShowConfirmPassword(
                      (previous) => !previous
                    )
                  }
                />

              </div>


              {/* PASSWORD RULE */}

              <div className="
                mt-5
                bg-gray-50
                border
                border-gray-200
                rounded-2xl
                p-4
              ">

                <p className="
                  text-sm
                  text-gray-700
                  font-semibold
                ">

                  Password must contain at least 8 characters.

                </p>

              </div>


              {/* ACTIONS */}

              <div className="
                mt-6
                flex
                flex-col-reverse
                sm:flex-row
                gap-3
                justify-end
              ">

                <button
                  type="button"
                  onClick={closePasswordModal}
                  disabled={changingPassword}
                  className="
                    bg-gray-100
                    hover:bg-gray-200
                    text-black
                    px-6
                    py-3
                    rounded-xl
                    font-black
                    transition
                  "
                >

                  Cancel

                </button>


                <button
                  type="submit"
                  disabled={changingPassword}
                  className="
                    bg-green-700
                    hover:bg-green-800
                    disabled:bg-green-300
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    font-black
                    flex
                    items-center
                    justify-center
                    gap-2
                    transition
                  "
                >

                  {changingPassword ? (

                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />

                      Updating...

                    </>

                  ) : (

                    <>
                      <Lock size={18} />

                      Update Password

                    </>

                  )}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}


    </DashboardLayout>

  );

}


// ==========================================
// PASSWORD FIELD
// ==========================================

function PasswordField({
  label,
  value,
  visible,
  disabled,
  onChange,
  onToggle,
}) {

  return (

    <div>

      <label className="
        block
        font-black
        mb-2
      ">

        {label}

      </label>


      <div className="relative">

        <div className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-green-700
        ">

          <Lock size={18} />

        </div>


        <input
          type={
            visible
              ? "text"
              : "password"
          }
          value={value}
          disabled={disabled}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          autoComplete="new-password"
          className="
            w-full
            border
            border-gray-300
            rounded-xl
            pl-12
            pr-12
            py-3
            font-semibold
            outline-none
            transition
            focus:border-green-700
            focus:ring-2
            focus:ring-green-100
            disabled:bg-gray-50
          "
        />


        <button
          type="button"
          onClick={onToggle}
          disabled={disabled}
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-gray-500
            hover:text-black
          "
          aria-label={
            visible
              ? "Hide password"
              : "Show password"
          }
        >

          {visible ? (
            <EyeOff size={19} />
          ) : (
            <Eye size={19} />
          )}

        </button>

      </div>

    </div>

  );

}


// ==========================================
// PROFILE FIELD
// ==========================================

function ProfileField({
  label,
  value,
  icon,
  disabled,
  onChange,
}) {

  return (

    <div>

      <label className="
        block
        font-black
        mb-2
      ">

        {label}

      </label>


      <div className="relative">

        <div className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-green-700
          pointer-events-none
        ">

          {icon}

        </div>


        <input
          value={value ?? ""}
          disabled={disabled}
          onChange={(event) =>
            onChange?.(
              event.target.value
            )
          }
          className={`
            w-full
            border
            rounded-xl
            pl-12
            pr-4
            py-3
            font-semibold
            outline-none
            transition

            ${
              disabled
                ? "bg-gray-50 border-gray-200 text-gray-700"
                : "bg-white border-gray-300 focus:border-green-700 focus:ring-2 focus:ring-green-100"
            }
          `}
        />

      </div>

    </div>

  );

}
