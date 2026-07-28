import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import ClientProfile from "./pages/ClientProfile";
import ClientSettings from "./pages/ClientSettings";
import TechnicianDashboard from "./pages/TechnicianDashboard";

import DashboardRedirect from "./pages/DashboardRedirect";


import Solutions from "./pages/Solutions";
import Services from "./pages/Services";
import Intelligence from "./pages/Intelligence";
import Company from "./pages/Company";
import Investors from "./pages/Investors";



function App(){


return (

<BrowserRouter>

<Routes>


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
path="/dashboard"
element={<DashboardRedirect/>}
/>


<Route
path="/admin"
element={<AdminDashboard/>}
/>


<Route
path="/client"
element={<ClientDashboard/>}
/>

<Route
path="/client/profile"
element={<ClientProfile/>}
/>

<Route
path="/client/settings"
element={<ClientSettings/>}
/>


<Route
path="/technician"
element={<TechnicianDashboard/>}
/>



<Route
path="/solutions"
element={<Solutions/>}
/>



<Route
path="/services"
element={<Services/>}
/>



<Route
path="/intelligence"
element={<Intelligence/>}
/>



<Route
path="/company"
element={<Company/>}
/>



<Route
path="/investors"
element={<Investors/>}
/>



</Routes>

</BrowserRouter>

)

}


export default App;
