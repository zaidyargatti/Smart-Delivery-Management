"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import RequireGuest from "../components/RequireGuest";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/user/login", { email, password });
      const { token } = res.data;
      localStorage.setItem("token", token);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <RequireGuest>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Login to your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Welcome back! Please enter your details.
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="example@email.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              Login
            </button>
          </form>
          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="/signup" className="font-medium text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </RequireGuest>
  );
}
