import type { TrustFile } from "@/services/shared/infrastructure";

function Seal({
  label,
  state,
}: {
  label: string;
  state: "ok" | "block" | "warn" | "unknown";
}) {
  const cls =
    state === "ok"
      ? "seal-ok"
      : state === "block"
        ? "seal-block"
        : state === "warn"
          ? "seal-warn"
          : "seal-unknown";
  const text =
    state === "ok"
      ? "OK"
      : state === "block"
        ? "Block"
        : state === "warn"
          ? "Stale"
          : "Unknown";
  return (
    <span className={`seal ${cls}`} title={label}>
      {label}: {text}
    </span>
  );
}

export function TrustFileSealStrip({ trust }: { trust?: TrustFile | null }) {
  if (!trust) {
    return (
      <div className="flex flex-wrap gap-2">
        <Seal label="Provenance" state="unknown" />
        <Seal label="Custody" state="unknown" />
        <Seal label="Title" state="unknown" />
        <Seal label="Valuation" state="unknown" />
        <Seal label="Insurance" state="unknown" />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2" role="status" aria-live="polite">
      <Seal
        label="Provenance"
        state={trust.provenanceComplete ? "ok" : "block"}
      />
      <Seal
        label="Custody"
        state={
          trust.mismatchOpen ? "block" : trust.custodyBound ? "ok" : "block"
        }
      />
      <Seal
        label="Title"
        state={
          trust.titleStatus === "clear"
            ? "ok"
            : trust.titleStatus === "unknown" || !trust.titleStatus
              ? "unknown"
              : "warn"
        }
      />
      <Seal
        label="Valuation"
        state={trust.valuationCurrent ? "ok" : "warn"}
      />
      <Seal
        label="Insurance"
        state={
          trust.insuranceStatus === "bound"
            ? "ok"
            : trust.insuranceStatus === "lapsed"
              ? "block"
              : "unknown"
        }
      />
    </div>
  );
}
