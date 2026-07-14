"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import type { UserRole } from "@/types/api";

export default function AuthGuard({
  children,
  role,
}: {
  children: React.ReactNode;
  role: UserRole;
}) {
  const router = useRouter();
  const { user, token, isLoading, hasRole } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (!token || !user) {
      router.replace("/login");
      return;
    }

    if (!hasRole(role)) {
      router.replace(user.role === "admin" ? "/admin/dashboard" : "/user/dashboard");
    }
  }, [isLoading, token, user, role, hasRole, router]);

  if (isLoading || !token || !user || !hasRole(role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
