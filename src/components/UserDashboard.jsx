const UserDashboard = () => {
    return (
        <div className="h-screen flex items-center justify-center">
            {/* user dashboard - show user info */}
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
                <div className="mb-2">
                    <span className="font-semibold">Name:</span> John Doe
                </div>
                <div className="mb-2">
                    <span className="font-semibold">Email:</span> johndoe@example.com
                </div>
                <div className="mb-2">
                    <span className="font-semibold">Member Since:</span> January 2023
                </div>
            </div>
            
        </div>
    );
};

export default UserDashboard;
