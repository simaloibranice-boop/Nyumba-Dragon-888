import {
useState,
useContext
} from "react";

import {
Link,
useNavigate
} from "react-router-dom";

import {
motion
} from "framer-motion";


import {
Mail,
Phone,
User,
Lock,
Calendar
} from "lucide-react";


import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";


import FormInput from "../components/ui/FormInput";

import API from "../services/api";

import {
AuthContext
} from "../context/AuthContext";



export default function Register(){


const {
login
}=useContext(AuthContext);


const navigate=useNavigate();



const [form,setForm]=useState({

fullname:"",
username:"",
email:"",
phone:"",
age:"",
password:"",
confirmPassword:"",
role:"CLIENT"

});



const [errors,setErrors]=useState({});



function update(field,value){

setForm({

...form,

[field]:value

});

}




function validate(){

let e={};



if(!form.fullname)

e.fullname="Full name required";



if(form.username.length < 4)

e.username="Username must be at least 4 characters";



if(!/\S+@\S+\.\S+/.test(form.email))

e.email="Valid email required";



if(!form.phone)

e.phone="Phone number required";



if(form.age < 18)

e.age="Must be 18+";



if(form.password.length < 8)

e.password="Minimum 8 characters";



if(form.password !== form.confirmPassword)

e.confirmPassword="Passwords do not match";



setErrors(e);


return Object.keys(e).length===0;


}




async function submit(e){

e.preventDefault();



if(!validate())

return;



try{


const response=await API.post(

"/auth/register",

{

full_name:form.fullname,

username:form.username,

email:form.email,

phone:form.phone,

age:form.age,

password:form.password,

role:form.role

}

);



login(

response.data.token,

response.data.user

);



navigate("/");


}


catch(error){


setErrors({

server:
error.response?.data?.message ||
"Registration failed"

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
px-6
py-20
bg-gradient-to-br
from-[#020617]
via-[#071A33]
to-[#111827]
text-white
"

>



<motion.div


initial={{
opacity:0,
y:40
}}


animate={{
opacity:1,
y:0
}}


transition={{
duration:.7
}}



className="
w-full
max-w-xl
bg-white/5
border
border-white/10
backdrop-blur-xl
rounded-3xl
p-10
shadow-2xl
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



<h1

className="
text-3xl
font-black
mt-6
"

>

Create Dragon Account

</h1>



<p

className="
text-gray-300
mt-2
"

>

Join Nyũmba Dragon 888 Intelligent Ecosystem

</p>



</div>






<form

onSubmit={submit}

className="
mt-8
space-y-5
"

>




<FormInput

icon={<User/>}

placeholder="Full Name"

value={form.fullname}

onChange={
e=>update(
"fullname",
e.target.value
)
}

error={errors.fullname}

/>





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

error={errors.username}

/>






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

error={errors.email}

/>







<div

className="
bg-white
rounded-xl
p-3
text-black
"

>


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



{
errors.phone &&

<p className="text-red-400 text-sm">

{errors.phone}

</p>

}








<FormInput

icon={<Calendar/>}

placeholder="Age"

type="number"

value={form.age}

onChange={
e=>update(
"age",
e.target.value
)
}

error={errors.age}

/>








<div>


<p

className="
font-bold
text-gray-200
mb-3
"

>

Account Type

</p>




<div

className="
grid
grid-cols-2
gap-4
"

>



<button


type="button"


onClick={
()=>update(
"role",
"CLIENT"
)
}


className={

`

p-4
rounded-xl
border
font-black

${
form.role==="CLIENT"

?

"bg-cyan-400 text-black border-cyan-400"

:

"bg-white/10 text-white border-white/10"

}

`

}

>

Client

</button>







<button


type="button"


onClick={
()=>update(
"role",
"TECHNICIAN"
)
}


className={

`

p-4
rounded-xl
border
font-black

${
form.role==="TECHNICIAN"

?

"bg-cyan-400 text-black border-cyan-400"

:

"bg-white/10 text-white border-white/10"

}

`

}

>


Technician


</button>



</div>


</div>









<FormInput

icon={<Lock/>}

placeholder="Password"

type="password"

value={form.password}

onChange={
e=>update(
"password",
e.target.value
)
}

error={errors.password}

/>






<FormInput

icon={<Lock/>}

placeholder="Confirm Password"

type="password"

value={form.confirmPassword}

onChange={
e=>update(
"confirmPassword",
e.target.value
)
}

error={errors.confirmPassword}

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

Create Account

</button>





</form>







<p

className="
text-center
mt-6
text-gray-300
"

>

Already have an account?


<Link

to="/login"

className="
ml-2
text-cyan-300
font-black
"

>

Login

</Link>


</p>





</motion.div>


</div>

)


}
