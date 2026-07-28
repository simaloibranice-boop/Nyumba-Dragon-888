export default function TechnicianSettings(){

return (

<div>

<h1 className="
text-4xl
font-black
text-yellow-400
">
Settings
</h1>


<div className="
mt-8
space-y-4
">


{
[
"Notifications",
"Availability Status",
"Security",
"Account Preferences"
].map(setting=>(


<div
key={setting}
className="
bg-white/5
border
border-yellow-500/20
rounded-2xl
p-5
"
>

{setting}

</div>


))

}


</div>


</div>

)

}
