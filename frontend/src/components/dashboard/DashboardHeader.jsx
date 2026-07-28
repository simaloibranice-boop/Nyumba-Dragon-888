export default function DashboardHeader({
title,
subtitle
}){


return (

<div
className="
mb-10
"
>


<h1
className="
text-4xl
font-black
text-slate-100
tracking-tight
"
>

{title}

</h1>


<p
className="
text-slate-400
mt-3
"
>

{subtitle}

</p>


</div>

)

}
