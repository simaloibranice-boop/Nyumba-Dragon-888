import api from "./api";


// GET TECHNICIAN PROFILE

export const getTechnicianProfile = async () => {

    const response = await api.get(
        "/technician/profile"
    );

    return response.data;

};





// GET AVAILABLE JOBS

export const getTechnicianJobs = async () => {

    const response = await api.get(
        "/technician/jobs"
    );

    return response.data;

};






// GET EARNINGS

export const getTechnicianEarnings = async () => {

    const response = await api.get(
        "/technician/earnings"
    );

    return response.data;

};






// GET PERFORMANCE

export const getTechnicianPerformance = async () => {

    const response = await api.get(
        "/technician/performance"
    );

    return response.data;

};






// UPDATE AVAILABILITY

export const updateTechnicianStatus = async (
    availability
)=>{


    const response = await api.put(

        "/technician/status",

        {
            availability
        }

    );


    return response.data;

};






// ACCEPT JOB

export const acceptTechnicianJob = async (
    id
)=>{


    const response = await api.put(

        `/technician/jobs/${id}/accept`

    );


    return response.data;


};






// COMPLETE JOB

export const completeTechnicianJob = async (
    id
)=>{


    const response = await api.put(

        `/technician/jobs/${id}/complete`

    );


    return response.data;


};
