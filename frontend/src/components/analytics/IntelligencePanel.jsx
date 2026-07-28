import {
Sparkles,
TrendingUp,
ShieldCheck
} from "lucide-react";


export default function IntelligencePanel(){


return (

<div className="
p-6
rounded-2xl
bg-gradient-to-br
from-yellow-500/20
to-black
border
border-yellow-500/20
">


<h3 className="
text-xl
font-bold
flex
items-center
gap-3
">

<Sparkles className="text-yellow-500"/>

Dragon Intelligence

</h3>



<div className="
mt-6
space-y-4
text-gray-300
">


<p className="flex gap-3">

<TrendingUp className="text-yellow-500"/>

Growth prediction:
+34% next quarter

</p>


<p className="flex gap-3">

<ShieldCheck className="text-yellow-500"/>

Security status:
Optimal

</p>


</div>


</div>

)

}
