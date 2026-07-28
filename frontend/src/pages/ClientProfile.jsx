import {useState} from "react";


export default function ClientProfile(){


const [profile,setProfile]=useState({

name:"Branice Nashilu",
phone:"+254700000000",
location:"Nairobi",
email:"client@example.com"

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
text-white
p-10
"

>


<div

className="
max-w-3xl
bg-white/5
border
border-white/10
rounded-3xl
p-8
backdrop-blur-xl
"

>


<h1

className="
text-4xl
font-black
text-cyan-300
"

>

Client Profile

</h1>




<div className="mt-8 space-y-5">


{
Object.keys(profile).map(field=>(


<div key={field}>


<label className="
text-gray-300
capitalize
"
>

{field}

</label>


<input

value={profile[field]}

onChange={
e=>update(
field,
e.target.value
)
}

className="
w-full
mt-2
p-3
rounded-xl
bg-black/30
border
border-white/10
text-white
"

/>


</div>


))

}



</div>




<button

className="
mt-8
px-6
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
