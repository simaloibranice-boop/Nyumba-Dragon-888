import {
useParams,
useNavigate
} from "react-router-dom";


const serviceData={


"Electrical Intelligence":{

description:
"Certified electricians for residential and commercial electrical systems.",

skills:[
"House wiring",
"Electrical inspection",
"Power installation",
"Maintenance"
]

},


"Plumbing Network":{

description:
"Professional plumbing solutions and maintenance services.",

skills:[
"Pipe installation",
"Leak repair",
"Water systems",
"Drainage systems"
]

},


"Solar Infrastructure":{

description:
"Renewable energy installation and solar support.",

skills:[
"Solar panels",
"Inverters",
"Battery systems",
"Energy consultation"
]

},


"Mechanical Experts":{

description:
"Vehicle and equipment repair professionals.",

skills:[
"Engine repair",
"Diagnostics",
"Maintenance",
"Parts replacement"
]

},


"Healthcare Network":{

description:
"Trusted healthcare professionals.",

skills:[
"Home care",
"Medical consultation",
"Health support"
]

},


"Construction":{

description:
"Building, renovation and maintenance experts.",

skills:[
"Construction",
"Renovation",
"Repairs",
"Finishing"
]

},


"Cleaning Services":{

description:
"Professional cleaning and facility support.",

skills:[
"Home cleaning",
"Office cleaning",
"Deep cleaning"
]

}


};



export default function ServiceDetails(){


const {name}=useParams();

const navigate=useNavigate();


const service=serviceData[name];



if(!service){

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

<h1 className="text-4xl font-black">

Service Not Found

</h1>


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


<div

className="
max-w-5xl
mx-auto
bg-white/5
border
border-white/10
rounded-3xl
p-10
backdrop-blur-xl
"

>


<h1

className="
text-5xl
font-black
text-cyan-300
"

>

{name}

</h1>



<p

className="
mt-5
text-xl
text-gray-300
"

>

{service.description}

</p>



<h2

className="
mt-10
text-2xl
font-black
text-white
"

>

Available Expertise

</h2>




<div

className="
grid
md:grid-cols-2
gap-5
mt-6
"

>


{

service.skills.map(skill=>(


<div

key={skill}

className="
bg-black/30
border
border-white/10
rounded-xl
p-5
text-white
"

>

{skill}

</div>


))

}


</div>




<button

onClick={()=>navigate("/register")}

className="
mt-10
px-8
py-4
rounded-2xl
bg-cyan-400
text-black
font-black
hover:bg-cyan-300
transition
"

>

Request This Service

</button>



</div>



</div>

)

}
