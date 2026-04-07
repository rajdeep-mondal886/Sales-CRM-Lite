import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Navbar */}
      <nav className="w-full bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
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
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="px-4 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="px-4 py-1.5 rounded-lg bg-blue-600 text-sm text-white hover:bg-blue-700 transition"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gray-50 border-b border-gray-100 px-8 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
          Built for small sales teams
        </div>

        <h1 className="text-4xl font-medium text-gray-900 leading-tight max-w-2xl mx-auto mb-4">
          Turn leads into deals{" "}
          <span className="text-blue-600">without the complexity</span>
        </h1>

        <p className="text-base text-gray-500 max-w-xl mx-auto mb-8 leading-relaxed">
          A focused CRM for small teams — manage leads, visualize your pipeline,
          assign follow-ups, and close more deals without the enterprise
          overhead.
        </p>

        <div className="flex justify-center gap-3 mb-12">
          <Link
            href="/register"
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
          >
            Start for free →
          </Link>
          <Link
            href="/login"
            className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            See how it works
          </Link>
        </div>

        {/* Mini Pipeline Preview */}
        <div className="flex max-w-lg mx-auto rounded-lg overflow-hidden border border-gray-200">
          {[
            { label: "New", count: 24, color: "bg-blue-200" },
            { label: "Contacted", count: 18, color: "bg-violet-200" },
            { label: "Qualified", count: 11, color: "bg-amber-200" },
            { label: "Proposal", count: 7, color: "bg-teal-200" },
            { label: "Won", count: 5, color: "bg-green-200" },
          ].map((stage, i) => (
            <div
              key={stage.label}
              className={`flex-1 bg-white text-center py-3 px-2 ${
                i !== 4 ? "border-r border-gray-100" : ""
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${stage.color} mx-auto mb-1.5`}
              />
              <div className="text-base font-medium text-gray-800">
                {stage.count}
              </div>
              <div className="text-xs text-gray-400">{stage.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-8 py-16 max-w-6xl mx-auto">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
          Features
        </p>
        <div className="flex justify-between items-end flex-wrap gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-medium text-gray-900">
              Everything you need, nothing you don&apos;t
            </h2>
            <p className="text-sm text-gray-500 mt-1 max-w-md leading-relaxed">
              Six focused tools that cover the full sales cycle — from first
              contact to closed deal.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 divide-x divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
          {[
            {
              icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle
                    cx="8"
                    cy="5"
                    r="3"
                    stroke="#185FA5"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M2 13c0-3.314 2.686-6 6-6s6 2.686 6 6"
                    stroke="#185FA5"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              ),
              iconBg: "bg-blue-50",
              title: "Lead management",
              desc: "Add, edit, and organize leads with full contact history in one view.",
            },
            {
              icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect
                    x="1"
                    y="3"
                    width="3.5"
                    height="10"
                    rx="1"
                    fill="#534AB7"
                    opacity="0.5"
                  />
                  <rect
                    x="6"
                    y="5"
                    width="3.5"
                    height="8"
                    rx="1"
                    fill="#534AB7"
                    opacity="0.75"
                  />
                  <rect
                    x="11"
                    y="1"
                    width="3.5"
                    height="12"
                    rx="1"
                    fill="#534AB7"
                  />
                </svg>
              ),
              iconBg: "bg-violet-50",
              title: "Kanban pipeline",
              desc: "Drag deals across stages and see your pipeline at a glance.",
            },
            {
              icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect
                    x="2"
                    y="2"
                    width="12"
                    height="12"
                    rx="2"
                    stroke="#3B6D11"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M5 8l2 2 4-4"
                    stroke="#3B6D11"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ),
              iconBg: "bg-green-50",
              title: "Tasks & follow-ups",
              desc: "Schedule reminders and assign follow-up tasks to any lead.",
            },
            {
              icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2 12 L5 8 L8 10 L11 5 L14 7"
                    stroke="#BA7517"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ),
              iconBg: "bg-amber-50",
              title: "Analytics dashboard",
              desc: "Track conversion rates, pipeline health, and team performance.",
            },
            {
              icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle
                    cx="5"
                    cy="8"
                    r="3"
                    stroke="#993C1D"
                    strokeWidth="1.2"
                  />
                  <circle
                    cx="11"
                    cy="8"
                    r="3"
                    stroke="#993C1D"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M8 5.5v5"
                    stroke="#993C1D"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              ),
              iconBg: "bg-orange-50",
              title: "Role-based access",
              desc: "Separate views and permissions for admins and sales reps.",
            },
            {
              icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M8 3v10"
                    stroke="#0F6E56"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="8"
                    cy="8"
                    r="5.5"
                    stroke="#0F6E56"
                    strokeWidth="1.2"
                  />
                </svg>
              ),
              iconBg: "bg-teal-50",
              title: "Quick add",
              desc: "Add a new lead or task in under 10 seconds from anywhere in the app.",
            },
          ].map((feature) => (
            <div key={feature.title} className="bg-white p-6">
              <div
                className={`w-8 h-8 rounded-lg ${feature.iconBg} flex items-center justify-center mb-3`}
              >
                {feature.icon}
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">
                {feature.title}
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="px-8 pb-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-4 gap-3">
          {[
            {
              number: "3×",
              label: "faster lead capture",
              color: "text-blue-600",
            },
            {
              number: "85%",
              label: "fewer missed follow-ups",
              color: "text-violet-600",
            },
            {
              number: "2 min",
              label: "avg. onboarding time",
              color: "text-teal-700",
            },
            {
              number: "40%",
              label: "higher close rates",
              color: "text-orange-700",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-50 rounded-lg p-4 text-center"
            >
              <div className={`text-3xl font-medium ${stat.color}`}>
                {stat.number}
              </div>
              <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 border-y border-gray-100 px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
            How it works
          </p>
          <h2 className="text-2xl font-medium text-gray-900 mb-1">
            Up and running in minutes
          </h2>
          <p className="text-sm text-gray-500 mb-8 max-w-md leading-relaxed">
            No training sessions. No setup calls. Just open and go.
          </p>

          <div className="rounded-xl border border-gray-200 overflow-hidden divide-y divide-gray-100">
            {[
              {
                step: "1",
                title: "Create your account",
                desc: "Register in under a minute. Invite your team and set roles immediately.",
              },
              {
                step: "2",
                title: "Import or add leads",
                desc: "Add leads manually or import a CSV. Each lead gets a full timeline view.",
              },
              {
                step: "3",
                title: "Move deals through your pipeline",
                desc: "Drag cards on the Kanban board as deals progress. Filter by owner or stage.",
              },
              {
                step: "4",
                title: "Track performance and close",
                desc: "Monitor your dashboard for bottlenecks, follow-up rates, and wins.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-4 bg-white px-6 py-5"
              >
                <div className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-xs font-medium text-gray-400 flex-shrink-0 mt-0.5">
                  {item.step}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-16">
        <div className="max-w-6xl mx-auto bg-blue-800 rounded-xl px-8 py-12 text-center">
          <h2 className="text-2xl font-medium text-white mb-3">
            Start managing your sales better today
          </h2>
          <p className="text-sm text-blue-200 max-w-md mx-auto mb-8 leading-relaxed">
            Join small teams already using CRM Lite to close more deals with
            less friction and zero enterprise complexity.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              href="/register"
              className="px-5 py-2.5 rounded-lg bg-white text-blue-800 text-sm font-medium hover:bg-blue-50 transition"
            >
              Register for free
            </Link>
            <Link
              href="/login"
              className="px-5 py-2.5 rounded-lg border border-blue-500 text-white text-sm hover:bg-blue-700 transition"
            >
              Log in
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-8 py-5 flex justify-between items-center">
        <p className="text-xs text-gray-400">© 2026 CRM Lite</p>
        <div className="flex gap-6">
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
    </main>
  );
}
