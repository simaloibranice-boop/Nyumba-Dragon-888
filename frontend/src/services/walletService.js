import api from "./api";

const walletService = {

    getWallet: async () => {
        const response = await api.get("/technician/wallet");
        return response.data;
    },

    getTransactions: async () => {
        const response = await api.get(
            "/technician/wallet/transactions"
        );
        return response.data;
    },

    withdraw: async (amount, phone_number) => {
        const response = await api.post(
            "/technician/wallet/withdraw",
            {
                amount,
                phone_number
            }
        );

        return response.data;
    }

};

export default walletService;
