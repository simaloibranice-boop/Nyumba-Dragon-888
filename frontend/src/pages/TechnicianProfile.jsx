import { useState } from "react";

import {
  User,
  Phone,
  MapPin,
  Briefcase,
  Star,
  CheckCircle,
  Save,
  RotateCcw,
  ArrowLeft,
  Camera
} from "lucide-react";

import { Link } from "react-router-dom";

import DashboardLayout from "../components/dashboard/DashboardLayout";


export default function TechnicianProfile() {

  const [profile, setProfile] = useState({
    name: "John Mwangi",
    phone: "+254 712 345 678",
    specialization: "Certified Electrician",
    location: "Nairobi, Kenya"
  });


  const [saved, setSaved] = useState(false);


  const originalProfile = {
    name: "John Mwangi",
    phone: "+254 712 345 678",
    specialization: "Certified Electrician",
    location: "Nairobi, Kenya"
  };


  const handleChange = (event) => {

    const { name, value } = event.target;

    setProfile((current) => ({
      ...current,
      [name]: value
    }));

    setSaved(false);
  };


  const handleSave = (event) => {

    event.preventDefault();

    localStorage.setItem(
      "technicianProfile",
      JSON.stringify(profile)
    );

    setSaved(true);
  };


  const handleReset = () => {

    setProfile(originalProfile);

    localStorage.removeItem("technicianProfile");

    setSaved(false);
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
                  <User size={24} />
                </div>


                <span
                  className="
                    text-green-400
                    font-black
                    text-sm
                    uppercase
                  "
                >
                  Professional Account
                </span>

              </div>


              <h1
                className="
                  text-2xl
                  md:text-4xl
                  font-black
                "
              >
                My Profile
              </h1>


              <p
                className="
                  text-gray-300
                  font-bold
                  mt-2
                "
              >
                Manage your professional information and public profile.
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


        <div
          className="
            grid
            lg:grid-cols-3
            gap-6
          "
        >

          {/* PROFILE CARD */}

          <section
            className="
              bg-white
              rounded-3xl
              border
              border-gray-200
              p-6
              shadow-sm
            "
          >

            <div className="flex flex-col items-center text-center">

              <div className="relative">

                <img
                  src="/images/electrician.jpg"
                  alt="Technician"
                  className="
                    w-32
                    h-32
                    rounded-3xl
                    object-cover
                    border-4
                    border-green-600
                  "
                />


                <button
                  type="button"
                  className="
                    absolute
                    bottom-2
                    right-2
                    w-10
                    h-10
                    bg-black
                    text-white
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    hover:bg-green-600
                    transition
                  "
                  onClick={() => alert("Photo upload will be connected to the backend next.")}
                >

                  <Camera size={18} />

                </button>

              </div>


              <h2
                className="
                  text-black
                  font-black
                  text-2xl
                  mt-5
                "
              >
                {profile.name}
              </h2>


              <p
                className="
                  text-green-700
                  font-black
                  mt-1
                "
              >
                {profile.specialization}
              </p>


              <p
                className="
                  text-black
                  font-bold
                  mt-1
                "
              >
                {profile.location}
              </p>

            </div>


            <div
              className="
                grid
                grid-cols-2
                gap-4
                mt-7
              "
            >

              <div
                className="
                  bg-gray-100
                  rounded-2xl
                  p-4
                  text-center
                "
              >

                <Star
                  className="
                    mx-auto
                    text-yellow-600
                  "
                  size={22}
                />

                <p
                  className="
                    text-black
                    font-black
                    text-xl
                    mt-2
                  "
                >
                  4.9
                </p>

                <p
                  className="
                    text-black
                    font-bold
                    text-sm
                  "
                >
                  Rating
                </p>

              </div>


              <div
                className="
                  bg-gray-100
                  rounded-2xl
                  p-4
                  text-center
                "
              >

                <CheckCircle
                  className="
                    mx-auto
                    text-green-700
                  "
                  size={22}
                />

                <p
                  className="
                    text-black
                    font-black
                    text-xl
                    mt-2
                  "
                >
                  146
                </p>

                <p
                  className="
                    text-black
                    font-bold
                    text-sm
                  "
                >
                  Completed
                </p>

              </div>

            </div>

          </section>


          {/* EDIT FORM */}

          <section
            className="
              lg:col-span-2
              bg-white
              rounded-3xl
              border
              border-gray-200
              p-6
              md:p-8
              shadow-sm
            "
          >

            <div className="mb-7">

              <h2
                className="
                  text-black
                  font-black
                  text-2xl
                "
              >
                Professional Information
              </h2>


              <p
                className="
                  text-black
                  font-bold
                  mt-1
                "
              >
                Keep your information accurate so customers know who they are hiring.
              </p>

            </div>


            <form
              onSubmit={handleSave}
              className="space-y-6"
            >

              {/* NAME */}

              <div>

                <label
                  className="
                    block
                    text-black
                    font-black
                    mb-2
                  "
                >
                  Full Name
                </label>


                <div className="relative">

                  <User
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-black
                    "
                    size={19}
                  />


                  <input
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="
                      w-full
                      bg-white
                      border-2
                      border-gray-300
                      text-black
                      font-bold
                      rounded-xl
                      pl-12
                      pr-4
                      py-3
                      outline-none
                      focus:border-green-600
                    "
                  />

                </div>

              </div>


              {/* PHONE */}

              <div>

                <label
                  className="
                    block
                    text-black
                    font-black
                    mb-2
                  "
                >
                  Phone Number
                </label>


                <div className="relative">

                  <Phone
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-black
                    "
                    size={19}
                  />


                  <input
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    className="
                      w-full
                      bg-white
                      border-2
                      border-gray-300
                      text-black
                      font-bold
                      rounded-xl
                      pl-12
                      pr-4
                      py-3
                      outline-none
                      focus:border-green-600
                    "
                  />

                </div>

              </div>


              {/* SPECIALIZATION */}

              <div>

                <label
                  className="
                    block
                    text-black
                    font-black
                    mb-2
                  "
                >
                  Specialization
                </label>


                <div className="relative">

                  <Briefcase
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-black
                    "
                    size={19}
                  />


                  <input
                    name="specialization"
                    value={profile.specialization}
                    onChange={handleChange}
                    className="
                      w-full
                      bg-white
                      border-2
                      border-gray-300
                      text-black
                      font-bold
                      rounded-xl
                      pl-12
                      pr-4
                      py-3
                      outline-none
                      focus:border-green-600
                    "
                  />

                </div>

              </div>


              {/* LOCATION */}

              <div>

                <label
                  className="
                    block
                    text-black
                    font-black
                    mb-2
                  "
                >
                  Service Location
                </label>


                <div className="relative">

                  <MapPin
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-black
                    "
                    size={19}
                  />


                  <input
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                    className="
                      w-full
                      bg-white
                      border-2
                      border-gray-300
                      text-black
                      font-bold
                      rounded-xl
                      pl-12
                      pr-4
                      py-3
                      outline-none
                      focus:border-green-600
                    "
                  />

                </div>

              </div>


              {/* SUCCESS MESSAGE */}

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
                  "
                >
                  ✓ Profile saved successfully.
                </div>

              )}


              {/* BUTTONS */}

              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  gap-3
                  pt-2
                "
              >

                <button
                  type="submit"
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

                  Save Profile

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

            </form>

          </section>

        </div>


        {/* QUICK NAVIGATION */}

        <section
          className="
            bg-white
            rounded-3xl
            border
            border-gray-200
            p-6
            mt-6
          "
        >

          <h2
            className="
              text-black
              font-black
              text-xl
              mb-5
            "
          >
            Technician Workspace
          </h2>


          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-4
              gap-3
            "
          >

            <Link
              to="/technician/jobs"
              className="
                bg-gray-100
                text-black
                font-black
                p-4
                rounded-xl
                text-center
                hover:bg-green-100
              "
            >
              Jobs
            </Link>


            <Link
              to="/technician/earnings"
              className="
                bg-gray-100
                text-black
                font-black
                p-4
                rounded-xl
                text-center
                hover:bg-green-100
              "
            >
              Earnings
            </Link>


            <Link
              to="/technician/analytics"
              className="
                bg-gray-100
                text-black
                font-black
                p-4
                rounded-xl
                text-center
                hover:bg-green-100
              "
            >
              Analytics
            </Link>


            <Link
              to="/technician/settings"
              className="
                bg-gray-100
                text-black
                font-black
                p-4
                rounded-xl
                text-center
                hover:bg-green-100
              "
            >
              Settings
            </Link>

          </div>

        </section>

      </div>

    </DashboardLayout>

  );

}
