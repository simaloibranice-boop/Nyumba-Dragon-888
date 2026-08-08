import { motion } from "framer-motion";
import {
ShieldCheck,
Navigation,
CreditCard,
Award,
Headphones,
Users,
Briefcase,
MapPin,
Star
} from "lucide-react";


export default function WhyChooseUs(){


const benefits=[

["Verified Professionals","All professionals are screened and verified.",<ShieldCheck/>],

["Live Tracking","Track your professional in real time.",<Navigation/>],

["Secure Payments","Pay safely with M-Pesa or card.",<CreditCard/>],

["Satisfaction Guarantee","Quality workmanship guaranteed.",<Award/>],

["24/7 Support","We are here whenever you need us.",<Headphones/>]

];


const stats=[

["10K+","Happy Customers",<Users/>],

["500+","Verified Professionals",<ShieldCheck/>],

["25K+","Jobs Completed",<Briefcase/>],

["4.8","Average Rating",<Star/>],

["15+","Counties Served",<MapPin/>],

["98%","Customer Satisfaction",<Award/>]

];


return (

<section className="bg-gray-100 py-24">

<div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10">


<motion.div

initial={{opacity:0,x:-40}}

whileInView={{opacity:1,x:0}}

viewport={{once:true}}

className="
bg-black
text-white
rounded-3xl
p-10
"

>

<h2 className="text-4xl font-bold">
Why Choose Nyũmba Dragon 888?
</h2>


<div className="mt-8 space-y-5">

{
benefits.map((item,index)=>(

<div key={index} className="flex gap-4">

<div className="text-green-500">
{item[2]}
</div>


<div>

<h3 className="font-semibold">
{item[0]}
</h3>

<p className="text-gray-400">
{item[1]}
</p>

</div>


</div>

))

}

</div>


</motion.div>





<motion.div

initial={{opacity:0,y:40}}

whileInView={{opacity:1,y:0}}

viewport={{once:true}}

className="
bg-white
rounded-3xl
p-10
grid
sm:grid-cols-2
gap-6
"

>


{
stats.map((item,index)=>(

<div
key={index}
className="
border
rounded-2xl
p-6
"
>

<div className="text-green-600 mb-3">
{item[2]}
</div>


<h3 className="text-4xl font-bold">
{item[0]}
</h3>


<p className="text-gray-500">
{item[1]}
</p>


</div>

))

}


</motion.div>


</div>

</section>

)

}
