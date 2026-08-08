import {Link} from "react-router-dom";

import {
LayoutDashboard,
Briefcase,
Wallet,
BarChart3,
User,
Settings,
ClipboardList,
PlusCircle
} from "lucide-react";



export default function DashboardSidebar({role}){


const technician=[

{
name:"Dashboard",
path:"/technician",
icon:<LayoutDashboard/>
},

{
name:"Jobs",
path:"/technician/jobs",
icon:<Briefcase/>
},

{
name:"Earnings",
path:"/technician/earnings",
icon:<Wallet/>
},

{
name:"Analytics",
path:"/technician/analytics",
icon:<BarChart3/>
},

{
name:"Profile",
path:"/technician/profile",
icon:<User/>
},

{
name:"Settings",
path:"/technician/settings",
icon:<Settings/>
}

];



const client=[

{
name:"Dashboard",
path:"/client",
icon:<LayoutDashboard/>
},

{
name:"Requests",
path:"/client/requests",
icon:<ClipboardList/>
},

{
name:"Create Request",
path:"/client/request",
icon:<PlusCircle/>
},

{
name:"Profile",
path:"/client/profile",
icon:<User/>
},

{
name:"Settings",
path:"/client/settings",
icon:<Settings/>
}

];



const links =
role==="TECHNICIAN"
?
technician
:
client;



return (

<aside

className="
hidden
md:flex
w-80
min-h-screen
p-6
"

>


<div

className="
glass
rounded-[45px]
p-6
w-full
"

>


<div className="mb-10 text-center">


<div

className="
mx-auto
w-20
h-20
rounded-[35px]
clay
flex
items-center
justify-center
text-3xl
font-black
text-cyan-300
"

>

888

</div>


<h1 className="
mt-4
text-2xl
font-black
">

Dragon

</h1>


<p className="
text-white/50
text-sm
">

Intelligent Ecosystem

</p>


</div>





<nav className="space-y-3">


{
links.map(item=>(


<Link

key={item.name}

to={item.path}

className="
flex
items-center
gap-4
p-4
rounded-3xl
text-white/80
hover:bg-white/10
hover:text-cyan-300
transition
"

>

{item.icon}

<span className="font-bold">
{item.name}
</span>


</Link>


))

}


</nav>





<div

className="
mt-10
clay
rounded-3xl
p-4
text-center
"

>

<p className="
text-white/50
text-sm
">

Role

</p>


<p className="
font-black
text-cyan-300
">

{role}

</p>


</div>



</div>


</aside>

)

}
