"use client";

import { useCallback, useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getErrorMessage } from "@/lib/api";
import * as userService from "@/services/user.service";
import type { User, UserRole } from "@/types/api";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to load users"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleRoleChange = async (userId: string, role: UserRole) => {
    setUpdatingId(userId);
    setError("");
    try {
      const updated = await userService.updateUserRole(userId, role);
      if (updated) {
        setUsers((prev) =>
          prev.map((user) => (user._id === userId ? updated : user)),
        );
      }
    } catch (err) {
      setError(getErrorMessage(err, "Failed to update user role"));
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-black">User Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            View team members and manage roles
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? (
            <p className="p-6 text-sm text-gray-500">Loading users...</p>
          ) : users.length === 0 ? (
            <p className="p-6 text-sm text-gray-500">No users found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-left text-gray-600">
                  <tr>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-t border-gray-100">
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-4 py-3 text-gray-700">{user.email}</td>
                      <td className="px-4 py-3">
                        <select
                          className="border border-gray-200 rounded-lg px-2 py-1 text-xs capitalize disabled:opacity-60"
                          value={user.role}
                          disabled={updatingId === user._id}
                          onChange={(e) =>
                            handleRoleChange(
                              user._id,
                              e.target.value as UserRole,
                            )
                          }
                        >
                          <option value="user">user</option>
                          <option value="admin">admin</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
