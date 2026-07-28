export default function PasswordStrength({password}){


function strength(){

if(password.length < 4)
return "Weak";

if(password.length < 8)
return "Medium";

if(
password.match(/[A-Z]/) &&
password.match(/[0-9]/) &&
password.length >= 8
)
return "Strong";


return "Good";

}


const result=strength();


return (

<div className="mt-2 ml-2 text-sm">

<span className="
text-gray-500
">

Password strength:

</span>


<span className={`

ml-2
font-bold

${
result==="Strong"
?
"text-green-500"
:
result==="Medium"
?
"text-yellow-500"
:
"text-red-500"
}

`}>

{result}

</span>


</div>

)

}
