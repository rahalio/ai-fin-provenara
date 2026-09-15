/**
 * Artworks Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/artworks.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Artwork = components["schemas"]["Artwork"];
export type ArtworkCreate = components["schemas"]["ArtworkCreate"];
export type ArtworkId = components["schemas"]["ArtworkId"];
export type TrustFile = components["schemas"]["TrustFile"];
export type TrustFileId = components["schemas"]["TrustFileId"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateArtworkRequestInput = NonNullable<operations["createArtwork"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListArtworksParams = NonNullable<operations["listArtworks"]["parameters"]["query"]>;
export type GetArtworkParams = operations["getArtwork"]["parameters"]["path"];
export type GetTrustFileParams = operations["getTrustFile"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListArtworksResponse = operations["listArtworks"]["responses"]["200"]["content"]["application/json"];
export type CreateArtworkResponse = operations["createArtwork"]["responses"]["201"]["content"]["application/json"];
export type GetArtworkResponse = operations["getArtwork"]["responses"]["200"]["content"]["application/json"];
export type GetTrustFileResponse = operations["getTrustFile"]["responses"]["200"]["content"]["application/json"];


