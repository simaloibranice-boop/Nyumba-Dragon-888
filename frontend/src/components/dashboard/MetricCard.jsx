export default function MetricCard({
    title,
    value,
    icon,
    description
}){

    return (

        <div
        className="
        bg-white/5
        backdrop-blur-xl
        border
        border-white/10
        rounded-3xl
        p-6
        shadow-xl
        hover:border-cyan-400/40
        transition
        "
        >

            <div className="
            flex
            justify-between
            items-center
            mb-4
            ">

                <h3 className="
                text-gray-400
                font-bold
                uppercase
                text-sm
                ">
                    {title}
                </h3>


                <div className="
                text-3xl
                ">
                    {icon}
                </div>


            </div>



            <h2 className="
            text-4xl
            font-black
            text-cyan-300
            ">
                {value}
            </h2>



            <p className="
            text-gray-400
            mt-2
            text-sm
            ">
                {description}
            </p>


        </div>

    )

}
