/**
 * Counterparties Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/counterparties.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Counterparty = components["schemas"]["Counterparty"];
export type CounterpartyCreate = components["schemas"]["CounterpartyCreate"];
export type CounterpartyId = components["schemas"]["CounterpartyId"];
export type CounterpartyRole = components["schemas"]["CounterpartyRole"];
export type ScreenOverrideCreate = components["schemas"]["ScreenOverrideCreate"];
export type ScreenResult = components["schemas"]["ScreenResult"];
export type ScreenResultId = components["schemas"]["ScreenResultId"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateCounterpartyRequestInput = NonNullable<operations["createCounterparty"]["requestBody"]>["content"]["application/json"];
export type OverrideScreenResultRequestInput = NonNullable<operations["overrideScreenResult"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListCounterpartiesParams = NonNullable<operations["listCounterparties"]["parameters"]["query"]>;
export type GetCounterpartyParams = operations["getCounterparty"]["parameters"]["path"];
export type ScreenCounterpartyParams = operations["screenCounterparty"]["parameters"]["path"];
export type OverrideScreenResultParams = operations["overrideScreenResult"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListCounterpartiesResponse = operations["listCounterparties"]["responses"]["200"]["content"]["application/json"];
export type CreateCounterpartyResponse = operations["createCounterparty"]["responses"]["201"]["content"]["application/json"];
export type GetCounterpartyResponse = operations["getCounterparty"]["responses"]["200"]["content"]["application/json"];
export type ScreenCounterpartyResponse = operations["screenCounterparty"]["responses"]["200"]["content"]["application/json"];
export type OverrideScreenResultResponse = operations["overrideScreenResult"]["responses"]["200"]["content"]["application/json"];


