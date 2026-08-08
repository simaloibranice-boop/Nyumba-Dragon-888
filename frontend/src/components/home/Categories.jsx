import { ArrowRight } from "lucide-react";
import {
Zap,
Droplets,
Paintbrush,
Hammer,
Sofa,
Camera,
Sun,
Sparkles
} from "lucide-react";

import { motion } from "framer-motion";


export default function Categories(){


const services=[

["Electrician","Installations, repairs & maintenance","/images/electrician.jpg",<Zap/>],

["Plumber","Piping, leak repairs & installations","/images/plumber.jpg",<Droplets/>],

["Painter","Interior & exterior painting","/images/painter.jpg",<Paintbrush/>],

["Mason","Brickwork, plastering & construction","/images/mason.jpg",<Hammer/>],

["Carpenter","Woodwork, cabinets & furniture","/images/carpenter.jpg",<Sofa/>],

["CCTV Installer","Security installation & maintenance","/images/cctv-installer.jpg",<Camera/>],

["Solar Technician","Solar installation & maintenance","/images/solar-technician.jpg",<Sun/>],

["Cleaner","Home & office cleaning","/images/cleaner.jpg",<Sparkles/>]

];


return (

<section className="bg-white py-20">

<div className="max-w-7xl mx-auto px-6">


<div className="flex justify-between items-center mb-10">

<h2 className="text-4xl font-bold">
Popular Services
</h2>


<button className="text-red-600 flex gap-2 items-center">

View all services

<ArrowRight/>

</button>

</div>




<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">


{
services.map((service,index)=>(


<motion.div

key={index}

initial={{
opacity:0,
y:40
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

transition={{
duration:0.5,
delay:index*0.1
}}

className="
rounded-3xl
overflow-hidden
border
shadow-sm
hover:shadow-xl
transition
"

>


<img

src={service[2]}

alt={service[0]}

className="
h-52
w-full
object-cover
"

/>


<div className="p-5">


<div className="
bg-green-600
text-white
w-10
h-10
rounded-full
flex
items-center
justify-center
mb-4
">

{service[3]}

</div>


<h3 className="font-bold text-xl">
{service[0]}
</h3>


<p className="text-gray-500 mt-2">
{service[1]}
</p>


</div>


</motion.div>


))

}


</div>


</div>

</section>

)

}
