export default function LocationPanel(){

    return (

        <div
        className="
        bg-white/5
        border
        border-white/10
        rounded-3xl
        p-6
        "
        >

            <h2 className="
            text-2xl
            font-black
            text-white
            ">
                Location Intelligence
            </h2>


            <div className="
            mt-5
            text-gray-300
            space-y-3
            ">

                <p>
                📍 Active Zone:
                <span className="
                text-cyan-300
                font-bold
                ">
                Nairobi County
                </span>
                </p>


                <p>
                Nearby Requests:
                <span className="
                text-yellow-300
                font-bold
                ">
                7
                </span>
                </p>


                <p>
                Dispatch Status:
                <span className="
                text-green-300
                font-bold
                ">
                Ready
                </span>
                </p>


            </div>


        </div>

    )

}
