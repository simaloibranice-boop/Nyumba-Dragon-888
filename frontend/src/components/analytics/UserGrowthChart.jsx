import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
} from "recharts";


const data=[

{
month:"Jan",
users:400
},

{
month:"Feb",
users:900
},

{
month:"Mar",
users:1500
},

{
month:"Apr",
users:2600
},

{
month:"May",
users:4000
}

];


export default function UserGrowthChart(){


return (

<div className="
p-6
rounded-2xl
bg-white/5
border
border-white/10
">


<h3 className="
text-xl
font-bold
mb-6
">

User Growth

</h3>



<ResponsiveContainer
width="100%"
height={300}
>


<BarChart data={data}>


<XAxis dataKey="month"/>


<YAxis/>


<Tooltip/>


<Bar

dataKey="users"

fill="#d4af37"

/>


</BarChart>


</ResponsiveContainer>


</div>

)

}
