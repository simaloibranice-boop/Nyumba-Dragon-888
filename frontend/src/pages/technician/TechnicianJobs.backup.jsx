import { useEffect, useState } from "react";
import { getTechnicianJobs } from "../../services/technicianService";

export default function TechnicianJobs() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const token = localStorage.getItem("token");

        console.log("Token from localStorage:", token);

        if (!token) {
            setError("Authentication token missing.");
            setLoading(false);
            return;
        }

        loadJobs();

    }, []);

    async function loadJobs() {

        try {

            const data = await getTechnicianJobs();

            console.log("Jobs:", data);

            if (Array.isArray(data)) {
                setJobs(data);
            } else if (Array.isArray(data.jobs)) {
                setJobs(data.jobs);
            }

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.message ||
                "Failed to load technician jobs."
            );

        } finally {

            setLoading(false);

        }

    }

    if (loading) {
        return <h2 className="text-white">Loading jobs...</h2>;
    }

    if (error) {
        return <h2 className="text-red-400">{error}</h2>;
    }

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold text-white">
                Technician Jobs
            </h1>

            {jobs.length === 0 ? (
                <p>No technician jobs found.</p>
            ) : (
                jobs.map(job => (
                    <div
                        key={job.id}
                        className="bg-slate-800 rounded-xl p-5"
                    >
                        <h2 className="font-bold">{job.title}</h2>
                        <p>{job.description}</p>
                        <p>Status: {job.status}</p>
                        <p>Location: {job.location}</p>
                    </div>
                ))
            )}
        </div>
    );
}
