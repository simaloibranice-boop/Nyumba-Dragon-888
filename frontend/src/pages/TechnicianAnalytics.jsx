import {
BarChart3
} from "lucide-react";


export default function TechnicianAnalytics(){


return (

<div>


<h1 className="
text-4xl
font-black
text-yellow-400
">
Technician Analytics
</h1>


<p className="
text-gray-400
mt-2
">
Performance intelligence dashboard.
</p>



<div className="
mt-10
bg-[#071A33]
border
border-white/10
rounded-3xl
p-8
">


<BarChart3
size={50}
className="
text-yellow-400
mb-5
"
/>


<h2 className="
text-2xl
font-bold
">
Performance Overview
</h2>


<div className="
grid
md:grid-cols-3
gap-5
mt-8
">


<div>
<p className="text-gray-400">
Jobs Completed
</p>

<h3 className="text-3xl font-black">
148
</h3>
</div>



<div>
<p className="text-gray-400">
Customer Rating
</p>

<h3 className="text-3xl font-black">
4.9 ⭐
</h3>
</div>



<div>
<p className="text-gray-400">
Success Rate
</p>

<h3 className="text-3xl font-black">
96%
</h3>
</div>



</div>


</div>


</div>

)

}
