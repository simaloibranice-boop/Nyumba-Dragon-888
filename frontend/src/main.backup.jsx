import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App.jsx";


import {
    AuthProvider
} from "./context/AuthContext.jsx";


import {
    RequestProvider
} from "./context/RequestContext.jsx";



createRoot(
    document.getElementById("root")
).render(


<StrictMode>


<AuthProvider>


<RequestProvider>


<App/>


</RequestProvider>


</AuthProvider>


</StrictMode>


);
