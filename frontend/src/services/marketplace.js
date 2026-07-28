export function getRequests(){

const data =
localStorage.getItem("dragon_requests");


return data
?
JSON.parse(data)
:
[];

}



export function saveRequests(requests){

localStorage.setItem(

"dragon_requests",

JSON.stringify(requests)

);

}



export function addRequest(request){

const current=getRequests();


const updated=[

...current,

request

];


saveRequests(updated);


return updated;

}
