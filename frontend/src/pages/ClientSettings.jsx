import {useState} from "react";


export default function ClientSettings(){


const [settings,setSettings]=useState({

availability:true,
notifications:true,
security:true

});



function toggle(field){

setSettings({

...settings,

[field]:!settings[field]

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

Client Settings

</h1>



<p

className="
mt-3
text-gray-300
"

>

Manage your Nyũmba Dragon account preferences.

</p>





<div className="mt-8 space-y-5">



<div

className="
flex
justify-between
items-center
bg-black/30
p-5
rounded-2xl
"

>


<div>

<h2 className="font-bold">
Service Availability
</h2>


<p className="text-gray-400">
Allow technicians to contact you.
</p>

</div>



<button

onClick={()=>toggle("availability")}

className={`
px-5
py-2
rounded-xl
font-black

${
settings.availability
?
"bg-cyan-400 text-black"
:
"bg-gray-700 text-white"
}

`}

>

{
settings.availability
?
"ON"
:
"OFF"
}

</button>



</div>






<div

className="
flex
justify-between
items-center
bg-black/30
p-5
rounded-2xl
"

>


<div>

<h2 className="font-bold">
Notifications
</h2>


<p className="text-gray-400">
Receive updates about requests.
</p>

</div>



<button

onClick={()=>toggle("notifications")}

className={`
px-5
py-2
rounded-xl
font-black

${
settings.notifications
?
"bg-cyan-400 text-black"
:
"bg-gray-700 text-white"
}

`}

>

{
settings.notifications
?
"ON"
:
"OFF"
}

</button>



</div>







<div

className="
flex
justify-between
items-center
bg-black/30
p-5
rounded-2xl
"

>


<div>

<h2 className="font-bold">
Security
</h2>


<p className="text-gray-400">
Manage account protection.
</p>

</div>



<button

onClick={()=>toggle("security")}

className={`
px-5
py-2
rounded-xl
font-black

${
settings.security
?
"bg-cyan-400 text-black"
:
"bg-gray-700 text-white"
}

`}

>

{
settings.security
?
"Protected"
:
"Disabled"
}

</button>



</div>



</div>




<button

className="
mt-8
px-8
py-3
rounded-xl
bg-cyan-400
text-black
font-black
"

>

Save Changes

</button>



</div>


</div>


)

}
