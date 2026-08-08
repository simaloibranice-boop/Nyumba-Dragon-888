import {
  MapPin,
  Phone,
  Mail
} from "lucide-react";


export default function Footer(){

return (

<footer
className="
bg-black
text-white
pt-16
pb-6
"
>


<div
className="
max-w-7xl
mx-auto
px-6
grid
md:grid-cols-2
lg:grid-cols-4
gap-10
"
>


{/* BRAND */}

<div>

<div
className="
flex
items-center
gap-3
"
>

<div
className="
bg-white
text-black
rounded-xl
w-12
h-12
flex
items-center
justify-center
text-2xl
"
>
🐉
</div>


<div>

<h2
className="
font-bold
text-lg
"
>
NYŨMBA DRAGON 888
</h2>


<p
className="
text-green-500
text-xs
"
>
Smart Home. Better Living.
</p>

</div>

</div>



<p
className="
text-gray-400
mt-5
"
>
Connecting Kenyan homeowners with trusted professionals through technology.
</p>



<div
className="
flex
gap-5
mt-6
text-sm
"
>

<a
href="#"
className="
hover:text-green-500
"
>
Facebook
</a>

<a
href="#"
className="
hover:text-green-500
"
>
Instagram
</a>

<a
href="#"
className="
hover:text-green-500
"
>
LinkedIn
</a>


</div>


</div>





{/* SERVICES */}

<div>

<h3
className="
font-bold
mb-5
"
>
Services
</h3>


<ul
className="
space-y-3
text-gray-400
"
>

<li>Electrician</li>
<li>Plumbing</li>
<li>Masonry</li>
<li>Carpentry</li>
<li>Solar Installation</li>

</ul>

</div>





{/* COMPANY */}

<div>

<h3
className="
font-bold
mb-5
"
>
Company
</h3>


<ul
className="
space-y-3
text-gray-400
"
>

<li>About Us</li>
<li>How It Works</li>
<li>Careers</li>
<li>Partners</li>

</ul>


</div>





{/* CONTACT */}

<div>

<h3
className="
font-bold
mb-5
"
>
Contact
</h3>


<div
className="
space-y-4
text-gray-400
"
>


<p className="flex items-center gap-2">
<MapPin size={18}/>
Kenya
</p>


<p className="flex items-center gap-2">
<Phone size={18}/>
+254 XXX XXX XXX
</p>


<p className="flex items-center gap-2">
<Mail size={18}/>
hello@nyumbadragon.com
</p>


</div>


</div>


</div>




<div
className="
border-t
border-white/10
mt-12
pt-6
text-center
text-gray-500
text-sm
"
>

© 2026 Nyũmba Dragon 888. Built for Kenya 🇰🇪

</div>



</footer>

)

}
