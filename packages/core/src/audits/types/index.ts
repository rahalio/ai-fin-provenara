/**
 * Audits Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/audits.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AnchorReceipt = components["schemas"]["AnchorReceipt"];
export type AnchorReceiptId = components["schemas"]["AnchorReceiptId"];
export type AuditExport = components["schemas"]["AuditExport"];
export type AuditExportCreate = components["schemas"]["AuditExportCreate"];
export type AuditExportId = components["schemas"]["AuditExportId"];
export type Anchor = operations["listAnchors"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateProvenaraAuditExportRequestInput = NonNullable<operations["createProvenaraAuditExport"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type GetAuditExportParams = operations["getAuditExport"]["parameters"]["path"];
export type ListAnchorsParams = NonNullable<operations["listAnchors"]["parameters"]["query"]>;
export type PublishAnchorParams = operations["publishAnchor"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type CreateProvenaraAuditExportResponse = operations["createProvenaraAuditExport"]["responses"]["201"]["content"]["application/json"];
export type GetAuditExportResponse = operations["getAuditExport"]["responses"]["200"]["content"]["application/json"];
export type ListAnchorsResponse = operations["listAnchors"]["responses"]["200"]["content"]["application/json"];
export type PublishAnchorResponse = operations["publishAnchor"]["responses"]["201"]["content"]["application/json"];


