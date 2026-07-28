import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../services/api";


export default function TechnicianJobs(){


const navigate = useNavigate();


const [pendingJobs,setPendingJobs] = useState([]);

const [workingJobs,setWorkingJobs] = useState([]);

const [completedJobs,setCompletedJobs] = useState([]);

const [loading,setLoading] = useState(true);



useEffect(()=>{

loadJobs();

},[]);





async function loadJobs(){

try{


const response = await API.get(
"/technician/jobs"
);


const jobs=response.data;



setPendingJobs(

jobs.filter(
job=>job.status==="PENDING"
)

);



setWorkingJobs(

jobs.filter(
job=>job.status==="ACCEPTED"
)

);



setCompletedJobs(

jobs.filter(
job=>job.status==="COMPLETED"
)

);



}

catch(error){

console.error(
"Loading jobs failed",
error
);

}


finally{

setLoading(false);

}


}






async function acceptJob(id){


try{


await API.put(

`/technician/jobs/${id}/accept`

);


loadJobs();


}

catch(error){

console.error(error);

}


}






async function completeJob(id){


try{


await API.put(

`/technician/jobs/${id}/complete`

);


loadJobs();


}

catch(error){

console.error(error);

}


}






function JobCard({job,type}){


return (

<div

className="
bg-black/30
border
border-white/10
rounded-2xl
p-5
mb-5
"

>


<h3

className="
text-xl
font-black
text-cyan-300
"

>

{job.service}

</h3>



<div

className="
mt-4
space-y-2
text-white
"

>


<p>
Customer: {job.customer}
</p>


<p>
Location: {job.location}
</p>


<p>
Description: {job.description}
</p>


<p>
Labour:
{job.labour || "General service labour"}
</p>


<p>

Price:

<span className="
text-yellow-300
font-black
">

 KSh {Number(job.price || 0).toLocaleString()}

</span>

</p>



<p className="
text-green-300
font-bold
">

Status:
{job.status}

</p>


</div>





<div className="
flex
gap-3
mt-6
">


<button

onClick={()=>navigate(
`/technician/jobs/${job.id}`
)}

className="
px-5
py-2
rounded-xl
bg-white/10
text-white
font-bold
"

>

View

</button>





{
type==="PENDING" &&

<button

onClick={()=>acceptJob(job.id)}

className="
px-5
py-2
rounded-xl
bg-cyan-400
text-black
font-black
"

>

Accept Job

</button>

}





{
type==="ACCEPTED" &&

<button

onClick={()=>completeJob(job.id)}

className="
px-5
py-2
rounded-xl
bg-green-400
text-black
font-black
"

>

Mark Completed

</button>

}



</div>


</div>

)

}






if(loading){

return (

<div className="
min-h-screen
bg-gradient-to-br
from-[#020617]
via-[#071A33]
to-[#111827]
text-white
p-10
">

Loading technician jobs...

</div>

)

}





return (

<div

className="
min-h-screen
bg-gradient-to-br
from-[#020617]
via-[#071A33]
to-[#111827]
text-white
p-10
"

>


<h1 className="
text-4xl
font-black
text-cyan-300
mb-10
">

Technician Job Management

</h1>





<div className="
grid
xl:grid-cols-3
gap-8
">





<div className="
bg-white/5
border
border-white/10
rounded-3xl
p-6
backdrop-blur-xl
">


<h2 className="
text-2xl
font-black
text-yellow-300
mb-6
">

Pending Jobs

</h2>


{

pendingJobs.length===0 ?

<p className="text-white">
No pending jobs
</p>

:

pendingJobs.map(job=>(

<JobCard

key={job.id}

job={job}

type="PENDING"

/>

))

}


</div>







<div className="
bg-white/5
border
border-white/10
rounded-3xl
p-6
backdrop-blur-xl
">


<h2 className="
text-2xl
font-black
text-blue-300
mb-6
">

Working On It

</h2>



{

workingJobs.length===0 ?

<p className="text-white">
No active jobs
</p>

:

workingJobs.map(job=>(

<JobCard

key={job.id}

job={job}

type="ACCEPTED"

/>

))

}


</div>









<div className="
bg-white/5
border
border-white/10
rounded-3xl
p-6
backdrop-blur-xl
">


<h2 className="
text-2xl
font-black
text-green-300
mb-6
">

Done Jobs

</h2>



{

completedJobs.length===0 ?

<p className="text-white">
No completed jobs
</p>

:

completedJobs.map(job=>(

<JobCard

key={job.id}

job={job}

type="COMPLETED"

/>

))

}


</div>




</div>


</div>

)

}
