import {
getRequests
} from "../services/marketplace";



export default function ClientRequests(){


const requests=getRequests();



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


<h1 className="
text-4xl
font-black
text-cyan-300
">

My Requests

</h1>



<div className="
mt-10
space-y-5
">

{

requests.length===0

?

<p>
No requests yet
</p>

:

requests.map(request=>(


<div

key={request.id}

className="
bg-white/5
border
border-white/10
rounded-3xl
p-6
"

>


<h2 className="
text-2xl
font-black
">

{request.service}

</h2>



<p>
Location:
{request.location}
</p>


<p>
Budget:

<span className="
text-yellow-300
font-bold
">

 KSh {request.price.toLocaleString()}

</span>

</p>


<p className="
text-cyan-300
mt-3
">

Status:
{request.status}

</p>



</div>


))

}


</div>



</div>

)

}
