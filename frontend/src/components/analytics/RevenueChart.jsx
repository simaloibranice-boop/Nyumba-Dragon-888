import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
} from "recharts";


const data=[

{
month:"Jan",
revenue:4000
},

{
month:"Feb",
revenue:7000
},

{
month:"Mar",
revenue:12000
},

{
month:"Apr",
revenue:18000
},

{
month:"May",
revenue:25000
}

];


export default function RevenueChart(){


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

Revenue Growth

</h3>



<ResponsiveContainer
width="100%"
height={300}
>


<LineChart data={data}>


<XAxis dataKey="month"/>


<YAxis/>


<Tooltip/>


<Line

type="monotone"

dataKey="revenue"

stroke="#d4af37"

strokeWidth={3}

/>


</LineChart>


</ResponsiveContainer>


</div>

)

}
