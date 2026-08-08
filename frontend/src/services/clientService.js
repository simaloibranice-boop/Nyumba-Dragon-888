import api from "./api";

/*
|--------------------------------------------------------------------------
| CLIENT SERVICES
|--------------------------------------------------------------------------
| All client requests use the shared Axios instance.
| api.js automatically attaches the JWT token from localStorage.
|--------------------------------------------------------------------------
*/


// GET AVAILABLE SERVICES
export const getClientServices = async () => {

    const response = await api.get(
        "/client/services"
    );

    return response.data;
};


// GET CLIENT REQUESTS
export const getClientRequests = async () => {

    const response = await api.get(
        "/client/requests"
    );

    return response.data;
};


// GET SINGLE CLIENT REQUEST
export const getClientRequest = async (id) => {

    const response = await api.get(
        `/client/requests/${id}`
    );

    return response.data;
};


// CREATE SERVICE REQUEST
export const createClientRequest = async (requestData) => {

    const response = await api.post(
        "/client/requests",
        requestData
    );

    return response.data;
};


// UPDATE SERVICE REQUEST
export const updateClientRequest = async (
    id,
    requestData
) => {

    const response = await api.put(
        `/client/requests/${id}`,
        requestData
    );

    return response.data;
};


// DELETE SERVICE REQUEST
export const deleteClientRequest = async (id) => {

    const response = await api.delete(
        `/client/requests/${id}`
    );

    return response.data;
};
