/**
 * Custody Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/custody.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type CustodyEvent = components["schemas"]["CustodyEvent"];
export type CustodyEventCreate = components["schemas"]["CustodyEventCreate"];
export type CustodyEventId = components["schemas"]["CustodyEventId"];
export type CustodyEventType = components["schemas"]["CustodyEventType"];
export type MismatchClearCreate = components["schemas"]["MismatchClearCreate"];
export type MismatchFlagCreate = components["schemas"]["MismatchFlagCreate"];
export type Custody = operations["listCustodyEvents"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type AttestCustodyRequestInput = NonNullable<operations["attestCustody"]["requestBody"]>["content"]["application/json"];
export type FlagCustodyMismatchRequestInput = NonNullable<operations["flagCustodyMismatch"]["requestBody"]>["content"]["application/json"];
export type ClearCustodyMismatchRequestInput = NonNullable<operations["clearCustodyMismatch"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListCustodyEventsParams = NonNullable<operations["listCustodyEvents"]["parameters"]["query"]>;
export type AttestCustodyParams = operations["attestCustody"]["parameters"]["path"];
export type FlagCustodyMismatchParams = operations["flagCustodyMismatch"]["parameters"]["path"];
export type ClearCustodyMismatchParams = operations["clearCustodyMismatch"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListCustodyEventsResponse = operations["listCustodyEvents"]["responses"]["200"]["content"]["application/json"];
export type AttestCustodyResponse = operations["attestCustody"]["responses"]["201"]["content"]["application/json"];
export type FlagCustodyMismatchResponse = operations["flagCustodyMismatch"]["responses"]["201"]["content"]["application/json"];
export type ClearCustodyMismatchResponse = operations["clearCustodyMismatch"]["responses"]["200"]["content"]["application/json"];


