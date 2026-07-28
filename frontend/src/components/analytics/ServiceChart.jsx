import {
PieChart,
Pie,
Cell,
Tooltip,
ResponsiveContainer
} from "recharts";


const data=[

{
name:"Engineering",
value:40
},

{
name:"Construction",
value:30
},

{
name:"Technology",
value:20
},

{
name:"Consulting",
value:10
}

];


const COLORS=[

"#d4af37",
"#ffffff",
"#888888",
"#444444"

];


export default function ServiceChart(){


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

Service Distribution

</h3>



<ResponsiveContainer
width="100%"
height={300}
>


<PieChart>


<Pie

data={data}

dataKey="value"

outerRadius={100}

label

>


{
data.map((entry,index)=>(

<Cell

key={index}

fill={COLORS[index]}

/>

))
}


</Pie>


<Tooltip/>


</PieChart>


</ResponsiveContainer>


</div>

)

}
