import { useEffect, useState } from "react";
import {
  Settings,
  Bell,
  ShieldCheck,
  Lock,
  Eye,
  Mail,
  Smartphone,
  Save,
  CheckCircle2,
  Trash2,
  ChevronRight,
} from "lucide-react";

import DashboardLayout from "../components/dashboard/DashboardLayout";

const defaultSettings = {
  notifications: true,
  emailUpdates: true,
  smsUpdates: true,
  requestUpdates: true,
  securityAlerts: true,
  profileVisibility: true,
};

export default function ClientSettings() {

  const [settings, setSettings] = useState(defaultSettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem("clientSettings");

    if (savedSettings) {
      setSettings({
        ...defaultSettings,
        ...JSON.parse(savedSettings),
      });
    }
  }, []);

  function toggle(field) {
    setSettings((previous) => ({
      ...previous,
      [field]: !previous[field],
    }));

    setSaved(false);
  }

  function saveSettings() {
    localStorage.setItem(
      "clientSettings",
      JSON.stringify(settings)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  }

  return (
    <DashboardLayout role="client">

      <div className="min-h-screen bg-[#F5F5F5] text-black p-4 md:p-6 lg:p-8">

        {/* HEADER */}

        <section className="bg-black text-white rounded-3xl p-6 md:p-8 mb-6">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <Settings
                size={23}
                className="text-green-500"
              />
            </div>

            <div>

              <div className="text-green-400 text-xs font-black tracking-wider">
                ACCOUNT CONTROL
              </div>

              <h1 className="text-3xl md:text-4xl font-black mt-1">
                Settings
              </h1>

              <p className="text-gray-300 mt-2 font-medium">
                Manage notifications, privacy and account security.
              </p>

            </div>

          </div>

        </section>


        {/* SUCCESS */}

        {saved && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 rounded-2xl px-5 py-4 flex items-center gap-3 font-bold">
            <CheckCircle2 size={20} />
            Settings saved successfully.
          </div>
        )}


        <div className="grid lg:grid-cols-3 gap-6">

          {/* NOTIFICATIONS */}

          <section className="lg:col-span-2 bg-white border border-gray-200 rounded-3xl p-6 md:p-8">

            <div className="flex items-center gap-3 mb-7">

              <div className="w-11 h-11 rounded-xl bg-black text-white flex items-center justify-center">
                <Bell size={20} />
              </div>

              <div>
                <h2 className="text-2xl font-black">
                  Notifications
                </h2>

                <p className="text-gray-600 font-medium">
                  Choose how Nyũmba Dragon keeps you informed.
                </p>
              </div>

            </div>


            <div className="space-y-3">

              <SettingRow
                icon={<Bell size={19} />}
                title="Push Notifications"
                description="Receive important updates about your account and requests."
                enabled={settings.notifications}
                onToggle={() => toggle("notifications")}
              />

              <SettingRow
                icon={<Mail size={19} />}
                title="Email Updates"
                description="Receive service, booking and account updates by email."
                enabled={settings.emailUpdates}
                onToggle={() => toggle("emailUpdates")}
              />

              <SettingRow
                icon={<Smartphone size={19} />}
                title="SMS Updates"
                description="Receive important request and payment notifications by SMS."
                enabled={settings.smsUpdates}
                onToggle={() => toggle("smsUpdates")}
              />

              <SettingRow
                icon={<CheckCircle2 size={19} />}
                title="Request Updates"
                description="Get notified when your service request changes status."
                enabled={settings.requestUpdates}
                onToggle={() => toggle("requestUpdates")}
              />

            </div>

          </section>


          {/* SECURITY CARD */}

          <section className="bg-white border border-gray-200 rounded-3xl p-6">

            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
              <ShieldCheck size={23} />
            </div>

            <h2 className="text-2xl font-black mt-5">
              Security
            </h2>

            <p className="text-gray-600 mt-2 font-medium">
              Your account protection and security preferences.
            </p>


            <div className="mt-6 space-y-3">

              <button
                type="button"
                className="
                  w-full
                  flex
                  items-center
                  justify-between
                  gap-3
                  bg-gray-50
                  hover:bg-gray-100
                  rounded-xl
                  px-4
                  py-4
                  font-black
                  transition
                "
              >

                <span className="flex items-center gap-3">
                  <Lock size={18} />
                  Change Password
                </span>

                <ChevronRight size={18} />

              </button>


              <SettingRow
                icon={<ShieldCheck size={19} />}
                title="Security Alerts"
                description="Receive alerts about important account activity."
                enabled={settings.securityAlerts}
                onToggle={() => toggle("securityAlerts")}
              />

            </div>

          </section>


          {/* PRIVACY */}

          <section className="lg:col-span-2 bg-white border border-gray-200 rounded-3xl p-6 md:p-8">

            <div className="flex items-center gap-3 mb-7">

              <div className="w-11 h-11 rounded-xl bg-black text-white flex items-center justify-center">
                <Eye size={20} />
              </div>

              <div>
                <h2 className="text-2xl font-black">
                  Privacy
                </h2>

                <p className="text-gray-600 font-medium">
                  Control what professionals can see about your account.
                </p>
              </div>

            </div>


            <SettingRow
              icon={<Eye size={19} />}
              title="Profile Visibility"
              description="Allow assigned professionals to see relevant client information."
              enabled={settings.profileVisibility}
              onToggle={() => toggle("profileVisibility")}
            />

          </section>


          {/* DANGER ZONE */}

          <section className="bg-white border border-red-200 rounded-3xl p-6">

            <div className="w-12 h-12 rounded-xl bg-red-100 text-red-700 flex items-center justify-center">
              <Trash2 size={22} />
            </div>

            <h2 className="text-xl font-black mt-5">
              Account Actions
            </h2>

            <p className="text-gray-600 mt-2 font-medium">
              Manage sensitive account actions.
            </p>

            <button
              type="button"
              className="
                mt-6
                w-full
                border
                border-red-200
                text-red-700
                hover:bg-red-50
                px-4
                py-3
                rounded-xl
                font-black
                transition
              "
            >
              Request Account Deletion
            </button>

          </section>

        </div>


        {/* SAVE */}

        <div className="mt-6 bg-black rounded-3xl p-5 md:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>

            <p className="text-white font-black">
              Save your preferences
            </p>

            <p className="text-gray-400 text-sm mt-1">
              Changes are stored for this account on this device.
            </p>

          </div>

          <button
            type="button"
            onClick={saveSettings}
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
            Save Settings
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}


function SettingRow({
  icon,
  title,
  description,
  enabled,
  onToggle,
}) {
  return (
    <div className="border border-gray-200 rounded-2xl p-4 md:p-5">

      <div className="flex items-center justify-between gap-4">

        <div className="flex items-start gap-3">

          <div className="w-10 h-10 rounded-xl bg-gray-100 text-black flex items-center justify-center shrink-0">
            {icon}
          </div>

          <div>

            <h3 className="font-black">
              {title}
            </h3>

            <p className="text-gray-600 text-sm mt-1 font-medium">
              {description}
            </p>

          </div>

        </div>


        <button
          type="button"
          onClick={onToggle}
          aria-label={`Toggle ${title}`}
          className={`
            relative
            w-14
            h-8
            rounded-full
            shrink-0
            transition
            ${
              enabled
                ? "bg-green-700"
                : "bg-gray-300"
            }
          `}
        >

          <span
            className={`
              absolute
              top-1
              w-6
              h-6
              rounded-full
              bg-white
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

    </div>
  );
}
