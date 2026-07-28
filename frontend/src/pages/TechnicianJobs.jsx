import {
Briefcase,
MapPin,
Clock
} from "lucide-react";


export default function TechnicianJobs(){


const jobs=[

{
title:"Solar Installation",
location:"Nairobi",
time:"Today"
},

{
title:"Electrical Repair",
location:"Kiambu",
time:"Tomorrow"
},

{
title:"Home Maintenance",
location:"Naivasha",
time:"Friday"
}

];


return (

<div>

<h1 className="
text-4xl
font-black
text-yellow-400
mb-3
">
Available Jobs
</h1>


<p className="
text-gray-400
mb-8
">
Manage incoming service opportunities.
</p>



<div className="
grid
md:grid-cols-3
gap-6
">


{
jobs.map(job=>(


<div
key={job.title}
className="
bg-[#071A33]
border
border-white/10
rounded-3xl
p-6
shadow-xl
"
>


<Briefcase
className="
text-yellow-400
mb-4
"
/>


<h2 className="
text-xl
font-bold
">
{job.title}
</h2>


<div className="
mt-4
space-y-2
text-gray-400
">


<p className="
flex
gap-2
items-center
">

<MapPin size={16}/>

{job.location}

</p>


<p className="
flex
gap-2
items-center
">

<Clock size={16}/>

{job.time}

</p>


</div>



<button
className="
mt-6
w-full
bg-yellow-400
text-black
py-3
rounded-xl
font-bold
hover:bg-yellow-300
"
>

Accept Job

</button>



</div>


))

}


</div>


</div>

)

}
