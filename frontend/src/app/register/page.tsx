"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "user",
    department: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("crmUser", JSON.stringify(formData));
      setLoading(false);
      router.push("/login");
    }, 600);
  };

  const inputClass =
    "w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";
  const labelClass = "block text-xs font-medium text-gray-600 mb-1.5";

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
            Already have an account?
          </span>
          <Link
            href="/login"
            className="px-4 py-1.5 rounded-lg bg-blue-600 text-sm text-white hover:bg-blue-700 transition"
          >
            Sign in
          </Link>
        </div>
      </nav>

      {/* Main */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
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
              Create your account
            </h1>
            <p className="text-sm text-gray-400">
              Join CRM Lite and start managing your pipeline
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

            <form onSubmit={handleRegister} className="space-y-4">
              {/* Row 1: Full Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Full name</label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Jane Smith"
                    className={inputClass}
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Email address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className={inputClass}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Row 2: Phone + Role */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Phone number</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                    className={inputClass}
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Role</label>
                  <select
                    name="role"
                    aria-label="Select Role"
                    className={inputClass}
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="user">Sales User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Password + Confirm Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className={inputClass}
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Confirm password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    className={inputClass}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Department */}
              <div>
                <label className={labelClass}>Department / Team</label>
                <input
                  type="text"
                  name="department"
                  placeholder="e.g. Sales, Marketing"
                  className={inputClass}
                  value={formData.department}
                  onChange={handleChange}
                />
              </div>

              {/* Address */}
              <div>
                <label className={labelClass}>Address</label>
                <textarea
                  name="address"
                  placeholder="123 Main St, City, Country"
                  rows={2}
                  className={`${inputClass} resize-none`}
                  value={formData.address}
                  onChange={handleChange}
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
                    Creating account...
                  </>
                ) : (
                  "Create account →"
                )}
              </button>
            </form>
          </div>

          {/* Footer hint */}
          <p className="text-center text-xs text-gray-400 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-700 transition"
            >
              Sign in
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
