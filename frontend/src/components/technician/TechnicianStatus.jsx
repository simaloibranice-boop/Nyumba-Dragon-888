import { useEffect, useState } from "react";

import API from "../../services/api";



export default function TechnicianStatus(){


const [profile,setProfile] = useState(null);

const [loading,setLoading] = useState(true);

const [updating,setUpdating] = useState(false);





useEffect(()=>{

loadProfile();

},[]);






async function loadProfile(){


try{


const response = await API.get(
"/technician/profile"
);


setProfile(response.data);



}
catch(error){

console.error(
"Loading technician profile failed",
error
);


}
finally{

setLoading(false);

}


}







async function updateStatus(status){


try{


setUpdating(true);



const response = await API.put(
"/technician/status",
{
availability:status
}
);



setProfile({

...profile,

availability:
response.data.availability

});



}

catch(error){


console.error(
"Status update failed",
error
);


}

finally{


setUpdating(false);


}


}







if(loading){


return (

<div className="
bg-white/5
border
border-white/10
rounded-3xl
p-6
text-white
">

Loading Dragon Intelligence...

</div>

)

}





return (

<div

className="
bg-gradient-to-br
from-cyan-400/10
to-blue-500/10
border
border-cyan-400/20
rounded-3xl
p-6
"

>


<div className="
flex
justify-between
items-center
"


>


<div>


<h2 className="
text-2xl
font-black
text-white
">

🐉 Technician Availability

</h2>


<p className="
text-gray-400
mt-2
">

{profile.name}

</p>


</div>





<div

className={`
px-5
py-2
rounded-full
font-black
${
profile.availability==="AVAILABLE"
?
"bg-green-400 text-black"
:
profile.availability==="BUSY"
?
"bg-yellow-300 text-black"
:
"bg-gray-700 text-white"
}
`}

>

{profile.availability}


</div>



</div>







<div className="
grid
md:grid-cols-3
gap-4
mt-8
">


{

["AVAILABLE","BUSY","OFFLINE"].map(status=>(


<button

key={status}

disabled={updating}

onClick={()=>updateStatus(status)}

className="
bg-white/10
border
border-white/10
rounded-xl
py-3
text-white
font-bold
hover:bg-cyan-400
hover:text-black
transition
"

>

{status}

</button>



))

}


</div>






<div className="
grid
md:grid-cols-3
gap-5
mt-8
">


<div>

<p className="text-gray-400">

Specialization

</p>

<h3 className="text-white font-bold">

{profile.specialization}

</h3>

</div>



<div>

<p className="text-gray-400">

Location

</p>

<h3 className="text-white font-bold">

{profile.location}

</h3>

</div>




<div>

<p className="text-gray-400">

Completed Jobs

</p>

<h3 className="
text-cyan-300
font-black
">

{profile.completed_jobs}

</h3>

</div>



</div>





</div>

)

}
