import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const appendProvenance_Body = z
  .object({
    summary: z.string(),
    documentHash: z.string().optional(),
    documentUri: z.string().url().optional(),
    occurredOn: z.string().optional(),
  })
  .passthrough();
const attachDocumentArtefact_Body = z
  .object({
    label: z.string().optional(),
    contentHash: z.string(),
    uri: z.string().url().optional(),
    linkedEventId: z.string().optional(),
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
const ProvenanceEventId = z.string();
const TenantId = z.string();
const DocumentArtefactId = z.string();
const ProvenanceEvent = z
  .object({
    id: z.string().regex(/^prv_[0-9A-HJKMNP-TV-Z]{26}$/),
    tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
    artworkId: z.string(),
    summary: z.string(),
    documentHash: z.string().optional(),
    documentArtefactId: z
      .string()
      .regex(/^doc_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    occurredOn: z.string().optional(),
    disputed: z.boolean().optional(),
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
const ProvenanceEventListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^prv_[0-9A-HJKMNP-TV-Z]{26}$/),
              tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
              artworkId: z.string(),
              summary: z.string(),
              documentHash: z.string().optional(),
              documentArtefactId: z
                .string()
                .regex(/^doc_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              occurredOn: z.string().optional(),
              disputed: z.boolean().optional(),
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
const ProvenanceEventCreate = z
  .object({
    summary: z.string(),
    documentHash: z.string().optional(),
    documentUri: z.string().url().optional(),
    occurredOn: z.string().optional(),
  })
  .passthrough();
const ProvenanceEventResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^prv_[0-9A-HJKMNP-TV-Z]{26}$/),
        tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
        artworkId: z.string(),
        summary: z.string(),
        documentHash: z.string().optional(),
        documentArtefactId: z
          .string()
          .regex(/^doc_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        occurredOn: z.string().optional(),
        disputed: z.boolean().optional(),
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
const DocumentArtefact = z
  .object({
    id: z.string().regex(/^doc_[0-9A-HJKMNP-TV-Z]{26}$/),
    tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
    artworkId: z.string(),
    label: z.string().optional(),
    contentHash: z.string(),
    uri: z.string().url().optional(),
    linkedEventId: z
      .string()
      .regex(/^prv_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const DocumentArtefactListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^doc_[0-9A-HJKMNP-TV-Z]{26}$/),
              tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
              artworkId: z.string(),
              label: z.string().optional(),
              contentHash: z.string(),
              uri: z.string().url().optional(),
              linkedEventId: z
                .string()
                .regex(/^prv_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
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
const DocumentArtefactCreate = z
  .object({
    label: z.string().optional(),
    contentHash: z.string(),
    uri: z.string().url().optional(),
    linkedEventId: z.string().optional(),
  })
  .passthrough();
const DocumentArtefactResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^doc_[0-9A-HJKMNP-TV-Z]{26}$/),
        tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
        artworkId: z.string(),
        label: z.string().optional(),
        contentHash: z.string(),
        uri: z.string().url().optional(),
        linkedEventId: z
          .string()
          .regex(/^prv_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
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
  appendProvenance_Body,
  attachDocumentArtefact_Body,
  Problem,
  ProvenanceEventId,
  TenantId,
  DocumentArtefactId,
  ProvenanceEvent,
  ResponseMeta,
  ProvenanceEventListResponse,
  ProvenanceEventCreate,
  ProvenanceEventResponse,
  DocumentArtefact,
  DocumentArtefactListResponse,
  DocumentArtefactCreate,
  DocumentArtefactResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/artworks/:artworkId/documents',
    alias: 'listDocumentArtefacts',
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
                  id: z.string().regex(/^doc_[0-9A-HJKMNP-TV-Z]{26}$/),
                  tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  artworkId: z.string(),
                  label: z.string().optional(),
                  contentHash: z.string(),
                  uri: z.string().url().optional(),
                  linkedEventId: z
                    .string()
                    .regex(/^prv_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
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
    path: '/v1/artworks/:artworkId/documents',
    alias: 'attachDocumentArtefact',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: attachDocumentArtefact_Body,
      },
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
            id: z.string().regex(/^doc_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            artworkId: z.string(),
            label: z.string().optional(),
            contentHash: z.string(),
            uri: z.string().url().optional(),
            linkedEventId: z
              .string()
              .regex(/^prv_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
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
    path: '/v1/artworks/:artworkId/provenance',
    alias: 'listProvenance',
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
                  id: z.string().regex(/^prv_[0-9A-HJKMNP-TV-Z]{26}$/),
                  tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  artworkId: z.string(),
                  summary: z.string(),
                  documentHash: z.string().optional(),
                  documentArtefactId: z
                    .string()
                    .regex(/^doc_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  occurredOn: z.string().optional(),
                  disputed: z.boolean().optional(),
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
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
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
    path: '/v1/artworks/:artworkId/provenance',
    alias: 'appendProvenance',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: appendProvenance_Body,
      },
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
            id: z.string().regex(/^prv_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            artworkId: z.string(),
            summary: z.string(),
            documentHash: z.string().optional(),
            documentArtefactId: z
              .string()
              .regex(/^doc_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            occurredOn: z.string().optional(),
            disputed: z.boolean().optional(),
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
        status: 401,
        description: `Missing or invalid API key`,
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
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
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
