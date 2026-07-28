export default function ActivityFeed(){


const activities=[

"New client registered",

"Project Dragon Tower updated",

"Security scan completed",

"New service request received"

];


return (

<div className="
p-6
rounded-2xl
bg-white/5
border
border-white/10
">


<h3 className="
font-bold
text-xl
mb-6
">

Recent Activity

</h3>



<div className="space-y-4">


{
activities.map((item,index)=>(

<div
key={index}
className="
border-b
border-white/10
pb-3
text-gray-300
"
>

{item}

</div>

))
}



</div>


</div>

)

}
