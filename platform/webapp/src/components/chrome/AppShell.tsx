import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { setAccessToken } from "@/services/shared/infrastructure";

const NAV = [
  { to: "/", label: "Trust files", end: true },
  { to: "/shares", label: "Share register" },
  { to: "/risk", label: "Risk & alerts" },
  { to: "/counterparties", label: "Counterparties" },
  { to: "/audits", label: "Audits & anchors" },
  { to: "/investor", label: "Investor portal" },
];

export function AppShell() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen grid grid-cols-[250px_1fr]">
      <aside className="border-r border-[rgba(212,165,116,0.18)] bg-[rgba(18,14,13,0.72)] px-4 py-6 text-[var(--color-paper)]">
        <div className="mb-8">
          <div className="brand-mark text-2xl">Provenara</div>
          <p className="mt-1 text-xs text-[rgba(243,237,228,0.55)]">
            Governed trust files for art finance
          </p>
        </div>
        <nav className="flex flex-col gap-1">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `shell-link rounded-[var(--radius-sm)] px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "active bg-[rgba(212,165,116,0.12)] font-medium"
                    : "hover:bg-[rgba(255,255,255,0.04)]"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          className="btn mt-10 w-full"
          type="button"
          onClick={() => {
            setAccessToken(null);
            navigate("/login");
          }}
        >
          Sign out
        </button>
      </aside>
      <main className="px-8 py-7">
        <Outlet />
      </main>
    </div>
  );
}
