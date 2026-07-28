export function getJobs(){

const jobs =
localStorage.getItem("dragon_jobs");


return jobs
?
JSON.parse(jobs)
:
[];

}



export function saveJobs(jobs){

localStorage.setItem(

"dragon_jobs",

JSON.stringify(jobs)

);

}
