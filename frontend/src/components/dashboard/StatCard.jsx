export default function StatCard({
title,
value,
icon,
color="green"
}){


return (

<div

className="
bg-white
rounded-3xl
p-6
border
shadow-sm
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
text-black
font-bold
"

>

{title}

</p>



<h2

className="
text-3xl
font-black
text-black
mt-3
"

>

{value}

</h2>


</div>


<div

className="
bg-green-100
text-green-700
p-4
rounded-2xl
"

>

{icon}

</div>


</div>


</div>


)

}
