/**
 * Title Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/title.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Encumbrance = components["schemas"]["Encumbrance"];
export type EncumbranceCreate = components["schemas"]["EncumbranceCreate"];
export type EncumbranceId = components["schemas"]["EncumbranceId"];
export type TitleStatus = components["schemas"]["TitleStatus"];
export type TitleStatusId = components["schemas"]["TitleStatusId"];
export type TitleStatusUpsert = components["schemas"]["TitleStatusUpsert"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type UpsertTitleStatusRequestInput = NonNullable<operations["upsertTitleStatus"]["requestBody"]>["content"]["application/json"];
export type RecordEncumbranceRequestInput = NonNullable<operations["recordEncumbrance"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type GetTitleStatusParams = operations["getTitleStatus"]["parameters"]["path"];
export type UpsertTitleStatusParams = operations["upsertTitleStatus"]["parameters"]["path"];
export type ListEncumbrancesParams = NonNullable<operations["listEncumbrances"]["parameters"]["query"]>;
export type RecordEncumbranceParams = operations["recordEncumbrance"]["parameters"]["path"];
export type ReleaseEncumbranceParams = operations["releaseEncumbrance"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type GetTitleStatusResponse = operations["getTitleStatus"]["responses"]["200"]["content"]["application/json"];
export type UpsertTitleStatusResponse = operations["upsertTitleStatus"]["responses"]["200"]["content"]["application/json"];
export type ListEncumbrancesResponse = operations["listEncumbrances"]["responses"]["200"]["content"]["application/json"];
export type RecordEncumbranceResponse = operations["recordEncumbrance"]["responses"]["201"]["content"]["application/json"];
export type ReleaseEncumbranceResponse = operations["releaseEncumbrance"]["responses"]["200"]["content"]["application/json"];


