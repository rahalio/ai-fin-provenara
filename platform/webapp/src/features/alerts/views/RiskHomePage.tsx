import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  provenaraApi,
  type RiskAlert,
} from "@/services/shared/infrastructure";

export function RiskHomePage() {
  const [items, setItems] = useState<RiskAlert[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      const res = await provenaraApi.listAlerts();
      setItems(res.data?.items ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function assign(id: string) {
    await provenaraApi.assignAlert(id, "compliance.desk");
    await load();
  }

  async function resolve(id: string) {
    await provenaraApi.resolveAlert(id, "Cleared after dual-control review");
    await load();
  }

  return (
    <div className="space-y-6">
      <header>
        <div className="brand-mark text-sm mb-1">Provenara</div>
        <h1 className="text-3xl text-[var(--color-paper)]">Risk & alerts</h1>
        <p className="mt-1 text-sm text-[rgba(243,237,228,0.65)]">
          Mismatch, lapse, stale mark, and cashflow anomaly queue.
        </p>
      </header>

      <div className="panel p-5 space-y-4">
        {error ? (
          <p className="text-sm text-[var(--color-seal-red)]">{error}</p>
        ) : null}

        {items.length === 0 ? (
          <p className="text-sm text-[var(--color-archive-green)]">
            No open seals — intervention queue is clear.
          </p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Status</th>
                <th>Artwork</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((a) => (
                <tr key={a.id}>
                  <td>
                    <span className="seal seal-block">{a.alertType}</span>
                  </td>
                  <td>{a.status}</td>
                  <td>
                    {a.artworkId ? (
                      <Link
                        className="mono text-xs text-[var(--color-oxblood)]"
                        to={`/artworks/${a.artworkId}`}
                      >
                        {a.artworkId}
                      </Link>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-ghost"
                      type="button"
                      onClick={() => void assign(a.id)}
                    >
                      Assign
                    </button>
                    <button
                      className="btn"
                      type="button"
                      onClick={() => void resolve(a.id)}
                    >
                      Resolve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
