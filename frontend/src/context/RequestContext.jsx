import {
createContext,
useState
} from "react";


export const RequestContext = createContext();



export function RequestProvider({children}){


const [requests,setRequests]=useState([

{
id:1,
service:"Solar Installation",
customer:"John Kamau",
location:"Nairobi",
description:"5KW solar installation",
labour:"Panels, inverter, battery installation",
price:85000,
status:"PENDING",
technician:null
}

]);




function createRequest(request){


setRequests([

...requests,

{

...request,

id:Date.now(),

status:"PENDING",

technician:null

}

]);


}





function acceptRequest(id,technician){


setRequests(

requests.map(request=>


request.id===id

?

{

...request,

status:"IN PROGRESS",

technician

}

:

request


)

);


}





function completeRequest(id){


setRequests(

requests.map(request=>

request.id===id

?

{

...request,

status:"COMPLETED"

}

:

request

)

);


}





return (

<RequestContext.Provider

value={{

requests,

createRequest,

acceptRequest,

completeRequest

}}

>


{children}


</RequestContext.Provider>

)

}
