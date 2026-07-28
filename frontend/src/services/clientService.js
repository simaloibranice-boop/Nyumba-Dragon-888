import axios from "axios";

const API = "http://127.0.0.1:5000/api";

function authHeader(token){

    console.log("========== CLIENT TOKEN ==========");
    console.log(token);
    console.log("==================================");

    return {
        headers:{
            Authorization:`Bearer ${token}`
        }
    };
}

export async function getServices(token){

    const response = await axios.get(
        `${API}/client/services`,
        authHeader(token)
    );

    return response.data;
}

export async function getRequests(token){

    const response = await axios.get(
        `${API}/client/requests`,
        authHeader(token)
    );

    return response.data;
}

export async function createRequest(token, requestData){

    const response = await axios.post(
        `${API}/client/requests`,
        requestData,
        authHeader(token)
    );

    return response.data;
}

export async function updateRequest(token, id, requestData){

    const response = await axios.put(
        `${API}/client/requests/${id}`,
        requestData,
        authHeader(token)
    );

    return response.data;
}

export async function deleteRequest(token, id){

    const response = await axios.delete(
        `${API}/client/requests/${id}`,
        authHeader(token)
    );

    return response.data;
}
