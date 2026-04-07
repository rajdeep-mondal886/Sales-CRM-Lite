"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      const storedUser = localStorage.getItem("crmUser");
      if (!storedUser) {
        setError("No registered user found. Please register first.");
        setLoading(false);
        return;
      }
      const user = JSON.parse(storedUser);
      if (
        loginData.email === user.email &&
        loginData.password === user.password
      ) {
        if (user.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/user/dashboard");
        }
      } else {
        setError("Invalid email or password. Please try again.");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect
                x="2"
                y="8"
                width="3"
                height="8"
                rx="1"
                fill="white"
                opacity="0.6"
              />
              <rect
                x="7"
                y="5"
                width="3"
                height="11"
                rx="1"
                fill="white"
                opacity="0.8"
              />
              <rect x="12" y="2" width="3" height="14" rx="1" fill="white" />
            </svg>
          </div>
          <span className="text-base font-medium text-gray-900">CRM Lite</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">
            Don&apos;t have an account?
          </span>
          <Link
            href="/register"
            className="px-4 py-1.5 rounded-lg bg-blue-600 text-sm text-white hover:bg-blue-700 transition"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Main */}
      <div className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600 mb-4">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <rect
                  x="3"
                  y="10"
                  width="4"
                  height="9"
                  rx="1.2"
                  fill="white"
                  opacity="0.55"
                />
                <rect
                  x="9"
                  y="6"
                  width="4"
                  height="13"
                  rx="1.2"
                  fill="white"
                  opacity="0.8"
                />
                <rect
                  x="15"
                  y="2"
                  width="4"
                  height="17"
                  rx="1.2"
                  fill="white"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-medium text-gray-900 mb-1">
              Welcome back
            </h1>
            <p className="text-sm text-gray-400">
              Sign in to your CRM Lite account
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
            {/* Error */}
            {error && (
              <div className="mb-5 flex items-start gap-2.5 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                <svg
                  className="mt-0.5 flex-shrink-0"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <circle
                    cx="7"
                    cy="7"
                    r="6"
                    stroke="#dc2626"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M7 4v3.5M7 9.5v.5"
                    stroke="#dc2626"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="text-xs text-red-600 leading-relaxed">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  value={loginData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-medium text-gray-600">
                    Password
                  </label>
                  <Link
                    href="#"
                    className="text-xs text-blue-600 hover:text-blue-700 transition"
                  >
                    Forgot password?
                  </Link>
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  value={loginData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <circle
                        cx="7"
                        cy="7"
                        r="5.5"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeDasharray="8 8"
                      />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Sign in →"
                )}
              </button>
            </form>
          </div>

          {/* Footer hint */}
          <p className="text-center text-xs text-gray-400 mt-6">
            New to CRM Lite?{" "}
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-700 transition"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* Bottom strip */}
      <footer className="border-t border-gray-100 px-8 py-4 flex justify-between items-center bg-white">
        <p className="text-xs text-gray-400">© 2026 CRM Lite</p>
        <div className="flex gap-5">
          {["Privacy", "Terms", "Contact"].map((link) => (
            <Link
              key={link}
              href="#"
              className="text-xs text-gray-400 hover:text-gray-600 transition"
            >
              {link}
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
