import {
  Star,
  MapPin,
  Briefcase
} from "lucide-react";

import {
  motion
} from "framer-motion";


export default function FeaturedPros(){


const professionals=[

{
name:"John Mwangi",
role:"Electrician",
location:"Nairobi",
jobs:"500+ Jobs Completed",
rating:"4.9",
image:"/images/electrician.jpg"
},


{
name:"Mary Wanjiku",
role:"Solar Technician",
location:"Nakuru",
jobs:"300+ Jobs Completed",
rating:"4.8",
image:"/images/solar-technician.jpg"
},


{
name:"Peter Otieno",
role:"Mason",
location:"Kisumu",
jobs:"450+ Jobs Completed",
rating:"4.9",
image:"/images/mason.jpg"
},


{
name:"David Kamau",
role:"Carpenter",
location:"Kiambu",
jobs:"280+ Jobs Completed",
rating:"4.7",
image:"/images/carpenter.jpg"
}

];



return (

<section
className="
bg-white
py-24
"
>


<div
className="
max-w-7xl
mx-auto
px-6
"
>


<div
className="
text-center
mb-12
"
>


<p
className="
text-green-600
font-semibold
uppercase
"
>
Trusted Professionals
</p>


<h2
className="
text-4xl
font-bold
mt-3
"
>
Meet Our Verified Professionals
</h2>


<p
className="
text-gray-500
mt-4
"
>
Skilled Kenyan experts ready to help with your home projects.
</p>


</div>





<div
className="
grid
sm:grid-cols-2
lg:grid-cols-4
gap-8
"
>


{
professionals.map((pro,index)=>(


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
bg-white
rounded-3xl
overflow-hidden
border
shadow-sm
hover:shadow-xl
transition
"

>


<img

src={pro.image}

alt={pro.name}

className="
h-64
w-full
object-cover
"

/>




<div
className="
p-6
"
>


<h3
className="
text-xl
font-bold
"
>
{pro.name}
</h3>


<p
className="
text-green-600
font-medium
"
>
{pro.role}
</p>




<div
className="
mt-4
space-y-3
text-gray-500
text-sm
"
>


<p
className="
flex
items-center
gap-2
"
>

<Star
size={17}
className="text-red-600"
/>

{pro.rating} Rating

</p>



<p
className="
flex
items-center
gap-2
"
>

<MapPin size={17}/>

{pro.location}

</p>




<p
className="
flex
items-center
gap-2
"
>

<Briefcase size={17}/>

{pro.jobs}

</p>


</div>




<button

className="
mt-6
w-full
bg-black
text-white
py-3
rounded-xl
hover:bg-green-700
transition
"

>

View Profile

</button>



</div>



</motion.div>


))

}


</div>


</div>


</section>

)

}
