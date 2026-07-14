"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function UserNavbar() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-black">Sales CRM Lite - User</h1>
      <div className="flex items-center gap-4">
        <p className="text-gray-600 text-sm">{user?.name ?? "User"}</p>
        <button
          type="button"
          onClick={handleLogout}
          className="text-sm text-red-600 hover:text-red-700 transition"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
