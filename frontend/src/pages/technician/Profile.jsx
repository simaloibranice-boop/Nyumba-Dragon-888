import {
User,
MapPin,
Phone,
Award
} from "lucide-react";


export default function Profile(){


return (

<div>


<h1 className="
text-4xl
font-black
text-white
">
Technician Profile
</h1>



<div className="
mt-8
bg-white/5
border
border-white/10
rounded-2xl
p-8
space-y-5
">


<div className="flex gap-3 text-white">

<User className="text-cyan-300"/>

Professional Technician

</div>



<div className="flex gap-3 text-white">

<Phone className="text-cyan-300"/>

+254 700 000000

</div>



<div className="flex gap-3 text-white">

<MapPin className="text-cyan-300"/>

Nairobi Kenya

</div>



<div className="flex gap-3 text-white">

<Award className="text-cyan-300"/>

Verified Dragon Technician

</div>


</div>


</div>

)

}
