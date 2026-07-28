import {
Bell,
Lock,
Shield
} from "lucide-react";


export default function Settings(){


const items=[

{
title:"Notifications",
icon:Bell
},

{
title:"Security",
icon:Lock
},

{
title:"Account Protection",
icon:Shield
}

];


return (

<div>


<h1 className="
text-4xl
font-black
text-white
">
Technician Settings
</h1>



<div className="
mt-8
grid
md:grid-cols-3
gap-6
">


{
items.map(item=>{

const Icon=item.icon;


return (

<div

key={item.title}

className="
bg-white/5
border
border-white/10
rounded-2xl
p-6
"

>


<Icon
className="
text-cyan-300
"
/>


<h2 className="
text-white
font-bold
mt-4
">
{item.title}
</h2>


</div>


)

})

}


</div>


</div>

)

}
