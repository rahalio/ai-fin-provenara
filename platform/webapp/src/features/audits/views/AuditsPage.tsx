import { FormEvent, useState } from "react";
import { provenaraApi } from "@/services/shared/infrastructure";

export function AuditsPage() {
  const [artworkId, setArtworkId] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onExport(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const to = new Date();
      const from = new Date(Date.now() - 1000 * 60 * 60 * 24 * 90);
      const res = await provenaraApi.createAuditExport({
        periodFrom: from.toISOString(),
        periodTo: to.toISOString(),
        artworkId: artworkId.trim() || undefined,
      });
      setResult(JSON.stringify(res.data, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Export failed");
    }
  }

  async function onAnchor() {
    setError(null);
    if (!artworkId.trim()) {
      setError("Artwork id required for anchor");
      return;
    }
    try {
      const res = await provenaraApi.publishAnchor(artworkId.trim());
      setResult(JSON.stringify(res.data, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Anchor failed");
    }
  }

  return (
    <div className="space-y-6">
      <header>
        <div className="brand-mark text-sm mb-1">Provenara</div>
        <h1 className="text-3xl text-[var(--color-paper)]">Audits & anchors</h1>
        <p className="mt-1 text-sm text-[rgba(243,237,228,0.65)]">
          Reconstruct who changed what; optional hash anchors without PII.
        </p>
      </header>

      <div className="panel p-5 space-y-4">
        <form className="flex flex-wrap gap-2 items-end" onSubmit={onExport}>
          <label className="text-xs uppercase tracking-wide text-[var(--color-steel)] grow min-w-[240px]">
            Artwork id (optional for export)
            <input
              className="field mt-1 mono"
              value={artworkId}
              onChange={(e) => setArtworkId(e.target.value)}
              placeholder="art_…"
            />
          </label>
          <button className="btn" type="submit">
            Generate export
          </button>
          <button className="btn btn-ghost" type="button" onClick={() => void onAnchor()}>
            Publish hash anchor
          </button>
        </form>

        {error ? (
          <p className="text-sm text-[var(--color-seal-red)]">{error}</p>
        ) : null}
        {result ? (
          <pre className="mono text-xs bg-[rgba(255,255,255,0.4)] p-3 rounded-[var(--radius-sm)] overflow-auto">
            {result}
          </pre>
        ) : null}
      </div>
    </div>
  );
}
