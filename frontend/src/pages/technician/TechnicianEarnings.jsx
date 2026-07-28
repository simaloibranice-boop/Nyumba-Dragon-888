import { Wallet } from "lucide-react";


export default function TechnicianEarnings(){


return (

<div className="space-y-8">


<h1 className="
text-4xl
font-black
text-white
">

Earnings

</h1>


<p className="text-gray-300">
Track your Dragon service income.
</p>



<div className="
grid
md:grid-cols-3
gap-6
">


{
[
["Monthly Earnings","KSh 320,000"],
["Completed Jobs","148"],
["Lifetime Revenue","KSh 1,450,000"]
].map(item=>(


<div
key={item[0]}
className="
bg-white/5
border
border-white/10
rounded-3xl
p-6
backdrop-blur-xl
"
>


<Wallet
className="
text-cyan-300
mb-4
"
/>


<p className="text-gray-300">
{item[0]}
</p>


<h2 className="
text-3xl
font-black
text-white
mt-3
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
