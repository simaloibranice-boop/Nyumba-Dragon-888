import api from "./api";


const paymentService = {

    createPayment: async (
        service_request_id,
        phone_number,
        payment_method = "M-PESA"
    ) => {

        const response = await api.post(
            "/client/payments",
            {
                service_request_id,
                phone_number,
                payment_method
            }
        );

        return response.data;
    },


    getPayments: async () => {

        const response = await api.get(
            "/client/payments"
        );

        return response.data;
    },


    getPayment: async (paymentId) => {

        const response = await api.get(
            `/client/payments/${paymentId}`
        );

        return response.data;
    },


    confirmPayment: async (paymentId) => {

        const response = await api.put(
            `/client/payments/${paymentId}/confirm`
        );

        return response.data;
    }

};


export default paymentService;
