import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";


export default function DashboardLayout({role}){


return (

<div
className="
min-h-screen
flex
bg-gradient-to-br
from-[#020617]
via-[#071A33]
to-[#111827]
"
>


<DashboardSidebar role={role}/>


<main
className="
flex-1
p-10
overflow-y-auto
text-white
"
>

<Outlet/>

</main>


</div>

)

}
