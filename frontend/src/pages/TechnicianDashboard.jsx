import { 
Briefcase,
CheckCircle,
DollarSign,
Star,
Clock,
User
} from "lucide-react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


export default function TechnicianDashboard(){

const navigate = useNavigate();


const stats=[

{
title:"Active Jobs",
value:"12",
icon:Briefcase
},

{
title:"Services Completed",
value:"148",
icon:CheckCircle
},

{
title:"Monthly Earnings",
value:"KSh 320,000",
icon:DollarSign
},

{
title:"Customer Rating",
value:"4.9",
icon:Star
}

];


const jobs=[

{
id:1,
name:"Solar Installation - Nairobi"
},

{
id:2,
name:"Electrical Repair - Kiambu"
},

{
id:3,
name:"Maintenance Request - Naivasha"
}

];


const activities=[

"New solar request received",
"Payment released",
"Customer rated your service 5 stars",
"Profile verification completed"

];


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


<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
>


<h1 className="
text-4xl
font-black
text-cyan-300
">

Technician Command Center 👋

</h1>


<p className="
text-gray-300
mt-2
">

Manage jobs, services, earnings, analytics and your professional profile.

</p>


</motion.div>



<div className="
grid
md:grid-cols-4
gap-6
mt-10
">


{
stats.map((stat)=>{

const Icon=stat.icon;

return(

<div
key={stat.title}
className="
bg-white/5
border
border-white/10
rounded-3xl
p-6
backdrop-blur-xl
"
>

<Icon className="text-cyan-300 mb-4"/>


<p className="text-gray-300">
{stat.title}
</p>


<h2 className="
text-3xl
font-black
text-white
mt-2
">

{stat.value}

</h2>


</div>

)

})
}


</div>




<div className="
grid
md:grid-cols-2
gap-8
mt-10
">


<div
className="
bg-white/5
border
border-white/10
rounded-3xl
p-6
backdrop-blur-xl
"
>

<h2 className="
text-xl
font-black
text-cyan-300
mb-5
">

Jobs Overview

</h2>



<div className="space-y-4">


{
jobs.map(job=>(

<div
key={job.id}
className="
flex
justify-between
items-center
bg-black/30
p-4
rounded-xl
"
>


<span className="text-white">
{job.name}
</span>



<button

onClick={()=>
navigate(`/technician/jobs/${job.id}`)
}

className="
text-cyan-300
font-black
hover:text-white
"

>

View

</button>


</div>


))
}


</div>


</div>






<div
className="
bg-white/5
border
border-white/10
rounded-3xl
p-6
backdrop-blur-xl
"
>


<h2 className="
text-xl
font-black
text-cyan-300
mb-5
">

Profile Status

</h2>


<p className="text-gray-300">

Your technician profile is verified and ready for new opportunities.

</p>


<div className="
mt-6
flex
justify-between
items-center
">


<span className="
text-cyan-300
font-bold
">

Verified Technician

</span>



<button

onClick={()=>
navigate("/technician/profile")
}

className="
px-5
py-3
rounded-xl
bg-cyan-400
text-black
font-black
"

>

Edit Profile

</button>


</div>


</div>


</div>






<div
className="
mt-10
grid
md:grid-cols-2
gap-8
"
>


<div
className="
bg-white/5
border
border-white/10
rounded-3xl
p-6
"
>

<h2 className="
text-xl
font-black
text-cyan-300
mb-5
">

Recent Activity

</h2>


{
activities.map(item=>(

<div
key={item}
className="
flex
gap-3
items-center
text-gray-300
mb-4
"
>

<Clock
size={18}
className="text-cyan-300"
/>

{item}

</div>

))

}


</div>




<div
className="
bg-white/5
border
border-white/10
rounded-3xl
p-6
"
>


<h2 className="
text-xl
font-black
text-cyan-300
mb-5
">

My Services

</h2>


<p className="text-white">
Electrical Installation
</p>

<p className="text-white">
Solar Systems
</p>

<p className="text-white">
Home Maintenance
</p>

<p className="text-white">
Mechanical Repairs
</p>


</div>


</div>


</div>

)

}
