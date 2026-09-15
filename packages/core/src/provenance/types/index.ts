/**
 * Provenance Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/provenance.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type DocumentArtefact = components["schemas"]["DocumentArtefact"];
export type DocumentArtefactCreate = components["schemas"]["DocumentArtefactCreate"];
export type DocumentArtefactId = components["schemas"]["DocumentArtefactId"];
export type ProvenanceEvent = components["schemas"]["ProvenanceEvent"];
export type ProvenanceEventCreate = components["schemas"]["ProvenanceEventCreate"];
export type ProvenanceEventId = components["schemas"]["ProvenanceEventId"];
export type Provenance = operations["listProvenance"]["responses"]["200"]["content"]["application/json"]["data"];
export type Document = operations["listDocumentArtefacts"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type AppendProvenanceRequestInput = NonNullable<operations["appendProvenance"]["requestBody"]>["content"]["application/json"];
export type AttachDocumentArtefactRequestInput = NonNullable<operations["attachDocumentArtefact"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListProvenanceParams = NonNullable<operations["listProvenance"]["parameters"]["query"]>;
export type AppendProvenanceParams = operations["appendProvenance"]["parameters"]["path"];
export type ListDocumentArtefactsParams = NonNullable<operations["listDocumentArtefacts"]["parameters"]["query"]>;
export type AttachDocumentArtefactParams = operations["attachDocumentArtefact"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListProvenanceResponse = operations["listProvenance"]["responses"]["200"]["content"]["application/json"];
export type AppendProvenanceResponse = operations["appendProvenance"]["responses"]["201"]["content"]["application/json"];
export type ListDocumentArtefactsResponse = operations["listDocumentArtefacts"]["responses"]["200"]["content"]["application/json"];
export type AttachDocumentArtefactResponse = operations["attachDocumentArtefact"]["responses"]["201"]["content"]["application/json"];


