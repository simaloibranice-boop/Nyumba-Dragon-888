import {
  Search,
  MapPin,
  ShieldCheck,
  CreditCard,
  Navigation,
  Headphones
} from "lucide-react";

import { motion } from "framer-motion";


export default function Hero(){

const trustItems = [

{
icon:<ShieldCheck size={20}/>,
text:"Verified Professionals"
},

{
icon:<CreditCard size={20}/>,
text:"Secure Payments"
},

{
icon:<Navigation size={20}/>,
text:"Live Tracking"
},

{
icon:<Headphones size={20}/>,
text:"24/7 Support"
}

];


return (

<section
className="
relative
min-h-screen
bg-white
overflow-hidden
flex
items-center
"
>


<div
className="
max-w-7xl
mx-auto
px-6
pt-32
grid
lg:grid-cols-2
gap-12
items-center
"
>


{/* LEFT CONTENT */}

<motion.div

initial={{
opacity:0,
x:-50
}}

animate={{
opacity:1,
x:0
}}

transition={{
duration:0.8
}}

>


<div
className="
inline-flex
items-center
px-4
py-2
rounded-full
bg-green-100
text-green-700
text-sm
font-semibold
mb-6
"
>

KENYA'S TRUSTED HOME & PROPERTY PLATFORM

</div>



<h1
className="
text-5xl
lg:text-7xl
font-bold
leading-tight
text-black
"
>

Find Trusted Fundis

<span className="text-red-600">
{" "}For Every
</span>

<span className="text-green-700">
{" "}Home Project
</span>

</h1>



<p
className="
mt-6
text-gray-600
text-lg
leading-relaxed
max-w-xl
"
>

Nyũmba Dragon 888 connects you with verified,
skilled professionals across Kenya.
Fast. Reliable. Affordable.

</p>




<div
className="
flex
flex-wrap
gap-4
mt-8
"
>

<button
className="
bg-red-600
text-white
px-7
py-3
rounded-xl
font-semibold
hover:bg-red-700
transition
"
>

Book a Service

</button>



<button
className="
border
border-black
px-7
py-3
rounded-xl
font-semibold
hover:bg-black
hover:text-white
transition
"
>

Browse Services

</button>


</div>





{/* SEARCH */}

<div
className="
mt-8
bg-white
border
shadow-lg
rounded-2xl
p-3
flex
flex-col
md:flex-row
gap-3
max-w-xl
"
>


<div
className="
flex
items-center
gap-3
px-4
flex-1
"
>

<Search className="text-gray-500"/>

<span className="text-gray-400">
What service do you need?
</span>

</div>



<div
className="
flex
items-center
gap-2
px-4
"
>

<MapPin size={20}/>

Nairobi

</div>



<button
className="
bg-green-600
text-white
p-3
rounded-xl
"
>

<Search/>

</button>


</div>





{/* TRUST */}

<div
className="
grid
grid-cols-2
gap-4
mt-8
"
>

{
trustItems.map((item,index)=>(

<div
key={index}
className="
flex
items-center
gap-2
text-sm
text-gray-700
"
>

<div
className="
text-green-600
"
>

{item.icon}

</div>

{item.text}

</div>

))
}


</div>


</motion.div>





{/* IMAGE */}

<motion.div

className="relative"

initial={{
opacity:0,
x:50
}}

animate={{
opacity:1,
x:0
}}

transition={{
duration:0.8,
delay:0.2
}}

>


<div
className="
rounded-3xl
overflow-hidden
shadow-2xl
"
>

<img

src="/images/hero-fundi.jpg"

alt="Kenyan fundi working"

className="
w-full
h-[600px]
object-cover
"

/>

</div>





<div
className="
absolute
bottom-10
left-[-20px]
bg-white
shadow-xl
rounded-2xl
p-5
"
>

<h3
className="
text-3xl
font-bold
"
>

500+

</h3>


<p
className="
text-gray-600
"
>

Verified Professionals
<br/>
Across Kenya

</p>


</div>



</motion.div>



</div>


</section>

)

}
