"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiX, FiUser, FiLock } from "react-icons/fi";
import axios from "axios"; // still using your utils Axios instance

interface LoginModalProps {
  onClose: () => void;
  onLogin: (user: any) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://backend-of-smart-delivery-management.onrender.com/api/user/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const { token } = response.data;

      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
      }

      if (typeof onLogin === "function") {
        onLogin(response.data);
      }

      router.push("/dashboard");

      if (typeof onClose === "function") {
        onClose();
      }
    } catch (err: any) {
      console.error("Login error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
          "Invalid email or password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#f8f8f8] bg-opacity-50 flex items-center justify-center transition-opacity duration-300 z-50">
      <div className="bg-white rounded-lg w-full max-w-md shadow-xl transform transition-all duration-300 mx-4">
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Login to WebRoom</h2>
          <button
            className="text-gray-500 hover:text-black transition-colors"
            onClick={() => typeof onClose === "function" && onClose()}
            disabled={loading}
          >
            <Link href="/">
              <FiX size={20} />
            </Link>
          </button>
        </div>

        <form className="p-5" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-md mb-5 text-sm">
              {error}
            </div>
          )}

          <div className="mb-5">
            <label className="flex items-center gap-2 mb-2 font-medium text-gray-700">
              <FiUser className="text-black" size={16} /> Email
            </label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="mb-5">
            <label className="flex items-center gap-2 mb-2 font-medium text-gray-700">
              <FiLock className="text-black" size={16} /> Password
            </label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-md focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="p-4 border-t border-gray-200 text-center text-gray-700">
          <p>
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-black font-medium hover:opacity-80 transition-opacity"
              onClick={() => typeof onClose === "function" && onClose()}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
