import {
Briefcase,
CheckCircle,
Clock
} from "lucide-react";


export default function Jobs(){


const jobs=[

{
title:"Electrical Installation",
client:"Nairobi Client",
status:"Pending"
},

{
title:"Solar System Repair",
client:"Karen Residence",
status:"Completed"
},

{
title:"Home Maintenance",
client:"Westlands Client",
status:"In Progress"
}

];


return (

<div>


<h1 className="
text-4xl
font-black
text-white
">
Technician Jobs
</h1>


<p className="
text-slate-400
mt-2
mb-8
">
Manage your assigned and available work.
</p>



<div className="
space-y-5
">


{
jobs.map(job=>(

<div

key={job.title}

className="
bg-white/5
border
border-white/10
rounded-2xl
p-6
flex
justify-between
items-center
"

>


<div>

<h2 className="
text-xl
font-bold
text-white
">
{job.title}
</h2>


<p className="
text-slate-400
mt-1
">
{job.client}
</p>


</div>



<div className="
flex
items-center
gap-3
text-cyan-300
">


{
job.status==="Completed"
?
<CheckCircle/>
:
job.status==="Pending"
?
<Clock/>
:
<Briefcase/>
}


{job.status}


</div>


</div>


))

}


</div>


</div>

)

}
