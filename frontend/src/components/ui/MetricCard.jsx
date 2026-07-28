export default function MetricCard({title,value}) {

return (

<div className="
p-6
rounded-3xl
bg-white
shadow-lg
border
border-gray-100
">

<p className="text-gray-500 text-sm">
{title}
</p>

<h2 className="
text-3xl
font-bold
text-gray-900
mt-2
">
{value}
</h2>

</div>

)

}
