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
name:"My Requests",
path:"/client/requests",
icon:<ClipboardList/>
},

{
name:"Create Request",
path:"/client/create-request",
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



const links=
role==="TECHNICIAN"
?
technician
:
client;



return (

<aside

className="
w-72
min-h-screen
bg-gradient-to-b
from-[#020617]
to-[#111827]
border-r
border-white/10
p-6
text-white
"

>


<div className="mb-10">


<h1

className="
text-2xl
font-black
text-cyan-300
"

>

888 Dragon

</h1>


<p className="text-gray-400">

Intelligent Ecosystem

</p>


</div>



<nav className="space-y-3">


{

links.map(link=>(


<Link

key={link.name}

to={link.path}

className="
flex
items-center
gap-3
px-4
py-3
rounded-xl
text-gray-200
hover:bg-cyan-400/20
hover:text-cyan-300
transition
"

>

{link.icon}

{link.name}

</Link>


))

}


</nav>




<div

className="
mt-10
p-4
rounded-xl
bg-white/5
border
border-white/10
"

>


<p className="text-gray-400 text-sm">
Current Role
</p>


<p className="font-black text-cyan-300">
{role}
</p>


</div>



</aside>

)

}
