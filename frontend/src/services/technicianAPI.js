import API from "./api";


export async function getTechnicianJobs(){

const response = await API.get(
"/technician/jobs"
);

return response.data;

}



export async function acceptTechnicianJob(id){

const response = await API.put(

`/technician/jobs/${id}/accept`

);

return response.data;

}




export async function completeTechnicianJob(id){

const response = await API.put(

`/technician/jobs/${id}/complete`

);

return response.data;

}
