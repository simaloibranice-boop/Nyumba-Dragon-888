import {Link} from "react-router-dom";


const services=[

{
name:"Electrical Intelligence",
description:
"Certified electricians for residential and commercial systems."
},

{
name:"Plumbing Network",
description:
"Professional plumbing solutions and maintenance."
},

{
name:"Solar Infrastructure",
description:
"Renewable energy installation and support."
},

{
name:"Mechanical Experts",
description:
"Vehicle and equipment repair professionals."
},

{
name:"Healthcare Network",
description:
"Trusted healthcare professionals."
},

{
name:"Construction",
description:
"Building, renovation and maintenance services."
},

{
name:"Cleaning Services",
description:
"Professional cleaning and facility support."
}

];



export default function Services(){


return (

<div

className="
min-h-screen
pt-32
px-8
bg-gradient-to-br
from-[#020617]
via-[#071A33]
to-[#111827]
text-white
"

>


<div

className="
max-w-7xl
mx-auto
"

>


<h1

className="
text-5xl
font-black
text-cyan-300
"

>

Dragon Marketplace

</h1>



<p

className="
mt-5
text-xl
text-gray-300
"

>

A connected workforce intelligence network powering trusted services.

</p>




<div

className="
grid
md:grid-cols-3
gap-8
mt-12
"

>


{

services.map(service=>(


<div

key={service.name}

className="
bg-white/5
border
border-white/10
rounded-3xl
p-8
backdrop-blur-xl
hover:border-cyan-400/50
transition
"

>


<h2

className="
text-xl
font-black
text-white
"

>

{service.name}

</h2>



<p

className="
mt-3
text-gray-300
"

>

{service.description}

</p>




<Link

to={`/services/${service.name}`}

className="
inline-block
mt-6
px-6
py-3
rounded-xl
bg-cyan-400
text-black
font-black
hover:bg-cyan-300
transition
"

>

Explore

</Link>



</div>


))


}



</div>


</div>


</div>

)

}
