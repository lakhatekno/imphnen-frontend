"use client";
import { useState } from "react";
import { useAuthStore } from "@/services/auth/authStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AuthState } from "@/types/auth.type";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state: AuthState) => state.login);
  const router = useRouter();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      await login({ email, password });
      router.push("/job-companion");
    } catch (err) {
      // It's better to provide a generic error message for security
      console.error(err);
      setError("Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-fit px-4">
      <div className="w-full max-w-md">
        {/* Header section with logo and title */}
        <div className="flex flex-col items-center justify-center mb-8">
          {/* Replaced Next.js Image with standard img tag */}
          <Image
            src={"/logo.png"}
            width={70}
            height={70}
            alt="Kerja Merdeka logo"
            onError={(e) => {
              e.currentTarget.src = "https://placehold.co/70x70/png?text=Logo";
            }}
          />
          <h1 className="text-3xl font-bold mt-4 mb-2 text-slate-800">
            Login ke Akun Anda
          </h1>
          <p className="text-slate-600">
            atau
            <a
              href={"/register"}
              className="font-semibold text-accent hover:underline ml-1"
            >
              daftar akun baru
            </a>
          </p>
        </div>

        {/* Form Card */}
        <div className="p-8 bg-white rounded-lg shadow-md shadow-slate-300">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-slate-700 mb-1"
              >
                Alamat Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-1 py-1 text-sm text-slate-900 border-b-1 w-full border-b-slate-400 focus:outline-none focus:border-b-2 focus:border-accent"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-slate-700 mb-1"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="px-1 py-1 text-sm text-slate-900 border-b-1 w-full border-b-slate-400 focus:outline-none focus:border-b-2 focus:border-accent"
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full bg-accent text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
