/**
 * Postman-collection 1:1 Vitest tests for audits (generated)
 *
 * One it() = one API request. Add sample data to vars for e2e runs.
 * Run: pnpm test:e2e or pnpm test:suite:db
 * Requires: API server at baseUrl (default http://localhost:3000)
 */

import { describe, it, expect } from "vitest";

const vars: Record<string, string> = {
  baseUrl: "http://localhost:3000",
  orgId: "test-org",
  accessToken: "",
  artworkId: "",
  cursor: "",
  exportId: "",
  limit: "",
};

function sub(s: string): string {
  return s.replace(/\{\{([^}]+)\}\}/g, (_, k) => vars[k.trim()] ?? "");
}

describe("Postman / audits (1:1 generated)", () => {

  it("createProvenaraAuditExport", async () => {
    const url = sub("{{baseUrl}}/v1/audits/exports");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"periodFrom\": \"\",\n  \"periodTo\": \"\",\n  \"artworkId\": \"newman_artworkId\"\n}"),
    });
    expect(res.status).toBe(201);
    const j = await res.json(); expect(j).toHaveProperty("data");
    if (j?.data?.id) vars['provenaraAuditExportId'] = j.data.id;
  });

  it("getAuditExport", async () => {
    const url = sub("{{baseUrl}}/v1/audits/exports/{{exportId}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("listAnchors", async () => {
    const url = sub("{{baseUrl}}/v1/artworks/{{artworkId}}/anchors?cursor={{cursor}}&limit={{limit}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("publishAnchor", async () => {
    const url = sub("{{baseUrl}}/v1/artworks/{{artworkId}}/anchors");
    const res = await fetch(url, {
      method: "POST",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(201);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });
});
