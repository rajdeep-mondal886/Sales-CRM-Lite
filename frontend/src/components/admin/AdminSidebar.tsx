import Link from "next/link";

export default function AdminSidebar() {
  return (
    <div className="w-64 min-h-screen bg-blue-800 text-white p-5">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

      <ul className="space-y-4">
        <li>
          <Link href="/admin/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/admin/leads">Leads</Link>
        </li>
        <li>
          <Link href="/admin/pipeline">Pipeline</Link>
        </li>
        <li>
          <Link href="/admin/tasks">Tasks</Link>
        </li>
        <li>
          <Link href="/admin/followups">Follow-ups</Link>
        </li>
        <li>
          <Link href="/admin/analytics">Analytics</Link>
        </li>
        <li>
          <Link href="/admin/users">Users</Link>
        </li>
        <li>
          <Link href="/admin/profile">Profile</Link>
        </li>
      </ul>
    </div>
  );
}
