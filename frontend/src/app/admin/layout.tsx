import AuthGuard from "@/components/auth/AuthGuard";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard role="admin">{children}</AuthGuard>;
}
