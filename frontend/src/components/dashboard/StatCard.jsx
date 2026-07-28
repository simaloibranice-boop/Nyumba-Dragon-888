export default function StatCard({
title,
value,
icon
}){


return (

<div

className="
bg-white/5
backdrop-blur-xl
rounded-3xl
p-6
border
border-white/10
shadow-xl
hover:border-cyan-400/40
transition
"

>


<div
className="
flex
justify-between
items-center
"
>


<div>

<p
className="
text-slate-400
text-sm
font-medium
"
>

{title}

</p>


<h2

className="
text-3xl
font-black
text-white
mt-2
"

>

{value}

</h2>


</div>



<div

className="
w-12
h-12
rounded-2xl
bg-cyan-400/10
flex
items-center
justify-center
text-cyan-300
font-bold
"

>

{icon}

</div>



</div>


</div>


)

}
