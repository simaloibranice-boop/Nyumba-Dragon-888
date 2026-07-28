export default function AdminDashboard() {

    return (

        <div>

            <h1 className="text-4xl font-bold mb-6">

                Super Admin Dashboard

            </h1>

            <div className="grid grid-cols-4 gap-6">

                <div className="bg-white rounded-xl shadow p-6">

                    <h3 className="text-gray-500">
                        Users
                    </h3>

                    <p className="text-4xl font-bold mt-4">
                        0
                    </p>

                </div>

                <div className="bg-white rounded-xl shadow p-6">

                    <h3 className="text-gray-500">
                        Revenue
                    </h3>

                    <p className="text-4xl font-bold mt-4">
                        KSh 0
                    </p>

                </div>

                <div className="bg-white rounded-xl shadow p-6">

                    <h3 className="text-gray-500">
                        Services
                    </h3>

                    <p className="text-4xl font-bold mt-4">
                        0
                    </p>

                </div>

                <div className="bg-white rounded-xl shadow p-6">

                    <h3 className="text-gray-500">
                        Investors
                    </h3>

                    <p className="text-4xl font-bold mt-4">
                        0
                    </p>

                </div>

            </div>

        </div>

    );

}
