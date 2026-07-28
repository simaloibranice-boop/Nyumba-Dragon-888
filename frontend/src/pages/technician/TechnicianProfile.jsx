import {useState} from "react";


export default function TechnicianProfile(){


const [profile,setProfile]=useState({

name:"John Technician",
phone:"0712345678",
location:"Nairobi",
skills:"Solar Installation, Electrical Work"

});


function update(field,value){

setProfile({

...profile,
[field]:value

});

}



return (

<div
className="
min-h-screen
bg-gradient-to-br
from-[#020617]
via-[#071A33]
to-[#111827]
p-10
text-white
"
>


<div
className="
max-w-3xl
mx-auto
bg-white/5
border
border-white/10
rounded-3xl
p-8
"
>


<h1
className="
text-4xl
font-black
text-cyan-300
mb-8
"
>

Edit Technician Profile

</h1>



{
Object.keys(profile).map(field=>(


<div
key={field}
className="mb-5"
>


<label className="
block
text-gray-300
mb-2
capitalize
">

{field}

</label>


<input

value={profile[field]}

onChange={
(e)=>update(field,e.target.value)
}

className="
w-full
bg-black/40
border
border-white/20
rounded-xl
p-3
text-white
"

/>


</div>


))

}




<button

className="
px-8
py-3
rounded-xl
bg-cyan-400
text-black
font-black
"

>

Save Profile

</button>



</div>


</div>

)

}
