import { useState,useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
User,
Mail,
Lock
} from "lucide-react";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import FormInput from "../components/ui/FormInput";

import API from "../services/api";
import {AuthContext} from "../context/AuthContext";


export default function Login(){


const {login}=useContext(AuthContext);

const navigate=useNavigate();


const [method,setMethod]=useState("username");


const [form,setForm]=useState({

username:"",
email:"",
phone:"",
password:""

});


const [errors,setErrors]=useState({});



function update(field,value){

setForm({

...form,

[field]:value

});

}



async function submit(e){

e.preventDefault();


try{


const response=await API.post(

"/auth/login",

{

username:
method==="username"
?
form.username
:
undefined,


email:
method==="email"
?
form.email
:
undefined,


phone:form.phone,

password:form.password

}

);



login(

response.data.token,

response.data.user

);



const role=response.data.user.role;


if(role==="TECHNICIAN")

navigate("/technician");


else if(role==="CLIENT")

navigate("/client");


else

navigate("/");


}


catch(error){

setErrors({

server:
error.response?.data?.message ||
"Login failed"

});

}


}




return (

<div
className="
min-h-screen
flex
items-center
justify-center
bg-gradient-to-br
from-[#020617]
via-[#071A33]
to-[#111827]
px-6
"
>


<motion.div

initial={{opacity:0,y:30}}

animate={{opacity:1,y:0}}

className="
w-full
max-w-md
bg-white/5
border
border-white/10
rounded-3xl
backdrop-blur-xl
p-10
text-white
"

>


<div className="text-center">


<div
className="
mx-auto
w-20
h-20
rounded-3xl
bg-gradient-to-br
from-cyan-400
to-blue-600
flex
items-center
justify-center
font-black
text-3xl
"
>
888
</div>


<h1 className="
text-3xl
font-black
mt-6
"
>

Welcome Back Dragon

</h1>


<p className="text-gray-300 mt-2">
Access your intelligent ecosystem
</p>


</div>




<div className="
flex
bg-black/30
rounded-full
p-1
mt-8
">


<button

type="button"

onClick={()=>setMethod("username")}

className="
flex-1
py-3
rounded-full
font-bold
"

>

Username

</button>


<button

type="button"

onClick={()=>setMethod("email")}

className="
flex-1
py-3
rounded-full
font-bold
"

>

Email

</button>


</div>




<form
onSubmit={submit}
className="mt-6 space-y-5"
>



{
method==="username"

?

<FormInput

icon={<User/>}

placeholder="Username"

value={form.username}

onChange={
e=>update(
"username",
e.target.value
)
}

/>


:

<FormInput

icon={<Mail/>}

placeholder="Email"

value={form.email}

onChange={
e=>update(
"email",
e.target.value
)
}

/>

}





<div className="
bg-white
rounded-xl
p-3
text-black
">

<PhoneInput

international

defaultCountry="KE"

value={form.phone}

onChange={
value=>update(
"phone",
value
)
}

/>

</div>




<FormInput

icon={<Lock/>}

type="password"

placeholder="Password"

value={form.password}

onChange={
e=>update(
"password",
e.target.value
)
}

/>




{
errors.server &&

<p className="text-red-400">
{errors.server}
</p>

}




<button

className="
w-full
py-4
rounded-full
bg-cyan-400
text-black
font-black
hover:bg-cyan-300
transition
"

>

Login

</button>


</form>



<p className="text-center mt-6 text-gray-300">

New to Nyũmba Dragon?

<Link

to="/register"

className="
ml-2
text-cyan-300
font-bold
"

>

Register

</Link>

</p>


</motion.div>


</div>


)

}
