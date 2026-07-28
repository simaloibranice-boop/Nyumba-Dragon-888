import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";


export default function TechnicianJobDetails(){


const {id}=useParams();

const navigate=useNavigate();


const storageKey=`job_${id}_status`;


const [status,setStatus]=useState(
localStorage.getItem(storageKey) || "Pending"
);



const jobs={

1:{
service:"Solar Installation",
customer:"John Kamau",
location:"Nairobi West",
description:"Complete home solar power installation",
labour:"Panel mounting, inverter setup, battery installation and wiring",
price:85000
},

2:{
service:"Electrical Repair",
customer:"Mary Wanjiku",
location:"Kiambu",
description:"House electrical fault repair",
labour:"Socket replacement, wiring inspection and safety testing",
price:25000
},

3:{
service:"Maintenance Request",
customer:"Peter Mwangi",
location:"Naivasha",
description:"General home maintenance",
labour:"Inspection, repairs and replacement work",
price:15000
}

};



const job=jobs[id];



if(!job){

return(

<div className="
min-h-screen
bg-gradient-to-br
from-[#020617]
via-[#071A33]
to-[#111827]
text-white
p-10
">

<h1 className="text-3xl font-black">
Job Not Found
</h1>

</div>

)

}



function acceptJob(){

localStorage.setItem(
storageKey,
"Accepted"
);

setStatus("Accepted");

}



return(

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


<div
className="
max-w-4xl
mx-auto
bg-white/5
border
border-white/10
rounded-3xl
p-8
backdrop-blur-xl
"
>


<h1 className="
text-4xl
font-black
text-cyan-300
">

{job.service}

</h1>



<div className="
mt-8
space-y-4
text-white
">


<p>
<b>Customer:</b> {job.customer}
</p>


<p>
<b>Location:</b> {job.location}
</p>


<p>
<b>Description:</b> {job.description}
</p>


<p>
<b>Labour Specification:</b> {job.labour}
</p>


<p>
<b>Price:</b>

<span className="
text-cyan-300
font-black
">

 KSh {job.price.toLocaleString()}

</span>

</p>


<p>

<b>Status:</b>

<span className="
ml-2
text-cyan-300
font-black
">

{status}

</span>

</p>


</div>





<div className="
flex
gap-4
mt-10
">


<button

onClick={acceptJob}

className="
px-6
py-3
rounded-xl
bg-cyan-400
text-black
font-black
"

>

{
status==="Accepted"
?
"Accepted ✓"
:
"Accept Job"
}


</button>




<button

onClick={()=>navigate("/technician/profile")}

className="
px-6
py-3
rounded-xl
bg-white/10
text-white
font-black
"

>

Edit Profile

</button>



<button

onClick={()=>navigate(-1)}

className="
px-6
py-3
rounded-xl
bg-black/40
text-white
font-black
"

>

Back

</button>



</div>


</div>


</div>

)

}
