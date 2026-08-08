export default function AuthInput({
label,
icon:Icon,
error,
...props
}) {


return (

<div className="mb-5">


<label

className="
block
mb-2
text-sm
font-bold
text-white/70
"

>

{label}

</label>



<div

className="

flex
items-center
gap-3

rounded-3xl

glass

px-5
py-4

focus-within:ring-2
focus-within:ring-cyan-400

transition

"

>


{

Icon &&

<Icon

size={20}

className="
text-cyan-300
"

/>

}



<input

{...props}

className="

w-full

bg-transparent

outline-none

text-white

placeholder:text-white/40

"

/>



</div>



{

error &&

<p

className="
mt-2
text-sm
text-red-400
"

>

{error}

</p>

}



</div>

)

}
