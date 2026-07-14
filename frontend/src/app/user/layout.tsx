import AuthGuard from "@/components/auth/AuthGuard";

export default function UserRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard role="user">{children}</AuthGuard>;
}
