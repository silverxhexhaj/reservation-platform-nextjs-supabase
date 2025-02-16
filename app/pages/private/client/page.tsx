'use client';

export default function ClientDashboard() {

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Welcome to Your Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-lg font-semibold mb-2">Total Bookings</h3>
                    <p className="text-3xl font-bold text-primary">0</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-lg font-semibold mb-2">Loyalty Points</h3>
                    <p className="text-3xl font-bold text-primary">0</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-lg font-semibold mb-2">Upcoming Appointments</h3>
                    <p className="text-3xl font-bold text-primary">0</p>
                </div>
            </div>

            <div className="mt-12 bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
                <div className="text-gray-500">
                    No recent activity to display
                </div>
            </div>
        </div>
    );
}
