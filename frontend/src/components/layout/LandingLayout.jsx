import Navbar from "./Navbar";
import Footer from "./Footer";


export default function LandingLayout({ children }) {

    return (

        <div 
        className="
        min-h-screen
        bg-gradient-to-br
        from-[#fff8f0]
        via-white
        to-[#eaf7ff]
        text-gray-900
        overflow-hidden
        ">

            <Navbar />

            <main className="pt-28">

                {children}

            </main>

            <Footer />

        </div>

    );

}
