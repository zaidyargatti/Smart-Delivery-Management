"use client";

import { useRouter } from "next/navigation";
import { FiPackage, FiTruck, FiUsers, FiLogOut } from "react-icons/fi";

const Dashboard = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Remove token or any other auth data
    localStorage.removeItem("token");

    // Redirect to login
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="bg-black text-white p-6 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Smart Delivery Dashboard</h1>
          <button
            className="hover:opacity-80 flex items-center gap-2"
            onClick={handleLogout}
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center gap-4">
              <FiPackage className="text-3xl text-black" />
              <div>
                <h2 className="text-lg font-semibold">Total Deliveries</h2>
                <p className="text-gray-500">120 this month</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center gap-4">
              <FiTruck className="text-3xl text-black" />
              <div>
                <h2 className="text-lg font-semibold">Active Drivers</h2>
                <p className="text-gray-500">15 on duty</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center gap-4">
              <FiUsers className="text-3xl text-black" />
              <div>
                <h2 className="text-lg font-semibold">Clients</h2>
                <p className="text-gray-500">48 registered</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Recent Deliveries</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-sm text-gray-600">
                  <th className="py-2 px-4">Package ID</th>
                  <th className="py-2 px-4">Client</th>
                  <th className="py-2 px-4">Driver</th>
                  <th className="py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">PKG12345</td>
                  <td className="py-2 px-4">John Doe</td>
                  <td className="py-2 px-4">Sarah</td>
                  <td className="py-2 px-4 text-green-600 font-medium">
                    Delivered
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">PKG12346</td>
                  <td className="py-2 px-4">Jane Smith</td>
                  <td className="py-2 px-4">Ali</td>
                  <td className="py-2 px-4 text-yellow-600 font-medium">
                    In Transit
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">PKG12347</td>
                  <td className="py-2 px-4">Elena</td>
                  <td className="py-2 px-4">Mohammed</td>
                  <td className="py-2 px-4 text-red-600 font-medium">
                    Pending
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
