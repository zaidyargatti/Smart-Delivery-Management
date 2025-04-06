// app/dashboard/page.tsx
"use client";

import { useRouter } from "next/navigation";
import RequireAuth from "../components/RequireAuth";

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <RequireAuth>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <p className="mb-6">Welcome to your deliveries list!</p>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </RequireAuth>
  );
}
