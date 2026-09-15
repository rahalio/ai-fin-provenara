import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createProvenaraAuditExport_Body = z
  .object({
    periodFrom: z.string().datetime({ offset: true }),
    periodTo: z.string().datetime({ offset: true }),
    artworkId: z.string().optional(),
  })
  .passthrough();
const AuditExportCreate = z
  .object({
    periodFrom: z.string().datetime({ offset: true }),
    periodTo: z.string().datetime({ offset: true }),
    artworkId: z.string().optional(),
  })
  .passthrough();
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
const AuditExportId = z.string();
const TenantId = z.string();
const AuditExport = z
  .object({
    id: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
    tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
    status: z.enum(['pending', 'ready', 'failed']),
    periodFrom: z.string().datetime({ offset: true }).optional(),
    periodTo: z.string().datetime({ offset: true }).optional(),
    downloadUri: z.string().url().optional(),
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
const AuditExportResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
        tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
        status: z.enum(['pending', 'ready', 'failed']),
        periodFrom: z.string().datetime({ offset: true }).optional(),
        periodTo: z.string().datetime({ offset: true }).optional(),
        downloadUri: z.string().url().optional(),
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
const AnchorReceiptId = z.string();
const AnchorReceipt = z
  .object({
    id: z.string().regex(/^anc_[0-9A-HJKMNP-TV-Z]{26}$/),
    tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
    artworkId: z.string(),
    contentHash: z.string(),
    anchoredAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const AnchorReceiptListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^anc_[0-9A-HJKMNP-TV-Z]{26}$/),
              tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
              artworkId: z.string(),
              contentHash: z.string(),
              anchoredAt: z.string().datetime({ offset: true }).optional(),
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
const AnchorReceiptResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^anc_[0-9A-HJKMNP-TV-Z]{26}$/),
        tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
        artworkId: z.string(),
        contentHash: z.string(),
        anchoredAt: z.string().datetime({ offset: true }).optional(),
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

export const schemas: any = {
  createProvenaraAuditExport_Body,
  AuditExportCreate,
  Problem,
  AuditExportId,
  TenantId,
  AuditExport,
  ResponseMeta,
  AuditExportResponse,
  AnchorReceiptId,
  AnchorReceipt,
  AnchorReceiptListResponse,
  AnchorReceiptResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/artworks/:artworkId/anchors',
    alias: 'listAnchors',
    requestFormat: 'json',
    parameters: [
      {
        name: 'artworkId',
        type: 'Path',
        schema: z.string(),
      },
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
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^anc_[0-9A-HJKMNP-TV-Z]{26}$/),
                  tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  artworkId: z.string(),
                  contentHash: z.string(),
                  anchoredAt: z.string().datetime({ offset: true }).optional(),
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
    method: 'post',
    path: '/v1/artworks/:artworkId/anchors',
    alias: 'publishAnchor',
    requestFormat: 'json',
    parameters: [
      {
        name: 'artworkId',
        type: 'Path',
        schema: z.string(),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^anc_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            artworkId: z.string(),
            contentHash: z.string(),
            anchoredAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/audits/exports',
    alias: 'createProvenaraAuditExport',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createProvenaraAuditExport_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['pending', 'ready', 'failed']),
            periodFrom: z.string().datetime({ offset: true }).optional(),
            periodTo: z.string().datetime({ offset: true }).optional(),
            downloadUri: z.string().url().optional(),
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
    method: 'get',
    path: '/v1/audits/exports/:exportId',
    alias: 'getAuditExport',
    requestFormat: 'json',
    parameters: [
      {
        name: 'exportId',
        type: 'Path',
        schema: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['pending', 'ready', 'failed']),
            periodFrom: z.string().datetime({ offset: true }).optional(),
            periodTo: z.string().datetime({ offset: true }).optional(),
            downloadUri: z.string().url().optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
