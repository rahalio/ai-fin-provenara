import { FormEvent, useEffect, useState } from "react";
import {
  provenaraApi,
  type Counterparty,
} from "@/services/shared/infrastructure";

export function CounterpartiesPage() {
  const [items, setItems] = useState<Counterparty[]>([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("investor");
  const [error, setError] = useState<string | null>(null);
  const [lastScreen, setLastScreen] = useState<string | null>(null);

  async function load() {
    const res = await provenaraApi.listCounterparties();
    setItems(res.data?.items ?? []);
  }

  useEffect(() => {
    void load().catch((err) =>
      setError(err instanceof Error ? err.message : "Failed"),
    );
  }, []);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    await provenaraApi.createCounterparty({ name: name.trim(), role });
    setName("");
    await load();
  }

  async function onScreen(id: string) {
    const res = await provenaraApi.screenCounterparty(id);
    setLastScreen(JSON.stringify(res.data));
    await load();
  }

  return (
    <div className="space-y-6">
      <header>
        <div className="brand-mark text-sm mb-1">Provenara</div>
        <h1 className="text-3xl text-[var(--color-paper)]">Counterparties</h1>
        <p className="mt-1 text-sm text-[rgba(243,237,228,0.65)]">
          AML name screening before subscriptions and collateral.
        </p>
      </header>

      <div className="panel p-5 space-y-4">
        <form className="flex flex-wrap gap-2 items-end" onSubmit={onCreate}>
          <label className="text-xs uppercase tracking-wide text-[var(--color-steel)] grow">
            Name
            <input
              className="field mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className="text-xs uppercase tracking-wide text-[var(--color-steel)]">
            Role
            <select
              className="field mt-1"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {["seller", "borrower", "investor", "custodian", "insurer"].map(
                (r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ),
              )}
            </select>
          </label>
          <button className="btn" type="submit">
            Add
          </button>
        </form>

        {error ? (
          <p className="text-sm text-[var(--color-seal-red)]">{error}</p>
        ) : null}
        {lastScreen ? (
          <pre className="mono text-xs bg-[rgba(255,255,255,0.4)] p-3 rounded-[var(--radius-sm)]">
            {lastScreen}
          </pre>
        ) : null}

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Screen</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.role}</td>
                <td>
                  <span
                    className={`seal ${
                      c.lastScreenOutcome === "hit"
                        ? "seal-block"
                        : c.lastScreenOutcome === "clear"
                          ? "seal-ok"
                          : "seal-unknown"
                    }`}
                  >
                    {c.lastScreenOutcome || "pending"}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-ghost"
                    type="button"
                    onClick={() => void onScreen(c.id)}
                  >
                    Screen
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
