import {
DollarSign,
TrendingUp
} from "lucide-react";


export default function TechnicianEarnings(){


return (

<div>


<h1 className="
text-4xl
font-black
text-yellow-400
">
Earnings
</h1>


<p className="
text-gray-400
mt-2
">
Track your income and payments.
</p>



<div className="
grid
md:grid-cols-3
gap-6
mt-10
">


{
[
["Total Earnings","$8,450"],
["This Month","$1,240"],
["Pending Payments","$350"]

].map(item=>(


<div
key={item[0]}
className="
bg-[#071A33]
border
border-white/10
rounded-3xl
p-8
"
>


<DollarSign
className="
text-yellow-400
mb-4
"
/>


<p className="
text-gray-400
">
{item[0]}
</p>


<h2 className="
text-3xl
font-black
mt-2
">
{item[1]}
</h2>


</div>


))

}


</div>


</div>

)

}
