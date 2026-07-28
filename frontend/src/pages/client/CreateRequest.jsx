import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {
addRequest
} from "../../services/marketplace";



export default function CreateRequest(){


const navigate=useNavigate();



const [form,setForm]=useState({

service:"",
location:"",
description:"",
budget:""

});



const [message,setMessage]=useState("");



function update(field,value){

setForm({

...form,

[field]:value

});

}



function submit(e){

e.preventDefault();



const request={

id:Date.now(),

service:form.service,

customer:"Dragon Client",

location:form.location,

description:form.description,

labour:
"Professional assessment and completion required",

price:Number(form.budget),

status:"PENDING"

};



addRequest(request);



setMessage(
"Request submitted successfully"
);



setTimeout(()=>{

navigate("/client/requests");

},1000);


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
mx-auto
bg-white/5
border
border-white/10
rounded-3xl
p-10
backdrop-blur-xl
"

>


<h1 className="
text-4xl
font-black
text-cyan-300
">

Create Service Request

</h1>



<form

onSubmit={submit}

className="
mt-8
space-y-5
"

>


<input

required

placeholder="Service Required"

className="
w-full
p-4
rounded-xl
bg-black/30
border
border-white/10
text-white
"

onChange={
e=>update(
"service",
e.target.value
)
}

/>



<input

required

placeholder="Location"

className="
w-full
p-4
rounded-xl
bg-black/30
border
border-white/10
text-white
"

onChange={
e=>update(
"location",
e.target.value
)
}

/>



<textarea

required

placeholder="Describe the work"

className="
w-full
p-4
rounded-xl
bg-black/30
border
border-white/10
text-white
"

onChange={
e=>update(
"description",
e.target.value
)
}

/>



<input

required

type="number"

placeholder="Budget KSh"

className="
w-full
p-4
rounded-xl
bg-black/30
border
border-white/10
text-white
"

onChange={
e=>update(
"budget",
e.target.value
)
}

/>



<button

className="
w-full
py-4
rounded-xl
bg-cyan-400
text-black
font-black
"

>

Submit Request

</button>



</form>




{

message &&

<p className="
mt-5
text-green-300
font-bold
">

{message}

</p>

}



</div>


</div>

)

}
