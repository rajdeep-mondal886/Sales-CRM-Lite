"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminProfilePage() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-lg">
        <div>
          <h1 className="text-3xl font-bold text-black">Profile Page</h1>
          <p className="text-sm text-gray-500 mt-1">
            Your admin account details
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Name
            </p>
            <p className="text-sm text-gray-900 mt-1">{user.name}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Email
            </p>
            <p className="text-sm text-gray-900 mt-1">{user.email}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Role
            </p>
            <p className="text-sm text-gray-900 mt-1 capitalize">{user.role}</p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Sign out
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
