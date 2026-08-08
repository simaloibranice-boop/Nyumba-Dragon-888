export default function GlassCard({
children,
className=""
}){

return (

<div

className={`
glass
p-8
text-white
${className}
`}

>

{children}

</div>

)

}
