import { FormEvent, useEffect, useState } from "react";
import {
  provenaraApi,
  type ShareClass,
} from "@/services/shared/infrastructure";

export function SharesPage() {
  const [items, setItems] = useState<ShareClass[]>([]);
  const [artworkId, setArtworkId] = useState("");
  const [name, setName] = useState("Class A");
  const [totalShares, setTotalShares] = useState("1000");
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      const res = await provenaraApi.listShareClasses();
      setItems(res.data?.items ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await provenaraApi.createShareClass({
        artworkId: artworkId.trim(),
        name: name.trim(),
        totalShares: Number(totalShares),
      });
      setArtworkId("");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Create failed");
    }
  }

  return (
    <div className="space-y-6">
      <header>
        <div className="brand-mark text-sm mb-1">Provenara</div>
        <h1 className="text-3xl text-[var(--color-paper)]">Share register</h1>
        <p className="mt-1 text-sm text-[rgba(243,237,228,0.65)]">
          Single register for fractional classes, subscriptions, and
          distributions.
        </p>
      </header>

      <div className="panel p-5 space-y-4">
        <form className="flex flex-wrap gap-2 items-end" onSubmit={onCreate}>
          <label className="text-xs uppercase tracking-wide text-[var(--color-steel)] grow min-w-[220px]">
            Artwork id
            <input
              className="field mt-1 mono"
              value={artworkId}
              onChange={(e) => setArtworkId(e.target.value)}
              placeholder="art_…"
              required
            />
          </label>
          <label className="text-xs uppercase tracking-wide text-[var(--color-steel)]">
            Name
            <input
              className="field mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className="text-xs uppercase tracking-wide text-[var(--color-steel)]">
            Total shares
            <input
              className="field mt-1"
              value={totalShares}
              onChange={(e) => setTotalShares(e.target.value)}
              required
            />
          </label>
          <button className="btn" type="submit">
            Create class
          </button>
        </form>

        {error ? (
          <p className="text-sm text-[var(--color-seal-red)]">{error}</p>
        ) : null}

        {items.length === 0 ? (
          <p className="text-sm text-[var(--color-steel)]">
            No share classes yet. Trust file must be ready before launch.
          </p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Artwork</th>
                <th>Shares</th>
                <th>Status</th>
                <th>Id</th>
              </tr>
            </thead>
            <tbody>
              {items.map((s) => (
                <tr key={s.id}>
                  <td className="font-medium">{s.name}</td>
                  <td className="mono text-xs">{s.artworkId}</td>
                  <td>{s.totalShares}</td>
                  <td>
                    <span
                      className={`seal ${s.status === "frozen" ? "seal-block" : "seal-ok"}`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="mono text-xs text-[var(--color-steel)]">
                    {s.id}
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
