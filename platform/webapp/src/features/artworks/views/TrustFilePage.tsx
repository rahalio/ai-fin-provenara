import { FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { TrustFileSealStrip } from "@/components/TrustFileSealStrip";
import {
  provenaraApi,
  type Artwork,
  type TrustFile,
} from "@/services/shared/infrastructure";

type Tab =
  | "provenance"
  | "custody"
  | "title"
  | "valuations"
  | "insurance"
  | "shares";

export function TrustFilePage() {
  const { artworkId = "" } = useParams();
  const [tab, setTab] = useState<Tab>("provenance");
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [trust, setTrust] = useState<TrustFile | null>(null);
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState("");
  const [busy, setBusy] = useState(false);

  async function refreshHeader() {
    const [a, t] = await Promise.all([
      provenaraApi.getArtwork(artworkId),
      provenaraApi.getTrustFile(artworkId).catch(() => null),
    ]);
    setArtwork(a.data);
    setTrust(t?.data ?? null);
  }

  async function refreshTab() {
    setError(null);
    try {
      if (tab === "provenance") {
        const res = await provenaraApi.listProvenance(artworkId);
        setRows(res.data?.items ?? []);
      } else if (tab === "custody") {
        const res = await provenaraApi.listCustody(artworkId);
        setRows(res.data?.items ?? []);
      } else if (tab === "title") {
        const [title, enc] = await Promise.all([
          provenaraApi.getTitle(artworkId).catch(() => null),
          provenaraApi.listEncumbrances(artworkId),
        ]);
        setRows([
          ...(title?.data ? [{ kind: "title", ...title.data }] : []),
          ...(enc.data?.items ?? []).map((e) => ({ kind: "encumbrance", ...e })),
        ]);
      } else if (tab === "valuations") {
        const res = await provenaraApi.listValuations(artworkId);
        setRows(res.data?.items ?? []);
      } else if (tab === "insurance") {
        const res = await provenaraApi.listInsurance(artworkId);
        setRows(res.data?.items ?? []);
      } else if (tab === "shares") {
        const res = await provenaraApi.listShareClasses(artworkId);
        setRows((res.data?.items ?? []) as unknown as Record<string, unknown>[]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
      setRows([]);
    }
  }

  useEffect(() => {
    void refreshHeader().catch((err) =>
      setError(err instanceof Error ? err.message : "Failed to load"),
    );
  }, [artworkId]);

  useEffect(() => {
    void refreshTab();
  }, [artworkId, tab]);

  async function onAppendProvenance(e: FormEvent) {
    e.preventDefault();
    if (!summary.trim()) return;
    setBusy(true);
    try {
      await provenaraApi.appendProvenance(artworkId, { summary: summary.trim() });
      setSummary("");
      await refreshTab();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Append failed");
    } finally {
      setBusy(false);
    }
  }

  async function onAttestCustody() {
    setBusy(true);
    try {
      await provenaraApi.attestCustody(artworkId, {
        eventType: "inspection",
        physicalBindingAttested: true,
        notes: "Physical binding attested",
      });
      await refreshTab();
      await refreshHeader().catch(() => undefined);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Attest failed");
    } finally {
      setBusy(false);
    }
  }

  async function onUpsertTitle() {
    setBusy(true);
    try {
      await provenaraApi.upsertTitle(artworkId, { status: "clear" });
      await refreshTab();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Title update failed");
    } finally {
      setBusy(false);
    }
  }

  async function onAddValuation() {
    setBusy(true);
    try {
      const today = new Date().toISOString().slice(0, 10);
      await provenaraApi.addValuation(artworkId, {
        amount: 1_250_000,
        currency: "EUR",
        valuedOn: today,
        expiresOn: new Date(Date.now() + 1000 * 60 * 60 * 24 * 180)
          .toISOString()
          .slice(0, 10),
        method: "comparable sales",
        valuer: "Committee desk",
      });
      await refreshTab();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Valuation failed");
    } finally {
      setBusy(false);
    }
  }

  async function onBindInsurance() {
    setBusy(true);
    try {
      await provenaraApi.bindInsurance(artworkId, {
        insurerRef: "insurer_demo",
        policyNumber: `POL-${artworkId.slice(-6)}`,
      });
      await refreshTab();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bind failed");
    } finally {
      setBusy(false);
    }
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "provenance", label: "Provenance" },
    { id: "custody", label: "Custody" },
    { id: "title", label: "Title" },
    { id: "valuations", label: "Valuations" },
    { id: "insurance", label: "Insurance" },
    { id: "shares", label: "Share classes" },
  ];

  return (
    <div className="space-y-5">
      <div>
        <Link
          to="/"
          className="text-sm text-[rgba(243,237,228,0.65)] no-underline hover:text-[var(--color-brand)]"
        >
          ← Trust files
        </Link>
        <div className="brand-mark text-sm mt-3 mb-1">Provenara</div>
        <h1 className="text-3xl text-[var(--color-paper)]">
          {artwork?.title || "Trust file"}
        </h1>
        <p className="text-sm text-[rgba(243,237,228,0.65)] mt-1">
          {[artwork?.artist, artwork?.year].filter(Boolean).join(" · ") ||
            "Artwork dossier"}
          <span className="mono ml-3 opacity-70">{artworkId}</span>
        </p>
      </div>

      <div className="panel p-4">
        <TrustFileSealStrip trust={trust} />
        {trust?.mismatchOpen ? (
          <p className="mt-3 text-sm text-[var(--color-seal-red)]" role="alert">
            Physical binding mismatch open — subscriptions and new loans are
            blocked.
          </p>
        ) : null}
      </div>

      <div className="panel overflow-hidden">
        <div className="flex gap-1 border-b border-[rgba(26,18,16,0.1)] px-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              className="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-5 space-y-4">
          {error ? (
            <p className="text-sm text-[var(--color-seal-red)]">{error}</p>
          ) : null}

          {tab === "provenance" ? (
            <form className="flex gap-2 items-end" onSubmit={onAppendProvenance}>
              <label className="grow text-xs uppercase tracking-wide text-[var(--color-steel)]">
                Append event
                <input
                  className="field mt-1"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Exhibition / invoice / certificate summary"
                />
              </label>
              <button className="btn" type="submit" disabled={busy}>
                Append
              </button>
            </form>
          ) : null}

          {tab === "custody" ? (
            <button className="btn" type="button" disabled={busy} onClick={onAttestCustody}>
              Attest inspection binding
            </button>
          ) : null}

          {tab === "title" ? (
            <button className="btn" type="button" disabled={busy} onClick={onUpsertTitle}>
              Mark title clear
            </button>
          ) : null}

          {tab === "valuations" ? (
            <button className="btn" type="button" disabled={busy} onClick={onAddValuation}>
              Post committee mark
            </button>
          ) : null}

          {tab === "insurance" ? (
            <button className="btn" type="button" disabled={busy} onClick={onBindInsurance}>
              Bind insurance
            </button>
          ) : null}

          {tab === "shares" ? (
            <Link className="btn inline-block no-underline" to="/shares">
              Open share register
            </Link>
          ) : null}

          {rows.length === 0 ? (
            <p className="text-sm text-[var(--color-steel)]">
              No records yet for this section.
            </p>
          ) : (
            <ul className="space-y-2">
              {rows.map((row, i) => (
                <li
                  key={String(row.id ?? i)}
                  className="rounded-[var(--radius-sm)] border border-[rgba(26,18,16,0.08)] bg-[rgba(255,255,255,0.35)] px-3 py-2 text-sm"
                >
                  <pre className="mono m-0 whitespace-pre-wrap break-all text-[0.78rem] text-[rgba(26,18,16,0.8)]">
                    {JSON.stringify(row, null, 2)}
                  </pre>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
