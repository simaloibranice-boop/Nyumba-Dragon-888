import {
Link
} from "react-router-dom";


export default function ClientDashboard(){


return (

<div

className="
min-h-screen
bg-gradient-to-br
from-[#020617]
via-[#071A33]
to-[#111827]
text-white
p-10
"

>


<h1

className="
text-4xl
font-black
text-cyan-300
"

>

Client Command Center 👋

</h1>


<p

className="
mt-3
text-gray-300
"

>

Manage your services, requests and trusted professionals.

</p>



<div

className="
grid
md:grid-cols-3
gap-6
mt-10
"

>


{


[

{
title:"Active Requests",
value:"0"
},

{
title:"Completed Services",
value:"0"
},

{
title:"Saved Technicians",
value:"0"
}

].map(item=>(


<div

key={item.title}

className="
bg-white/5
border
border-white/10
rounded-3xl
p-8
backdrop-blur-xl
"

>


<h2

className="
text-4xl
font-black
text-cyan-300
"

>

{item.value}

</h2>


<p className="
mt-3
text-gray-300
">

{item.title}

</p>


</div>


))


}


</div>





<div

className="
grid
md:grid-cols-2
gap-8
mt-10
"

>



<div

className="
bg-white/5
border
border-white/10
rounded-3xl
p-8
backdrop-blur-xl
"

>


<h2 className="
text-2xl
font-black
text-cyan-300
">

Request Services

</h2>



<p className="
text-gray-300
mt-3
">

Find verified professionals for your home or business.

</p>



<Link

to="/client/request"

className="
inline-block
mt-6
px-6
py-3
rounded-xl
bg-cyan-400
text-black
font-black
"

>

Create Request

</Link>



</div>





<div

className="
bg-white/5
border
border-white/10
rounded-3xl
p-8
backdrop-blur-xl
"

>


<h2

className="
text-2xl
font-black
text-cyan-300
"

>

My Requests

</h2>


<p className="
text-gray-300
mt-3
">

No requests created yet.

</p>



<Link

to="/client/requests"

className="
inline-block
mt-6
px-6
py-3
rounded-xl
border
border-cyan-300
text-cyan-300
font-bold
"

>

View Requests

</Link>



</div>



</div>





</div>

)

}
