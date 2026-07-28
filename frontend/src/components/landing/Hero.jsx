import GradientText from "../ui/GradientText";
import GlassCard from "../ui/GlassCard";


export default function Hero(){

return (

<section className="
min-h-screen
bg-gradient-to-br
from-[#fffaf0]
via-white
to-orange-50
flex
items-center
px-10
">

<div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">


<div>

<h1 className="
text-6xl
font-black
leading-tight
text-gray-900
">

The Intelligent
<br/>

<GradientText>
African Workforce
</GradientText>

<br/>

Operating System

</h1>


<p className="
mt-6
text-xl
text-gray-600
max-w-xl
">

Nyũmba Dragon 888 connects people,
services and intelligence into one
powerful ecosystem.

</p>


<button
className="
mt-8
px-8
py-4
rounded-full
bg-black
text-white
font-bold
hover:bg-orange-600
transition
"
>
Enter Dragon Platform
</button>


</div>



<GlassCard className="p-10">

<div className="space-y-6">

<h3 className="
text-2xl
font-bold
">
Dragon Intelligence
</h3>


<div>
<p>Regional Coverage</p>
<h2 className="text-4xl font-bold">
47 Counties
</h2>
</div>


<div>
<p>Active Workforce</p>
<h2 className="text-4xl font-bold">
12,840
</h2>
</div>


<div>
<p>AI Operations</p>
<h2 className="text-4xl font-bold">
ONLINE
</h2>
</div>


</div>

</GlassCard>


</div>

</section>

)

}
