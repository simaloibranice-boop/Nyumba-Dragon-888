import { useState } from "react";


export default function ClientRequests(){


const [requests,setRequests]=useState([

{
id:1,
service:"Solar Installation",
location:"Nairobi",
status:"Pending",
price:"KSh 85,000"
},

{
id:2,
service:"Electrical Repair",
location:"Kiambu",
status:"Assigned",
price:"KSh 25,000"
}


]);



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

My Service Requests

</h1>



<p

className="
mt-3
text-gray-300
"

>

Track your Dragon marketplace services.

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
requests.map(request=>(


<div

key={request.id}

className="
bg-white/5
border
border-white/10
rounded-3xl
p-6
backdrop-blur-xl
"

>


<h2

className="
text-xl
font-black
text-cyan-300
"

>

{request.service}

</h2>



<div className="
mt-5
space-y-3
text-white
">


<p>
Location:
{request.location}
</p>


<p>
Status:
<span className="text-yellow-300">
{request.status}
</span>
</p>


<p>
Price:
<span className="text-cyan-300 font-black">
{request.price}
</span>
</p>


</div>



<button

className="
mt-6
px-5
py-3
rounded-xl
bg-cyan-400
text-black
font-black
"

>

View Request

</button>



</div>


))

}


</div>



</div>

)

}
