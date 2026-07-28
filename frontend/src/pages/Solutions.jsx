export default function Solutions(){

return (

<div className="
min-h-screen
bg-gradient-to-br
from-orange-50
via-white
to-blue-50
pt-32
px-8
">


<div className="
max-w-6xl
mx-auto
">


<h1 className="
text-5xl
font-black
text-gray-900
mb-6
">

Intelligent Solutions

</h1>


<p className="
text-xl
text-gray-600
max-w-3xl
">

Nyũmba Dragon 888 provides intelligent digital infrastructure
for managing services, operations, workforce and business growth
across Africa.

</p>



<div className="
grid
md:grid-cols-3
gap-8
mt-12
">


{
[
"Enterprise Operations",
"Workforce Intelligence",
"Smart Infrastructure"
].map(item=>(


<div

key={item}

className="
bg-white
rounded-3xl
p-8
shadow-xl
border
border-orange-100
"

>


<h2 className="
text-xl
font-bold
text-orange-500
">

{item}

</h2>


<p className="
mt-4
text-gray-600
">

Advanced systems designed for scalable
African businesses.

</p>


</div>


))

}


</div>


</div>


</div>

)

}
