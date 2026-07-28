import {
DollarSign,
TrendingUp
} from "lucide-react";


export default function Earnings(){


return (

<div>


<h1 className="
text-4xl
font-black
text-white
">
Earnings
</h1>


<p className="
text-slate-400
mt-2
mb-8
">
Track your technician income.
</p>




<div className="
grid
md:grid-cols-3
gap-6
">


<div className="
bg-white/5
border
border-white/10
rounded-2xl
p-6
">

<DollarSign
className="
text-cyan-300
"
/>


<h2 className="
text-slate-400
mt-5
">
Total Earnings
</h2>


<p className="
text-3xl
font-black
text-white
">
$8,450
</p>


</div>




<div className="
bg-white/5
border
border-white/10
rounded-2xl
p-6
">


<TrendingUp
className="
text-cyan-300
"
/>


<h2 className="
text-slate-400
mt-5
">
This Month
</h2>


<p className="
text-3xl
font-black
text-white
">
$1,250
</p>


</div>


</div>


</div>

)

}
