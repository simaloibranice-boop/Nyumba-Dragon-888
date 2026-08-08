import { useEffect, useState } from "react";

import API from "../../services/api";


export default function PerformancePanel(){


const [performance,setPerformance] = useState(null);



useEffect(()=>{

loadPerformance();

},[]);





async function loadPerformance(){


try{


const response = await API.get(
"/technician/performance"
);


setPerformance(response.data);


}

catch(error){

console.error(
"Performance loading failed",
error
);

}


}







if(!performance){


return (

<div className="
bg-white/5
border
border-white/10
rounded-3xl
p-6
text-white
">

Loading performance intelligence...

</div>

)

}





return (

<div

className="
bg-gradient-to-br
from-purple-500/10
to-cyan-500/10
border
border-white/10
rounded-3xl
p-6
"

>


<h2 className="
text-2xl
font-black
text-purple-300
">

📊 Performance Intelligence

</h2>



<div className="
grid
md:grid-cols-4
gap-5
mt-6
">



<div>

<p className="text-gray-400">
Rating
</p>

<h3 className="
text-3xl
font-black
text-yellow-300
">

⭐ {performance.rating}

</h3>

</div>





<div>

<p className="text-gray-400">
Completed Jobs
</p>

<h3 className="
text-3xl
font-black
text-white
">

{performance.completed_jobs}

</h3>

</div>





<div>

<p className="text-gray-400">
Active Jobs
</p>

<h3 className="
text-3xl
font-black
text-cyan-300
">

{performance.active_jobs}

</h3>

</div>





<div>

<p className="text-gray-400">
Reliability
</p>

<h3 className="
text-3xl
font-black
text-green-400
">

{performance.reliability_score}%

</h3>

</div>



</div>






<div className="
mt-6
text-gray-300
">

📍 Service Area:

<span className="
text-white
font-bold
">

 {performance.service_area}

</span>


</div>





</div>

)

}
