import {Outlet} from "react-router-dom";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";


export default function DashboardLayout({role}){


return (

<div

className="
min-h-screen
flex
bg-gradient-to-br
from-slate-950
via-slate-900
to-cyan-950
text-white
"

>


<DashboardSidebar role={role}/>



<main

className="
flex-1
p-6
md:p-10
overflow-y-auto
"

>


<div

className="
glass
rounded-[45px]
min-h-full
p-6
md:p-10
"

>

<Outlet/>

</div>


</main>


</div>

)

}
