import {
LayoutDashboard,
Users,
Briefcase,
BarChart3,
Settings,
Shield
} from "lucide-react";


const links = [

{
name:"Overview",
icon:<LayoutDashboard/>
},

{
name:"Users",
icon:<Users/>
},

{
name:"Projects",
icon:<Briefcase/>
},

{
name:"Analytics",
icon:<BarChart3/>
},

{
name:"Security",
icon:<Shield/>
},

{
name:"Settings",
icon:<Settings/>
}

];


export default function Sidebar(){


return (

<aside className="
w-72
min-h-screen
bg-black/40
border-r
border-white/10
p-6
hidden
lg:block
">


<div className="
mb-10
">

<h2 className="
text-xl
font-bold
">

Dragon Command

</h2>


<p className="
text-sm
text-gray-500
">

Operations Center

</p>

</div>



<nav className="space-y-3">


{
links.map((link,index)=>(

<div
key={index}
className="
flex
items-center
gap-4
p-4
rounded-xl
text-gray-300
hover:bg-yellow-500/10
hover:text-yellow-500
cursor-pointer
transition
"
>

{link.icon}

<span>
{link.name}
</span>


</div>

))
}



</nav>


</aside>

)

}
