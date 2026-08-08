import { Menu } from "lucide-react";


export default function MobileHeader({ setOpen }) {


return (

<header
className="
lg:hidden
sticky
top-0
z-40
bg-black
text-white
px-5
py-4
flex
items-center
justify-between
shadow-lg
"
>


<div
className="
flex
items-center
gap-3
"
>


<div
className="
bg-white
text-black
w-11
h-11
rounded-xl
flex
items-center
justify-center
text-xl
"
>

🐉

</div>



<div>

<h1
className="
font-bold
text-sm
"
>
NYŨMBA DRAGON 888
</h1>


<p
className="
text-green-500
text-xs
"
>
Smart Home Platform
</p>


</div>


</div>




<button

onClick={()=>setOpen(true)}

className="
p-2
rounded-lg
hover:bg-white/10
"

>

<Menu size={28}/>

</button>



</header>

)

}
