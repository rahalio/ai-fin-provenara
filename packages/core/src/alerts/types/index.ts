/**
 * Alerts Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/alerts.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AlertAssignCreate = components["schemas"]["AlertAssignCreate"];
export type AlertResolveCreate = components["schemas"]["AlertResolveCreate"];
export type RiskAlert = components["schemas"]["RiskAlert"];
export type RiskAlertId = components["schemas"]["RiskAlertId"];
export type Alert = operations["listRiskAlerts"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type AssignRiskAlertRequestInput = NonNullable<operations["assignRiskAlert"]["requestBody"]>["content"]["application/json"];
export type ResolveRiskAlertRequestInput = NonNullable<operations["resolveRiskAlert"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListRiskAlertsParams = NonNullable<operations["listRiskAlerts"]["parameters"]["query"]>;
export type GetRiskAlertParams = operations["getRiskAlert"]["parameters"]["path"];
export type AssignRiskAlertParams = operations["assignRiskAlert"]["parameters"]["path"];
export type ResolveRiskAlertParams = operations["resolveRiskAlert"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListRiskAlertsResponse = operations["listRiskAlerts"]["responses"]["200"]["content"]["application/json"];
export type GetRiskAlertResponse = operations["getRiskAlert"]["responses"]["200"]["content"]["application/json"];
export type AssignRiskAlertResponse = operations["assignRiskAlert"]["responses"]["200"]["content"]["application/json"];
export type ResolveRiskAlertResponse = operations["resolveRiskAlert"]["responses"]["200"]["content"]["application/json"];


