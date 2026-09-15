import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const RiskAlertId = z.string();
const TenantId = z.string();
const RiskAlert = z
  .object({
    id: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
    tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
    artworkId: z.string().optional(),
    alertType: z.enum([
      'mismatch',
      'valuationExpired',
      'insuranceLapse',
      'cashflowAnomaly',
    ]),
    status: z.enum(['open', 'assigned', 'resolved']),
    assigneeRef: z.string().optional(),
    resolutionNote: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const RiskAlertListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
              tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
              artworkId: z.string().optional(),
              alertType: z.enum([
                'mismatch',
                'valuationExpired',
                'insuranceLapse',
                'cashflowAnomaly',
              ]),
              status: z.enum(['open', 'assigned', 'resolved']),
              assigneeRef: z.string().optional(),
              resolutionNote: z.string().optional(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const RiskAlertResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
        tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
        artworkId: z.string().optional(),
        alertType: z.enum([
          'mismatch',
          'valuationExpired',
          'insuranceLapse',
          'cashflowAnomaly',
        ]),
        status: z.enum(['open', 'assigned', 'resolved']),
        assigneeRef: z.string().optional(),
        resolutionNote: z.string().optional(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const AlertAssignCreate = z.object({ assigneeRef: z.string() }).passthrough();
const AlertResolveCreate = z
  .object({ resolutionNote: z.string() })
  .passthrough();

export const schemas: any = {
  Problem,
  RiskAlertId,
  TenantId,
  RiskAlert,
  ResponseMeta,
  RiskAlertListResponse,
  RiskAlertResponse,
  AlertAssignCreate,
  AlertResolveCreate,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/alerts',
    alias: 'listRiskAlerts',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(200).optional().default(50),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z.enum(['open', 'assigned', 'resolved']).optional(),
      },
      {
        name: 'alertType',
        type: 'Query',
        schema: z
          .enum([
            'mismatch',
            'valuationExpired',
            'insuranceLapse',
            'cashflowAnomaly',
          ])
          .optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  artworkId: z.string().optional(),
                  alertType: z.enum([
                    'mismatch',
                    'valuationExpired',
                    'insuranceLapse',
                    'cashflowAnomaly',
                  ]),
                  status: z.enum(['open', 'assigned', 'resolved']),
                  assigneeRef: z.string().optional(),
                  resolutionNote: z.string().optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
  },
  {
    method: 'get',
    path: '/v1/alerts/:alertId',
    alias: 'getRiskAlert',
    requestFormat: 'json',
    parameters: [
      {
        name: 'alertId',
        type: 'Path',
        schema: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            artworkId: z.string().optional(),
            alertType: z.enum([
              'mismatch',
              'valuationExpired',
              'insuranceLapse',
              'cashflowAnomaly',
            ]),
            status: z.enum(['open', 'assigned', 'resolved']),
            assigneeRef: z.string().optional(),
            resolutionNote: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/alerts/:alertId/assign',
    alias: 'assignRiskAlert',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ assigneeRef: z.string() }).passthrough(),
      },
      {
        name: 'alertId',
        type: 'Path',
        schema: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            artworkId: z.string().optional(),
            alertType: z.enum([
              'mismatch',
              'valuationExpired',
              'insuranceLapse',
              'cashflowAnomaly',
            ]),
            status: z.enum(['open', 'assigned', 'resolved']),
            assigneeRef: z.string().optional(),
            resolutionNote: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
  },
  {
    method: 'post',
    path: '/v1/alerts/:alertId/resolve',
    alias: 'resolveRiskAlert',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ resolutionNote: z.string() }).passthrough(),
      },
      {
        name: 'alertId',
        type: 'Path',
        schema: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            artworkId: z.string().optional(),
            alertType: z.enum([
              'mismatch',
              'valuationExpired',
              'insuranceLapse',
              'cashflowAnomaly',
            ]),
            status: z.enum(['open', 'assigned', 'resolved']),
            assigneeRef: z.string().optional(),
            resolutionNote: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
