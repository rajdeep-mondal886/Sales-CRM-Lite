import Link from "next/link";

export default function UserSidebar() {
  return (
    <div className="w-64 min-h-screen bg-green-700 text-white p-5">
      <h2 className="text-2xl font-bold mb-8">Sales User</h2>

      <ul className="space-y-4">
        <li>
          <Link href="/user/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/user/leads">My Leads</Link>
        </li>
        <li>
          <Link href="/user/pipeline">My Pipeline</Link>
        </li>
        <li>
          <Link href="/user/tasks">My Tasks</Link>
        </li>
        <li>
          <Link href="/user/followups">My Follow-ups</Link>
        </li>
        <li>
          <Link href="/user/profile">Profile</Link>
        </li>
      </ul>
    </div>
  );
}
