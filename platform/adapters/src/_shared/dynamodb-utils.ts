/**
 * DynamoDB Utilities
 *
 * Table name resolvers and shared helpers for DynamoDB repository adapters.
 * Entity-specific key building is done via each adapter's private buildPK/buildSK.
 */

export { sanitizeItem } from "./dynamodb-key-helpers.js";

/**
 * Get the core DynamoDB table name from environment variables
 *
 * @returns The core table name (e.g., "provenara-core-dev")
 */
export function getCoreTableName(): string {
  const tableName = process.env.TABLE_NAME || process.env.DYNAMODB_CORE_TABLE_NAME;
  if (!tableName) {
    return "provenara-core-sandbox";
  }
  return tableName;
}

/**
 * Get the base DynamoDB table name from environment variables
 *
 * @returns The base table name (e.g., "provenara-base-dev")
 */
export function getBaseTableName(): string {
  const tableName = process.env.BASE_TABLE_NAME || process.env.DYNAMODB_BASE_TABLE_NAME;
  if (!tableName) {
    return "provenara-base-sandbox";
  }
  return tableName;
}

/**
 * Get the analytics DynamoDB table name from environment variables
 *
 * @returns The analytics table name (e.g., "provenara-analytics-dev")
 */
export function getAnalyticsTableName(): string {
  const tableName = process.env.ANALYTICS_TABLE_NAME || process.env.DYNAMODB_ANALYTICS_TABLE_NAME;
  if (!tableName) {
    return "provenara-analytics-sandbox";
  }
  return tableName;
}

/**
 * Get the realtime DynamoDB table name from environment variables
 *
 * @returns The realtime table name (e.g., "provenara-app-realtime-dev")
 */
export function getRealtimeTableName(): string {
  const tableName =
    process.env.REALTIME_TABLE_NAME || process.env.DYNAMODB_REALTIME_TABLE_NAME;
  if (!tableName) {
    return "provenara-realtime-sandbox";
  }
  return tableName;
}
