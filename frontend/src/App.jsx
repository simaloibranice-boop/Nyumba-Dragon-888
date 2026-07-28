import {
BrowserRouter,
Routes,
Route
} from "react-router-dom";


// PUBLIC PAGES

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Services from "./pages/Services";
import ServiceDetails from "./pages/services/ServiceDetails";

import Company from "./pages/Company";



// DASHBOARD LAYOUT

import DashboardLayout from "./layouts/DashboardLayout";



// TECHNICIAN

import TechnicianDashboard from "./pages/TechnicianDashboard";

import TechnicianJobs from "./pages/technician/TechnicianJobs";

import TechnicianJobDetails from "./pages/technician/TechnicianJobDetails";

import TechnicianEarnings from "./pages/technician/TechnicianEarnings";

import TechnicianAnalytics from "./pages/technician/TechnicianAnalytics";

import TechnicianProfile from "./pages/technician/TechnicianProfile";

import TechnicianSettings from "./pages/technician/TechnicianSettings";



// CLIENT

import ClientDashboard from "./pages/ClientDashboard";

import CreateRequest from "./pages/client/CreateRequest";

import ClientRequests from "./pages/ClientRequests";

import ClientProfile from "./pages/ClientProfile";

import ClientSettings from "./pages/ClientSettings";



// ADMIN

import AdminDashboard from "./pages/AdminDashboard";



export default function App(){


return (

<BrowserRouter>


<Routes>


{/* ================= PUBLIC ================= */}



<Route

path="/"

element={<Home/>}

/>



<Route

path="/login"

element={<Login/>}

/>



<Route

path="/register"

element={<Register/>}

/>



<Route

path="/services"

element={<Services/>}

/>



<Route

path="/services/:name"

element={<ServiceDetails/>}

/>



<Route

path="/company"

element={<Company/>}

/>





{/* ================= TECHNICIAN ================= */}



<Route

path="/technician"

element={
<DashboardLayout role="TECHNICIAN"/>
}

>


<Route

index

element={
<TechnicianDashboard/>
}

/>



<Route

path="jobs"

element={
<TechnicianJobs/>
}

/>



<Route

path="jobs/:id"

element={
<TechnicianJobDetails/>
}

/>



<Route

path="earnings"

element={
<TechnicianEarnings/>
}

/>



<Route

path="analytics"

element={
<TechnicianAnalytics/>
}

/>



<Route

path="profile"

element={
<TechnicianProfile/>
}

/>



<Route

path="settings"

element={
<TechnicianSettings/>
}

/>


</Route>







{/* ================= CLIENT ================= */}



<Route

path="/client"

element={
<DashboardLayout role="CLIENT"/>
}

>


<Route

index

element={
<ClientDashboard/>
}

/>



<Route

path="request"

element={
<CreateRequest/>
}

/>



<Route

path="requests"

element={
<ClientRequests/>
}

/>



<Route

path="profile"

element={
<ClientProfile/>
}

/>



<Route

path="settings"

element={
<ClientSettings/>
}

/>



</Route>







{/* ================= ADMIN ================= */}



<Route

path="/admin"

element={
<DashboardLayout role="ADMIN"/>
}

>


<Route

index

element={
<AdminDashboard/>
}

/>


</Route>





</Routes>


</BrowserRouter>

)

}
