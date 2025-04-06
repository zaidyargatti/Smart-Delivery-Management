"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter(); // for redirection

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // optional: loading state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post("http://localhost:5000/api/user/signup", {
        username :name,
        email,
        password,
      });

      console.log("Signup successful:", response.data);

      // After successful signup ➔ Redirect to login
      router.push("/login");
    } catch (error: any) {
      console.error("Signup failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-2xl p-8 bg-white rounded-xl shadow-xl">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Create an Account</h2>
          <button className="text-gray-500 text-xl font-semibold hover:text-gray-700">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block font-semibold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md font-semibold hover:opacity-90 transition"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-black font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
