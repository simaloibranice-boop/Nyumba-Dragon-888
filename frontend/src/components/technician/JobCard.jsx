export default function JobCard({job}){


return (

<div
className="
bg-white/5
border
border-white/10
rounded-3xl
p-6
backdrop-blur-xl
shadow-xl
"
>


<h2
className="
text-xl
font-black
text-cyan-300
"
>

{job.service}

</h2>


<div
className="
mt-5
space-y-3
text-gray-300
"
>


<p>
👤 Customer:
<span className="ml-2 font-bold text-white">
{job.customer}
</span>
</p>



<p>
📍 Location:
<span className="ml-2 font-bold text-white">
{job.location}
</span>
</p>



<p>
📝 Description:
</p>

<p className="text-gray-400">
{job.description}
</p>



<p>
🛠 Labour Specification:
</p>

<p className="text-gray-400">
{job.specification}
</p>



<p>
💰 Price:
<span
className="
ml-2
font-black
text-cyan-300
"
>
KSh {job.price.toLocaleString()}
</span>
</p>



</div>




<button
className="
mt-6
w-full
rounded-xl
bg-cyan-400
py-3
font-black
text-black
hover:bg-cyan-300
transition
"
>

View Job Details

</button>


</div>

)

}
