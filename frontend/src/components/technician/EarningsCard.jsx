import {useEffect,useState} from "react";

import API from "../../services/api";


export default function EarningsCard(){


const [earnings,setEarnings]=useState(null);



useEffect(()=>{

loadEarnings();

},[]);




async function loadEarnings(){


try{


const response = await API.get(
"/technician/earnings"
);


setEarnings(response.data);


}
catch(error){

console.error(
"Earnings loading failed",
error
);

}


}




if(!earnings){

return (

<div className="
bg-white/5
rounded-3xl
p-6
text-white
">

Loading earnings...

</div>

)

}





return (

<div className="
bg-gradient-to-br
from-yellow-400/10
to-orange-500/10
border
border-yellow-300/20
rounded-3xl
p-6
">

<h2 className="
text-2xl
font-black
text-yellow-300
">

💰 Earnings Intelligence

</h2>



<div className="
grid
md:grid-cols-3
gap-5
mt-6
">


<div>

<p className="text-gray-400">
Completed Jobs
</p>

<h3 className="
text-3xl
font-black
text-white
">

{earnings.completed_jobs}

</h3>

</div>




<div>

<p className="text-gray-400">
Revenue Generated
</p>

<h3 className="
text-3xl
font-black
text-green-400
">

KES {Number(
earnings.total_earnings
).toLocaleString()}

</h3>

</div>




<div>

<p className="text-gray-400">
Currency
</p>

<h3 className="
text-3xl
font-black
text-white
">

{earnings.currency}

</h3>

</div>


</div>


</div>

)

}
