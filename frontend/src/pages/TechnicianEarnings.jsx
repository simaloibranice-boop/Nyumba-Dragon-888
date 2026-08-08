import { useState } from "react";
import {
  Wallet,
  TrendingUp,
  ArrowDownToLine,
  ArrowUpRight,
  Smartphone,
  Store,
  ReceiptText,
  CheckCircle,
  X,
  Clock,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

import DashboardLayout from "../components/dashboard/DashboardLayout";

const withdrawalMethods = [
  {
    id: "mpesa",
    title: "M-PESA Number",
    description: "Send money to a phone number",
    icon: Smartphone,
  },
  {
    id: "till",
    title: "Till Number",
    description: "Send funds to a Buy Goods Till",
    icon: Store,
  },
  {
    id: "paybill",
    title: "Paybill",
    description: "Pay through a business Paybill",
    icon: ReceiptText,
  },
];

const initialTransactions = [
  {
    id: 1,
    title: "House Wiring Installation",
    date: "8 Aug 2026",
    amount: 8000,
    type: "credit",
    status: "Completed",
  },
  {
    id: 2,
    title: "Solar Panel Repair",
    date: "7 Aug 2026",
    amount: 5500,
    type: "credit",
    status: "Completed",
  },
  {
    id: 3,
    title: "M-PESA Withdrawal",
    date: "6 Aug 2026",
    amount: 20000,
    type: "debit",
    status: "Successful",
  },
];

export default function TechnicianEarnings() {
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("mpesa");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [transactions, setTransactions] = useState(initialTransactions);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const availableBalance = 85000;
  const totalEarnings = 285000;
  const thisMonth = 85000;
  const pendingPayments = 12500;

  const selectedMethodData = withdrawalMethods.find(
    (method) => method.id === selectedMethod
  );

  const openWithdraw = () => {
    setError("");
    setSuccess(false);
    setAmount("");
    setRecipient("");
    setShowWithdraw(true);
  };

  const closeWithdraw = () => {
    setShowWithdraw(false);
    setShowConfirmation(false);
    setError("");
  };

  const handleContinue = () => {
    const numericAmount = Number(amount);

    if (!amount || numericAmount <= 0) {
      setError("Enter a valid withdrawal amount.");
      return;
    }

    if (numericAmount > availableBalance) {
      setError("The amount cannot exceed your available balance.");
      return;
    }

    if (numericAmount < 10) {
      setError("Minimum withdrawal amount is KES 10.");
      return;
    }

    if (!recipient.trim()) {
      setError("Enter the recipient number.");
      return;
    }

    setError("");
    setShowConfirmation(true);
  };

  const confirmWithdrawal = () => {
    const numericAmount = Number(amount);

    const newTransaction = {
      id: Date.now(),
      title:
        selectedMethod === "mpesa"
          ? "M-PESA Withdrawal"
          : selectedMethod === "till"
          ? "Till Withdrawal"
          : "Paybill Withdrawal",
      date: "Just now",
      amount: numericAmount,
      type: "debit",
      status: "Processing",
    };

    setTransactions((previous) => [newTransaction, ...previous]);
    setShowConfirmation(false);
    setSuccess(true);

    setTimeout(() => {
      setShowWithdraw(false);
      setSuccess(false);
    }, 2200);
  };

  return (
    <DashboardLayout role="technician">
      <div className="min-h-screen bg-gray-100 text-black">
        {/* PAGE HEADER */}
        <section className="bg-black rounded-3xl p-6 md:p-8 text-white mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-600 p-3 rounded-xl">
                  <Wallet size={24} />
                </div>

                <span className="text-green-400 font-bold text-sm">
                  NYŨMBA DRAGON 888 WALLET
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-black">
                Earnings & Wallet
              </h1>

              <p className="text-gray-300 mt-2 font-medium">
                Manage your earnings, withdrawals and payment activity.
              </p>
            </div>

            <button
              onClick={openWithdraw}
              className="bg-red-600 hover:bg-red-700 text-white font-black px-6 py-4 rounded-2xl flex items-center justify-center gap-3 transition"
            >
              <ArrowDownToLine size={20} />
              Withdraw Funds
            </button>
          </div>
        </section>

        {/* BALANCE */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          <div className="xl:col-span-2 bg-green-700 rounded-3xl p-7 text-white shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-green-100 font-bold">
                  Available to Withdraw
                </p>

                <h2 className="text-4xl md:text-5xl font-black mt-3">
                  KES {availableBalance.toLocaleString()}
                </h2>

                <p className="text-green-100 mt-3 font-medium">
                  Your available wallet balance
                </p>
              </div>

              <div className="bg-white/15 p-4 rounded-2xl">
                <Wallet size={30} />
              </div>
            </div>

            <button
              onClick={openWithdraw}
              className="mt-7 bg-white text-black font-black px-6 py-3 rounded-xl hover:bg-gray-100 transition"
            >
              Withdraw Now
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 p-7">
            <div className="flex items-center gap-3 mb-5">
              <TrendingUp className="text-green-700" />
              <h2 className="text-xl font-black">This Month</h2>
            </div>

            <p className="text-3xl font-black">
              KES {thisMonth.toLocaleString()}
            </p>

            <div className="flex items-center gap-2 mt-4 text-green-700 font-bold">
              <ArrowUpRight size={18} />
              Earnings are growing
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-3xl p-6">
            <p className="text-gray-600 font-bold">Total Earnings</p>
            <h2 className="text-2xl font-black mt-2">
              KES {totalEarnings.toLocaleString()}
            </h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6">
            <p className="text-gray-600 font-bold">Pending Payments</p>
            <h2 className="text-2xl font-black mt-2">
              KES {pendingPayments.toLocaleString()}
            </h2>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6">
            <p className="text-gray-600 font-bold">Completed Jobs</p>
            <h2 className="text-2xl font-black mt-2">146</h2>
          </div>
        </section>

        {/* TRANSACTIONS */}
        <section className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-7">
            <div>
              <h2 className="text-2xl font-black">Wallet Activity</h2>
              <p className="text-gray-600 mt-1 font-medium">
                Your latest earnings and withdrawals.
              </p>
            </div>

            <span className="text-sm font-black text-green-700">
              {transactions.length} transactions
            </span>
          </div>

          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-50 border border-gray-200 rounded-2xl p-5"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl ${
                      transaction.type === "credit"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {transaction.type === "credit" ? (
                      <ArrowUpRight size={20} />
                    ) : (
                      <ArrowDownToLine size={20} />
                    )}
                  </div>

                  <div>
                    <h3 className="font-black">{transaction.title}</h3>

                    <p className="text-gray-600 text-sm mt-1 font-medium">
                      {transaction.date}
                    </p>
                  </div>
                </div>

                <div className="sm:text-right">
                  <p
                    className={`font-black text-lg ${
                      transaction.type === "credit"
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {transaction.type === "credit" ? "+" : "-"} KES{" "}
                    {transaction.amount.toLocaleString()}
                  </p>

                  <span className="text-sm font-bold text-gray-600">
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WITHDRAW MODAL */}
        {showWithdraw && (
          <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-black text-white p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black">Withdraw Funds</h2>
                  <p className="text-gray-300 text-sm mt-1">
                    Available: KES {availableBalance.toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={closeWithdraw}
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-xl"
                >
                  <X />
                </button>
              </div>

              {success ? (
                <div className="p-10 text-center">
                  <div className="mx-auto w-20 h-20 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
                    <CheckCircle size={45} />
                  </div>

                  <h2 className="text-2xl font-black mt-5">
                    Withdrawal Submitted
                  </h2>

                  <p className="text-gray-600 mt-2 font-medium">
                    Your withdrawal of KES{" "}
                    {Number(amount).toLocaleString()} is being processed.
                  </p>
                </div>
              ) : !showConfirmation ? (
                <div className="p-6 md:p-8">
                  <h3 className="font-black text-lg mb-4">
                    Choose withdrawal method
                  </h3>

                  <div className="grid gap-3">
                    {withdrawalMethods.map((method) => {
                      const Icon = method.icon;
                      const selected = selectedMethod === method.id;

                      return (
                        <button
                          key={method.id}
                          onClick={() => setSelectedMethod(method.id)}
                          className={`text-left flex items-center gap-4 p-4 rounded-2xl border-2 transition ${
                            selected
                              ? "border-green-700 bg-green-50"
                              : "border-gray-200 hover:border-black"
                          }`}
                        >
                          <div
                            className={`p-3 rounded-xl ${
                              selected
                                ? "bg-green-700 text-white"
                                : "bg-gray-100 text-black"
                            }`}
                          >
                            <Icon size={22} />
                          </div>

                          <div>
                            <h4 className="font-black">{method.title}</h4>
                            <p className="text-gray-600 text-sm font-medium">
                              {method.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-6">
                    <label className="block font-black mb-2">
                      Amount (KES)
                    </label>

                    <input
                      type="number"
                      min="10"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full border-2 border-gray-200 rounded-xl p-4 text-black font-bold outline-none focus:border-green-700"
                    />
                  </div>

                  <div className="mt-5">
                    <label className="block font-black mb-2">
                      {selectedMethodData?.title}
                    </label>

                    <input
                      type="text"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      placeholder={
                        selectedMethod === "mpesa"
                          ? "e.g. 0712345678"
                          : selectedMethod === "till"
                          ? "Enter Till Number"
                          : "Enter Paybill Number"
                      }
                      className="w-full border-2 border-gray-200 rounded-xl p-4 text-black font-bold outline-none focus:border-green-700"
                    />
                  </div>

                  {error && (
                    <div className="mt-5 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex gap-3 font-bold">
                      <AlertCircle size={20} />
                      {error}
                    </div>
                  )}

                  <button
                    onClick={handleContinue}
                    className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl transition"
                  >
                    Continue
                  </button>
                </div>
              ) : (
                <div className="p-6 md:p-8">
                  <div className="text-center mb-7">
                    <ShieldCheck
                      size={50}
                      className="mx-auto text-green-700"
                    />

                    <h2 className="text-2xl font-black mt-3">
                      Confirm Withdrawal
                    </h2>

                    <p className="text-gray-600 mt-2 font-medium">
                      Review the details before submitting.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-5 space-y-4">
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-600 font-bold">Method</span>
                      <span className="font-black">
                        {selectedMethodData?.title}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-gray-600 font-bold">
                        Recipient
                      </span>
                      <span className="font-black">{recipient}</span>
                    </div>

                    <div className="border-t pt-4 flex justify-between gap-4">
                      <span className="font-black">Amount</span>
                      <span className="text-green-700 font-black text-xl">
                        KES {Number(amount).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setShowConfirmation(false)}
                      className="flex-1 border-2 border-black text-black font-black py-4 rounded-xl"
                    >
                      Back
                    </button>

                    <button
                      onClick={confirmWithdrawal}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl"
                    >
                      Confirm Withdrawal
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
