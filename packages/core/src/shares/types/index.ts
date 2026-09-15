/**
 * Shares Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/shares.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Distribution = components["schemas"]["Distribution"];
export type DistributionCreate = components["schemas"]["DistributionCreate"];
export type DistributionId = components["schemas"]["DistributionId"];
export type FreezeCreate = components["schemas"]["FreezeCreate"];
export type InvestorPosition = components["schemas"]["InvestorPosition"];
export type InvestorPositionId = components["schemas"]["InvestorPositionId"];
export type ShareClass = components["schemas"]["ShareClass"];
export type ShareClassCreate = components["schemas"]["ShareClassCreate"];
export type ShareClassId = components["schemas"]["ShareClassId"];
export type SubscriptionCreate = components["schemas"]["SubscriptionCreate"];
export type Transfer = components["schemas"]["Transfer"];
export type TransferCreate = components["schemas"]["TransferCreate"];
export type TransferId = components["schemas"]["TransferId"];
export type Subscription = operations["listInvestorPositions"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateShareClassRequestInput = NonNullable<operations["createShareClass"]["requestBody"]>["content"]["application/json"];
export type SubscribeSharesRequestInput = NonNullable<operations["subscribeShares"]["requestBody"]>["content"]["application/json"];
export type TransferSharesRequestInput = NonNullable<operations["transferShares"]["requestBody"]>["content"]["application/json"];
export type FreezeShareClassRequestInput = NonNullable<operations["freezeShareClass"]["requestBody"]>["content"]["application/json"];
export type RecordDistributionRequestInput = NonNullable<operations["recordDistribution"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListShareClassesParams = NonNullable<operations["listShareClasses"]["parameters"]["query"]>;
export type GetShareClassParams = operations["getShareClass"]["parameters"]["path"];
export type ListInvestorPositionsParams = NonNullable<operations["listInvestorPositions"]["parameters"]["query"]>;
export type SubscribeSharesParams = operations["subscribeShares"]["parameters"]["path"];
export type TransferSharesParams = operations["transferShares"]["parameters"]["path"];
export type FreezeShareClassParams = operations["freezeShareClass"]["parameters"]["path"];
export type ListDistributionsParams = NonNullable<operations["listDistributions"]["parameters"]["query"]>;
export type RecordDistributionParams = operations["recordDistribution"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListShareClassesResponse = operations["listShareClasses"]["responses"]["200"]["content"]["application/json"];
export type CreateShareClassResponse = operations["createShareClass"]["responses"]["201"]["content"]["application/json"];
export type GetShareClassResponse = operations["getShareClass"]["responses"]["200"]["content"]["application/json"];
export type ListInvestorPositionsResponse = operations["listInvestorPositions"]["responses"]["200"]["content"]["application/json"];
export type SubscribeSharesResponse = operations["subscribeShares"]["responses"]["201"]["content"]["application/json"];
export type TransferSharesResponse = operations["transferShares"]["responses"]["201"]["content"]["application/json"];
export type FreezeShareClassResponse = operations["freezeShareClass"]["responses"]["200"]["content"]["application/json"];
export type ListDistributionsResponse = operations["listDistributions"]["responses"]["200"]["content"]["application/json"];
export type RecordDistributionResponse = operations["recordDistribution"]["responses"]["201"]["content"]["application/json"];


