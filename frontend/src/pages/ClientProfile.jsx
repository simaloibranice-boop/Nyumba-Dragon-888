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
} from "lucide-react";

import DashboardLayout from "../components/dashboard/DashboardLayout";

export default function ClientProfile() {
  const storedUser = localStorage.getItem("user");

  const user = storedUser ? JSON.parse(storedUser) : {};

  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: user.username || user.name || "Nyũmba Client",
    email: user.email || "",
    phone: user.phone || "",
    location: user.location || "Nairobi, Kenya",
  });

  const [draft, setDraft] = useState(profile);

  useEffect(() => {
    const savedProfile = localStorage.getItem("clientProfile");

    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfile(parsed);
      setDraft(parsed);
    }
  }, []);

  function update(field, value) {
    setDraft((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function startEditing() {
    setDraft(profile);
    setEditing(true);
    setSaved(false);
  }

  function cancelEditing() {
    setDraft(profile);
    setEditing(false);
  }

  function saveProfile(event) {
    event.preventDefault();

    setProfile(draft);

    localStorage.setItem(
      "clientProfile",
      JSON.stringify(draft)
    );

    const currentUser = localStorage.getItem("user");

    if (currentUser) {
      const parsedUser = JSON.parse(currentUser);

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...parsedUser,
          username: draft.name,
          name: draft.name,
          email: draft.email,
          phone: draft.phone,
          location: draft.location,
        })
      );
    }

    setEditing(false);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  }

  const initials = profile.name
    ? profile.name
        .split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "ND";

  return (
    <DashboardLayout role="client">
      <div className="min-h-screen bg-[#F5F5F5] text-black p-4 md:p-6 lg:p-8">

        {/* HEADER */}

        <section className="bg-black text-white rounded-3xl p-6 md:p-8 mb-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-4">
                <User size={15} className="text-green-500" />

                <span className="text-green-400 text-xs font-black tracking-wide">
                  CLIENT ACCOUNT
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-black">
                My Profile
              </h1>

              <p className="text-gray-300 mt-2 font-medium">
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


        {/* SUCCESS */}

        {saved && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 rounded-2xl px-5 py-4 flex items-center gap-3 font-bold">
            <CheckCircle2 size={20} />
            Profile updated successfully.
          </div>
        )}


        <div className="grid lg:grid-cols-3 gap-6">

          {/* PROFILE SUMMARY */}

          <section className="bg-white border border-gray-200 rounded-3xl p-6">

            <div className="flex flex-col items-center text-center">

              <div className="relative">

                <div className="w-28 h-28 rounded-full bg-black text-white flex items-center justify-center text-3xl font-black border-4 border-white shadow-lg">
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

              <h2 className="text-2xl font-black mt-5">
                {profile.name}
              </h2>

              <p className="text-gray-500 font-medium mt-1">
                Client Account
              </p>


              <div className="mt-6 w-full">

                <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3 text-left">

                  <ShieldCheck
                    size={24}
                    className="text-green-700 shrink-0"
                  />

                  <div>
                    <p className="font-black text-green-800">
                      Verified Account
                    </p>

                    <p className="text-sm text-green-700 mt-1">
                      Your account is active and protected.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* DETAILS */}

          <section className="lg:col-span-2 bg-white border border-gray-200 rounded-3xl p-6 md:p-8">

            <div className="flex items-center gap-3 mb-7">

              <div className="w-11 h-11 rounded-xl bg-black text-white flex items-center justify-center">
                <User size={20} />
              </div>

              <div>
                <h2 className="text-2xl font-black">
                  Personal Information
                </h2>

                <p className="text-gray-600 font-medium">
                  Keep your contact information up to date.
                </p>
              </div>

            </div>


            <form onSubmit={saveProfile}>

              <div className="grid md:grid-cols-2 gap-5">

                <ProfileField
                  label="Full Name"
                  value={editing ? draft.name : profile.name}
                  icon={<User size={18} />}
                  disabled={!editing}
                  onChange={(value) => update("name", value)}
                />

                <ProfileField
                  label="Phone Number"
                  value={editing ? draft.phone : profile.phone}
                  icon={<Phone size={18} />}
                  disabled={!editing}
                  onChange={(value) => update("phone", value)}
                />

                <ProfileField
                  label="Email Address"
                  value={editing ? draft.email : profile.email}
                  icon={<Mail size={18} />}
                  disabled={!editing}
                  onChange={(value) => update("email", value)}
                />

                <ProfileField
                  label="Location"
                  value={editing ? draft.location : profile.location}
                  icon={<MapPin size={18} />}
                  disabled={!editing}
                  onChange={(value) => update("location", value)}
                />

              </div>


              {editing && (
                <div className="mt-8 flex flex-col sm:flex-row gap-3">

                  <button
                    type="submit"
                    className="
                      bg-red-600
                      hover:bg-red-700
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
                    <Save size={18} />
                    Save Changes
                  </button>

                  <button
                    type="button"
                    onClick={cancelEditing}
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


        {/* SECURITY */}

        <section className="mt-6 bg-black text-white rounded-3xl p-6 md:p-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div className="flex items-start gap-4">

              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Lock size={21} className="text-green-500" />
              </div>

              <div>
                <h2 className="text-xl font-black">
                  Account Security
                </h2>

                <p className="text-gray-300 mt-1 font-medium">
                  Keep your Nyũmba Dragon 888 account protected.
                </p>
              </div>

            </div>

            <button
              type="button"
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
    </DashboardLayout>
  );
}


function ProfileField({
  label,
  value,
  icon,
  disabled,
  onChange,
}) {
  return (
    <div>

      <label className="block font-black mb-2">
        {label}
      </label>

      <div className="relative">

        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-700">
          {icon}
        </div>

        <input
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
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
