import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ChevronDown,
    Home,
    Briefcase,
    Users,
    BarChart3,
    Settings
} from "lucide-react";


export default function Navbar(){

    const [dropdown,setDropdown] = useState(null);


    const menus = [

        {
            name:"Solutions",
            items:[
                {
                    title:"Client Platform",
                    path:"/client",
                    icon:Users
                },
                {
                    title:"Technician Network",
                    path:"/technician",
                    icon:Briefcase
                }
            ]
        },

        {
            name:"Services",
            items:[
                {
                    title:"Marketplace",
                    path:"/services",
                    icon:Home
                },
                {
                    title:"Analytics",
                    path:"/analytics",
                    icon:BarChart3
                }
            ]
        },

        {
            name:"Company",
            items:[
                {
                    title:"About",
                    path:"/about",
                    icon:Users
                },
                {
                    title:"Investors",
                    path:"/investors",
                    icon:BarChart3
                }
            ]
        }

    ];


    return (

<nav
className="
fixed
top-0
left-0
right-0
z-50
bg-black/80
backdrop-blur-xl
border-b
border-yellow-500/20
"
>

<div
className="
max-w-7xl
mx-auto
px-6
py-4
flex
items-center
justify-between
"
>


<Link
to="/"
className="
text-2xl
font-black
text-yellow-400
tracking-widest
"
>
888 DRAGON
</Link>



<div
className="
flex
items-center
gap-10
text-white
"
>


<Link
to="/"
className="hover:text-yellow-400 transition"
>
Home
</Link>



{
menus.map((menu,index)=>(

<div

key={menu.name}

className="
relative
pb-4
"

onMouseEnter={()=>setDropdown(index)}

onMouseLeave={()=>setDropdown(null)}

>

<button
className="
flex
items-center
gap-1
hover:text-yellow-400
transition
"
>
{menu.name}

<ChevronDown size={16}/>

</button>



{
dropdown===index && (

<motion.div

initial={{
opacity:0,
y:-10
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:.2
}}

onMouseEnter={()=>setDropdown(index)}

onMouseLeave={()=>setDropdown(null)}

className="
absolute
top-12
left-0
w-64
bg-zinc-950
border
border-yellow-500/20
rounded-xl
shadow-2xl
p-3
"

>


{
menu.items.map(item=>{

const Icon=item.icon;


return (

<Link

key={item.title}

to={item.path}

className="
flex
items-center
gap-3
p-3
rounded-lg
text-gray-300
hover:bg-yellow-500
hover:text-black
transition
"

>

<Icon size={18}/>

<span>
{item.title}
</span>


</Link>


)

})

}


</motion.div>

)

}


</div>


))

}



<Link
to="/login"
className="
px-5
py-2
rounded-lg
bg-yellow-400
text-black
font-bold
hover:bg-yellow-300
transition
"
>
Login
</Link>


</div>

</div>


</nav>


    )

}
