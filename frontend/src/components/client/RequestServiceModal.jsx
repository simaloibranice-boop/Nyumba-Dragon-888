import { useState } from "react";

export default function RequestServiceModal({
    open,
    service,
    onClose,
    onSubmit
}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");

    if (!open || !service) return null;

    function handleSubmit(e) {
        e.preventDefault();

        onSubmit({
            service_id: service.id,
            title: title.trim(),
            description: description.trim(),
            location: location.trim()
        });

        setTitle("");
        setDescription("");
        setLocation("");
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

            <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl">

                <h2 className="mb-6 text-3xl font-black text-gray-900">
                    Request {service.name}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <input
                        type="text"
                        placeholder="Request title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 bg-white p-3 text-black placeholder:text-gray-500 focus:border-orange-500 focus:outline-none"
                        required
                    />

                    <textarea
                        rows="5"
                        placeholder="Describe your problem"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 bg-white p-3 text-black placeholder:text-gray-500 focus:border-orange-500 focus:outline-none"
                        required
                    />

                    <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 bg-white p-3 text-black placeholder:text-gray-500 focus:border-orange-500 focus:outline-none"
                        required
                    />

                    <div className="flex gap-4">

                        <button
                            type="submit"
                            className="flex-1 rounded-xl bg-orange-500 py-3 font-bold text-white hover:bg-orange-600"
                        >
                            Submit Request
                        </button>

                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-xl bg-gray-200 py-3 font-bold text-gray-800 hover:bg-gray-300"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}
