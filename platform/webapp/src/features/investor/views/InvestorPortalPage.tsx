import { useEffect, useState } from "react";
import {
  provenaraApi,
  type ShareClass,
} from "@/services/shared/infrastructure";

export function InvestorPortalPage() {
  const [items, setItems] = useState<ShareClass[]>([]);

  useEffect(() => {
    void provenaraApi.listShareClasses().then((res) => {
      setItems(res.data?.items ?? []);
    });
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <div className="brand-mark text-sm mb-1">Provenara</div>
        <h1 className="text-3xl text-[var(--color-paper)]">Investor portal</h1>
        <p className="mt-1 text-sm text-[rgba(243,237,228,0.65)]">
          Positions and notices — no custody coordinates or collector dossiers.
        </p>
      </header>

      <div className="panel p-5">
        {items.length === 0 ? (
          <p className="text-sm text-[var(--color-steel)]">
            No holdings yet. After subscription, positions appear here.
          </p>
        ) : (
          <ul className="space-y-2">
            {items.map((s) => (
              <li
                key={s.id}
                className="border border-[rgba(26,18,16,0.08)] rounded-[var(--radius-sm)] px-3 py-3"
              >
                <div className="font-medium">{s.name}</div>
                <div className="text-sm text-[var(--color-steel)]">
                  {s.totalShares} shares · status {s.status}
                </div>
                <div className="mono text-xs mt-1 text-[var(--color-steel)]">
                  {s.id}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
