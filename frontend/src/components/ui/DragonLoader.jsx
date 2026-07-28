import { motion } from "framer-motion";

export default function DragonLoader(){

return (

<div className="
flex
flex-col
items-center
justify-center
gap-4
">


<motion.div

animate={{
rotate:360,
scale:[1,1.2,1]
}}

transition={{
duration:2,
repeat:Infinity
}}

className="
w-20
h-20
rounded-full
bg-gradient-to-br
from-yellow-400
to-orange-500
flex
items-center
justify-center
text-white
font-black
text-2xl
shadow-xl
"

>

🐉

</motion.div>


<p className="
text-gray-600
font-semibold
">

Awakening Dragon Intelligence...

</p>


</div>

)

}
