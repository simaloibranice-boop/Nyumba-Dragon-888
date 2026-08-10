import { useEffect, useState } from "react";
import {
    Wallet as WalletIcon,
    ArrowDownToLine,
    ArrowUpRight,
    RefreshCw,
    CheckCircle,
    Clock,
    XCircle
} from "lucide-react";

import walletService from "../services/walletService";


export default function TechnicianWallet() {

    const [wallet, setWallet] = useState(null);
    const [transactions, setTransactions] = useState([]);

    const [loading, setLoading] = useState(true);
    const [withdrawing, setWithdrawing] = useState(false);

    const [amount, setAmount] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    const loadWallet = async () => {

        try {

            setLoading(true);
            setError("");

            const [walletData, transactionData] =
                await Promise.all([
                    walletService.getWallet(),
                    walletService.getTransactions()
                ]);

            setWallet(walletData.wallet);
            setTransactions(transactionData.transactions || []);

        } catch (err) {

            console.error("Wallet loading error:", err);

            setError(
                err.response?.data?.message ||
                "Failed to load wallet."
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {
        loadWallet();
    }, []);


    const handleWithdraw = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        const withdrawalAmount = Number(amount);

        if (!withdrawalAmount || withdrawalAmount <= 0) {

            setError(
                "Enter a valid withdrawal amount."
            );

            return;
        }

        if (!phoneNumber.trim()) {

            setError(
                "Enter the M-Pesa phone number."
            );

            return;
        }

        if (
            wallet &&
            withdrawalAmount > Number(wallet.balance)
        ) {

            setError(
                `Insufficient balance. Available: KES ${Number(
                    wallet.balance
                ).toLocaleString()}`
            );

            return;
        }

        try {

            setWithdrawing(true);

            const result =
                await walletService.withdraw(
                    withdrawalAmount,
                    phoneNumber.trim()
                );

            setWallet(result.wallet);

            setTransactions((current) => [
                result.transaction,
                ...current
            ]);

            setAmount("");

            setMessage(
                `KES ${withdrawalAmount.toLocaleString()} withdrawal completed successfully.`
            );

        } catch (err) {

            console.error(
                "Withdrawal error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Withdrawal failed."
            );

        } finally {

            setWithdrawing(false);

        }
    };


    const formatAmount = (value) =>
        `KES ${Number(value || 0).toLocaleString(
            undefined,
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        )}`;


    const getTransactionIcon = (type) => {

        if (type === "CREDIT") {
            return (
                <div className="p-2 rounded-full bg-green-100">
                    <ArrowDownToLine
                        size={18}
                        className="text-green-600"
                    />
                </div>
            );
        }

        if (type === "WITHDRAWAL") {
            return (
                <div className="p-2 rounded-full bg-red-100">
                    <ArrowUpRight
                        size={18}
                        className="text-red-600"
                    />
                </div>
            );
        }

        return (
            <div className="p-2 rounded-full bg-gray-100">
                <WalletIcon size={18} />
            </div>
        );
    };


    const getStatusIcon = (status) => {

        if (status === "COMPLETED") {

            return (
                <CheckCircle
                    size={15}
                    className="text-green-600"
                />
            );
        }

        if (status === "PENDING") {

            return (
                <Clock
                    size={15}
                    className="text-yellow-600"
                />
            );
        }

        return (
            <XCircle
                size={15}
                className="text-red-600"
            />
        );
    };


    if (loading) {

        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">

                <div className="text-center">

                    <RefreshCw
                        size={30}
                        className="animate-spin mx-auto mb-3"
                    />

                    <p className="text-gray-600">
                        Loading wallet...
                    </p>

                </div>

            </div>
        );
    }


    return (

        <div className="min-h-screen bg-gray-100 p-4 md:p-8">

            <div className="max-w-7xl mx-auto">

                {/* HEADER */}

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                    <div>

                        <h1 className="text-3xl font-bold text-gray-900">
                            My Wallet
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Manage your earnings and withdrawals
                        </p>

                    </div>

                    <button
                        onClick={loadWallet}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                    >
                        <RefreshCw size={17} />
                        Refresh
                    </button>

                </div>


                {/* ERROR */}

                {error && (

                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        {error}
                    </div>

                )}


                {/* SUCCESS */}

                {message && (

                    <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">

                        <CheckCircle size={18} />

                        {message}

                    </div>

                )}


                {/* BALANCE CARDS */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                    <div className="bg-black text-white rounded-2xl p-6 shadow-lg">

                        <div className="flex items-center justify-between mb-5">

                            <div>

                                <p className="text-gray-400 text-sm">
                                    Available Balance
                                </p>

                                <h2 className="text-3xl font-bold mt-2">
                                    {formatAmount(
                                        wallet?.balance
                                    )}
                                </h2>

                            </div>

                            <div className="bg-white/10 p-3 rounded-xl">

                                <WalletIcon size={28} />

                            </div>

                        </div>

                        <p className="text-gray-400 text-sm">
                            Ready for withdrawal
                        </p>

                    </div>


                    <div className="bg-white rounded-2xl p-6 shadow-sm border">

                        <p className="text-gray-500 text-sm">
                            Pending Balance
                        </p>

                        <h2 className="text-3xl font-bold text-gray-900 mt-3">
                            {formatAmount(
                                wallet?.pending_balance
                            )}
                        </h2>

                        <p className="text-gray-500 text-sm mt-2">
                            Pending earnings
                        </p>

                    </div>


                    <div className="bg-white rounded-2xl p-6 shadow-sm border">

                        <p className="text-gray-500 text-sm">
                            Transactions
                        </p>

                        <h2 className="text-3xl font-bold text-gray-900 mt-3">
                            {transactions.length}
                        </h2>

                        <p className="text-gray-500 text-sm mt-2">
                            Wallet transactions
                        </p>

                    </div>

                </div>


                {/* MAIN CONTENT */}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


                    {/* WITHDRAW */}

                    <div className="bg-white rounded-2xl shadow-sm border p-6">

                        <div className="flex items-center gap-3 mb-6">

                            <div className="bg-green-100 p-3 rounded-xl">

                                <ArrowUpRight
                                    size={22}
                                    className="text-green-600"
                                />

                            </div>

                            <div>

                                <h2 className="font-bold text-lg">
                                    Withdraw to M-Pesa
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Available: {formatAmount(
                                        wallet?.balance
                                    )}
                                </p>

                            </div>

                        </div>


                        <form
                            onSubmit={handleWithdraw}
                            className="space-y-5"
                        >

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Amount
                                </label>

                                <input
                                    type="number"
                                    min="1"
                                    step="0.01"
                                    value={amount}
                                    onChange={(e) =>
                                        setAmount(e.target.value)
                                    }
                                    placeholder="Enter amount"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                                />

                            </div>


                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    M-Pesa Phone Number
                                </label>

                                <input
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) =>
                                        setPhoneNumber(e.target.value)
                                    }
                                    placeholder="254700000000"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                                />

                            </div>


                            <button
                                type="submit"
                                disabled={withdrawing}
                                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 transition"
                            >

                                {withdrawing
                                    ? "Processing..."
                                    : "Withdraw Funds"
                                }

                            </button>

                        </form>

                    </div>


                    {/* TRANSACTIONS */}

                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border">

                        <div className="p-6 border-b">

                            <h2 className="text-xl font-bold text-gray-900">
                                Transaction History
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Your wallet activity
                            </p>

                        </div>


                        <div className="divide-y">

                            {transactions.length === 0 ? (

                                <div className="p-10 text-center text-gray-500">

                                    <WalletIcon
                                        size={40}
                                        className="mx-auto mb-3 opacity-40"
                                    />

                                    <p>
                                        No transactions yet.
                                    </p>

                                </div>

                            ) : (

                                transactions.map(
                                    (transaction) => (

                                        <div
                                            key={transaction.id}
                                            className="p-5 flex items-center justify-between gap-4"
                                        >

                                            <div className="flex items-center gap-4 min-w-0">

                                                {getTransactionIcon(
                                                    transaction.transaction_type
                                                )}

                                                <div className="min-w-0">

                                                    <p className="font-semibold text-gray-900">

                                                        {transaction.transaction_type ===
                                                        "CREDIT"
                                                            ? "Payment Received"
                                                            : "M-Pesa Withdrawal"}

                                                    </p>

                                                    <p className="text-sm text-gray-500 truncate">

                                                        {transaction.description}

                                                    </p>

                                                    <p className="text-xs text-gray-400 mt-1">

                                                        {transaction.reference}

                                                    </p>

                                                </div>

                                            </div>


                                            <div className="text-right shrink-0">

                                                <p
                                                    className={`font-bold ${
                                                        transaction.transaction_type ===
                                                        "CREDIT"
                                                            ? "text-green-600"
                                                            : "text-red-600"
                                                    }`}
                                                >

                                                    {transaction.transaction_type ===
                                                    "CREDIT"
                                                        ? "+"
                                                        : "-"
                                                    }

                                                    {formatAmount(
                                                        transaction.amount
                                                    )}

                                                </p>

                                                <div className="flex items-center justify-end gap-1 mt-1 text-xs">

                                                    {getStatusIcon(
                                                        transaction.status
                                                    )}

                                                    <span>
                                                        {
                                                            transaction.status
                                                        }
                                                    </span>

                                                </div>

                                            </div>

                                        </div>

                                    )
                                )

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}
