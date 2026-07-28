import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";


export default function FormInput({
icon,
placeholder,
type="text",
value,
onChange,
error
}){

const [show,setShow]=useState(false);


const password = type==="password";


return (

<div>

<motion.div
whileFocus={{scale:1.02}}
className="
flex
items-center
gap-3
px-5
py-3
rounded-2xl
bg-gray-50
border
border-gray-200
focus-within:border-blue-400
transition
"
>

<div className="text-blue-400">
{icon}
</div>


<input

type={
password && show
?
"text"
:
type
}

placeholder={placeholder}

value={value}

onChange={onChange}

className="
bg-transparent
outline-none
w-full
text-gray-700
"

/>


{
password &&

<button
type="button"
onClick={()=>setShow(!show)}
className="text-gray-400"
>

{
show ?
<EyeOff/>
:
<Eye/>
}

</button>

}


</motion.div>


{
error &&
<p className="
text-red-500
text-sm
mt-2
ml-3
">
{error}
</p>
}


</div>

)

}
