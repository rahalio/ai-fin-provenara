import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  provenaraApi,
  type Artwork,
} from "@/services/shared/infrastructure";

const FILTERS = [
  { id: "", label: "All" },
  { id: "complete", label: "Complete" },
  { id: "mismatch", label: "Mismatch" },
  { id: "staleMark", label: "Stale mark" },
  { id: "uninsured", label: "Uninsured" },
  { id: "incomplete", label: "Incomplete" },
] as const;

export function TrustFilesHomePage() {
  const [items, setItems] = useState<Artwork[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  async function load(readiness = filter) {
    setLoading(true);
    setError(null);
    try {
      const res = await provenaraApi.listArtworks(readiness || undefined);
      setItems(res.data?.items ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, [filter]);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    await provenaraApi.createArtwork({
      title: title.trim(),
      artist: artist.trim() || undefined,
    });
    setTitle("");
    setArtist("");
    await load();
  }

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between gap-4">
        <div>
          <div className="brand-mark text-sm mb-1">Provenara</div>
          <h1 className="text-3xl text-[var(--color-paper)]">Trust files</h1>
          <p className="mt-1 text-sm text-[rgba(243,237,228,0.65)]">
            Which artworks are credit- or offer-ready?
          </p>
        </div>
      </header>

      <div className="panel p-5 space-y-4">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id || "all"}
              type="button"
              className={`btn ${filter === f.id ? "" : "btn-ghost"}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <form className="flex flex-wrap gap-2 items-end" onSubmit={onCreate}>
          <label className="text-xs uppercase tracking-wide text-[var(--color-steel)] grow min-w-[180px]">
            Title
            <input
              className="field mt-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Artwork title"
              required
            />
          </label>
          <label className="text-xs uppercase tracking-wide text-[var(--color-steel)] grow min-w-[140px]">
            Artist
            <input
              className="field mt-1"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              placeholder="Artist"
            />
          </label>
          <button className="btn" type="submit">
            Open trust file
          </button>
        </form>

        {error ? (
          <p className="text-sm text-[var(--color-seal-red)]">{error}</p>
        ) : null}

        {loading ? (
          <p className="text-sm text-[var(--color-steel)]">Loading dossier table…</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-[var(--color-steel)]">
            No trust files yet — open the first dossier above.
          </p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Artwork</th>
                <th>Artist</th>
                <th>Year</th>
                <th>Id</th>
              </tr>
            </thead>
            <tbody>
              {items.map((a) => (
                <tr key={a.id}>
                  <td>
                    <Link
                      className="text-[var(--color-oxblood)] font-medium no-underline hover:underline"
                      to={`/artworks/${a.id}`}
                    >
                      {a.title}
                    </Link>
                  </td>
                  <td>{a.artist || "—"}</td>
                  <td>{a.year ?? "—"}</td>
                  <td className="mono text-[var(--color-steel)]">{a.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
