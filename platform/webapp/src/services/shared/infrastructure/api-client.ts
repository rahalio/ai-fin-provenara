/**
 * Shared API client — envelope-aware, Bearer + API-key auth.
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "";

const TOKEN_KEY = "provenara.accessToken";
const API_KEY_KEY = "provenara.apiKey";

export type Envelope<T> = {
  data: T;
  meta?: {
    correlationId?: string;
    requestId?: string;
    timestamp?: string;
    pagination?: { nextCursor?: string | null; limit?: number };
  };
};

export type ListData<T> = {
  items: T[];
  nextCursor?: string | null;
};

export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAccessToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export function getApiKey(): string {
  return (
    localStorage.getItem(API_KEY_KEY) ||
    import.meta.env.VITE_API_KEY ||
    "provenara_demo_local_dev_key"
  );
}

export function setApiKey(key: string) {
  localStorage.setItem(API_KEY_KEY, key);
}

function idempotencyKey(): string {
  return `idem_${crypto.randomUUID().replace(/-/g, "").slice(0, 24)}`;
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit & { idempotent?: boolean },
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-API-Key": getApiKey(),
    ...(init?.headers as Record<string, string> | undefined),
  };
  const token = getAccessToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (init?.idempotent || (init?.method && init.method !== "GET")) {
    headers["Idempotency-Key"] = idempotencyKey();
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export type Artwork = {
  id: string;
  title: string;
  artist?: string;
  year?: number;
  medium?: string;
};

export type TrustFile = {
  id?: string;
  artworkId: string;
  complete?: boolean;
  titleStatus?: string;
  insuranceStatus?: string;
  mismatchOpen?: boolean;
  provenanceComplete?: boolean;
  custodyBound?: boolean;
  valuationCurrent?: boolean;
  lendable?: boolean;
  offerReady?: boolean;
};

export type RiskAlert = {
  id: string;
  artworkId?: string;
  alertType: string;
  status: string;
  assigneeRef?: string;
};

export type ShareClass = {
  id: string;
  artworkId: string;
  name: string;
  totalShares: number;
  status: string;
};

export type Counterparty = {
  id: string;
  name: string;
  role: string;
  lastScreenOutcome?: string;
};

export const provenaraApi = {
  health: () => apiFetch<{ status?: string }>("/health"),

  listArtworks: (readiness?: string) =>
    apiFetch<Envelope<ListData<Artwork>>>(
      `/v1/artworks${readiness ? `?readiness=${encodeURIComponent(readiness)}` : ""}`,
    ),
  createArtwork: (body: { title: string; artist?: string; year?: number }) =>
    apiFetch<Envelope<Artwork>>("/v1/artworks", {
      method: "POST",
      body: JSON.stringify(body),
      idempotent: true,
    }),
  getArtwork: (id: string) =>
    apiFetch<Envelope<Artwork>>(`/v1/artworks/${id}`),
  getTrustFile: (id: string) =>
    apiFetch<Envelope<TrustFile>>(`/v1/artworks/${id}/trust-file`),

  listProvenance: (artworkId: string) =>
    apiFetch<Envelope<ListData<Record<string, unknown>>>>(
      `/v1/artworks/${artworkId}/provenance`,
    ),
  appendProvenance: (artworkId: string, body: { summary: string; documentHash?: string }) =>
    apiFetch<Envelope<Record<string, unknown>>>(
      `/v1/artworks/${artworkId}/provenance`,
      { method: "POST", body: JSON.stringify(body), idempotent: true },
    ),

  listCustody: (artworkId: string) =>
    apiFetch<Envelope<ListData<Record<string, unknown>>>>(
      `/v1/artworks/${artworkId}/custody`,
    ),
  attestCustody: (
    artworkId: string,
    body: { eventType: string; physicalBindingAttested?: boolean; notes?: string },
  ) =>
    apiFetch<Envelope<Record<string, unknown>>>(
      `/v1/artworks/${artworkId}/custody`,
      { method: "POST", body: JSON.stringify(body), idempotent: true },
    ),

  getTitle: (artworkId: string) =>
    apiFetch<Envelope<Record<string, unknown>>>(`/v1/artworks/${artworkId}/title`),
  upsertTitle: (artworkId: string, body: { status: string; notes?: string }) =>
    apiFetch<Envelope<Record<string, unknown>>>(`/v1/artworks/${artworkId}/title`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  listEncumbrances: (artworkId: string) =>
    apiFetch<Envelope<ListData<Record<string, unknown>>>>(
      `/v1/artworks/${artworkId}/encumbrances`,
    ),

  listValuations: (artworkId: string) =>
    apiFetch<Envelope<ListData<Record<string, unknown>>>>(
      `/v1/artworks/${artworkId}/valuations`,
    ),
  addValuation: (
    artworkId: string,
    body: {
      amount: number;
      currency: string;
      valuedOn: string;
      method: string;
      valuer: string;
      expiresOn?: string;
    },
  ) =>
    apiFetch<Envelope<Record<string, unknown>>>(
      `/v1/artworks/${artworkId}/valuations`,
      { method: "POST", body: JSON.stringify(body), idempotent: true },
    ),

  listInsurance: (artworkId: string) =>
    apiFetch<Envelope<ListData<Record<string, unknown>>>>(
      `/v1/artworks/${artworkId}/insurance`,
    ),
  bindInsurance: (
    artworkId: string,
    body: { insurerRef: string; policyNumber: string },
  ) =>
    apiFetch<Envelope<Record<string, unknown>>>(
      `/v1/artworks/${artworkId}/insurance`,
      { method: "POST", body: JSON.stringify(body), idempotent: true },
    ),

  listShareClasses: (artworkId?: string) =>
    apiFetch<Envelope<ListData<ShareClass>>>(
      `/v1/share-classes${artworkId ? `?artworkId=${encodeURIComponent(artworkId)}` : ""}`,
    ),
  createShareClass: (body: {
    artworkId: string;
    name: string;
    totalShares: number;
  }) =>
    apiFetch<Envelope<ShareClass>>("/v1/share-classes", {
      method: "POST",
      body: JSON.stringify(body),
      idempotent: true,
    }),

  listAlerts: (status?: string) =>
    apiFetch<Envelope<ListData<RiskAlert>>>(
      `/v1/alerts${status ? `?status=${encodeURIComponent(status)}` : ""}`,
    ),
  assignAlert: (alertId: string, assigneeRef: string) =>
    apiFetch<Envelope<RiskAlert>>(`/v1/alerts/${alertId}/assign`, {
      method: "POST",
      body: JSON.stringify({ assigneeRef }),
    }),
  resolveAlert: (alertId: string, resolutionNote: string) =>
    apiFetch<Envelope<RiskAlert>>(`/v1/alerts/${alertId}/resolve`, {
      method: "POST",
      body: JSON.stringify({ resolutionNote }),
    }),

  listCounterparties: () =>
    apiFetch<Envelope<ListData<Counterparty>>>("/v1/counterparties"),
  createCounterparty: (body: { name: string; role: string }) =>
    apiFetch<Envelope<Counterparty>>("/v1/counterparties", {
      method: "POST",
      body: JSON.stringify(body),
      idempotent: true,
    }),
  screenCounterparty: (id: string) =>
    apiFetch<Envelope<Record<string, unknown>>>(
      `/v1/counterparties/${id}/screen`,
      { method: "POST" },
    ),

  createAuditExport: (body: { periodFrom: string; periodTo: string; artworkId?: string }) =>
    apiFetch<Envelope<Record<string, unknown>>>("/v1/audits/exports", {
      method: "POST",
      body: JSON.stringify(body),
      idempotent: true,
    }),
  publishAnchor: (artworkId: string) =>
    apiFetch<Envelope<Record<string, unknown>>>(
      `/v1/artworks/${artworkId}/anchors`,
      { method: "POST", idempotent: true },
    ),
  listAnchors: (artworkId: string) =>
    apiFetch<Envelope<ListData<Record<string, unknown>>>>(
      `/v1/artworks/${artworkId}/anchors`,
    ),
};
