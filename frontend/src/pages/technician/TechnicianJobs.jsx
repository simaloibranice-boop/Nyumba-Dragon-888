import { useEffect, useState } from "react";
import api from "../../services/api";

export default function TechnicianJobs() {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {

    let mounted = true;


    const loadJobs = async () => {

      try {

        const token = localStorage.getItem("token");

        console.log("TECH TOKEN:", token);


        if (!token) {
          throw new Error(
            "Authentication token missing"
          );
        }


        const response = await api.get(
          "/technician/jobs",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );


        console.log(
          "JOBS:",
          response.data
        );


        if (mounted) {
          setJobs(response.data);
        }


      } catch (err) {

        console.error(err);


        if (mounted) {
          setError(err.message);
        }


      } finally {

        if (mounted) {
          setLoading(false);
        }

      }

    };


    loadJobs();


    return () => {
      mounted = false;
    };


  }, []);



  if (loading) {

    return (
      <div className="p-8 text-white">
        Loading technician jobs...
      </div>
    );

  }



  if (error) {

    return (
      <div className="p-8 text-red-400">
        {error}
      </div>
    );

  }



  return (

    <div className="p-8 text-white">


      <h1 className="text-3xl font-bold mb-8">
        Technician Jobs
      </h1>



      {
        jobs.length === 0 ? (

          <p>
            No jobs available
          </p>

        ) : (

          <div className="space-y-4">


            {
              jobs.map((job) => (

                <div
                  key={job.id}
                  className="
                    bg-slate-800
                    rounded-xl
                    p-5
                    shadow
                  "
                >


                  <h2 className="text-xl font-semibold">
                    {job.title}
                  </h2>



                  <p>
                    Status: {job.status}
                  </p>



                  <p>
                    Location: {job.location}
                  </p>



                  <p className="mt-3 text-gray-300">
                    {job.description}
                  </p>



                </div>

              ))
            }


          </div>

        )
      }


    </div>

  );

}
