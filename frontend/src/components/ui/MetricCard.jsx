import { motion } from "framer-motion";


export default function MetricCard({
title,
value,
icon:Icon
}){


return (

<motion.div

whileHover={{
scale:1.04,
y:-5
}}

transition={{
type:"spring",
stiffness:200
}}

className="
clay
p-7
text-white
"

>


<div className="
flex
items-center
justify-between
">


<div>

<p className="
text-white/60
text-sm
font-semibold
uppercase
tracking-wider
">

{title}

</p>


<h2 className="
text-4xl
font-black
mt-3
">

{value}

</h2>


</div>



{
Icon &&

<div className="
rounded-3xl
p-4
bg-cyan-400/20
"

>

<Icon

size={32}

className="
text-cyan-300
"

/>

</div>

}



</div>


</motion.div>

)

}
