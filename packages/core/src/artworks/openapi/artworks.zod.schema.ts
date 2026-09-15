import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createArtwork_Body = z
  .object({
    title: z.string(),
    artist: z.string().optional(),
    year: z.number().int().optional(),
    medium: z.string().optional(),
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
const ArtworkId = z.string();
const TenantId = z.string();
const Artwork = z
  .object({
    id: z.string().regex(/^art_[0-9A-HJKMNP-TV-Z]{26}$/),
    tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
    title: z.string(),
    artist: z.string().optional(),
    year: z.number().int().optional(),
    medium: z.string().optional(),
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
const ArtworkListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^art_[0-9A-HJKMNP-TV-Z]{26}$/),
              tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
              title: z.string(),
              artist: z.string().optional(),
              year: z.number().int().optional(),
              medium: z.string().optional(),
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
const ArtworkCreate = z
  .object({
    title: z.string(),
    artist: z.string().optional(),
    year: z.number().int().optional(),
    medium: z.string().optional(),
  })
  .passthrough();
const ArtworkResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^art_[0-9A-HJKMNP-TV-Z]{26}$/),
        tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
        title: z.string(),
        artist: z.string().optional(),
        year: z.number().int().optional(),
        medium: z.string().optional(),
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
const TrustFileId = z.string();
const TrustFile = z
  .object({
    id: z.string().regex(/^trf_[0-9A-HJKMNP-TV-Z]{26}$/),
    tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
    artworkId: z.string().regex(/^art_[0-9A-HJKMNP-TV-Z]{26}$/),
    complete: z.boolean(),
    titleStatus: z
      .enum(['unknown', 'clear', 'encumbered', 'disputed'])
      .optional(),
    insuranceStatus: z
      .enum(['unknown', 'bound', 'lapsed', 'uninsured'])
      .optional(),
    mismatchOpen: z.boolean(),
    provenanceComplete: z.boolean().optional(),
    custodyBound: z.boolean().optional(),
    valuationCurrent: z.boolean().optional(),
    lendable: z.boolean().optional(),
    offerReady: z.boolean().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const TrustFileResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^trf_[0-9A-HJKMNP-TV-Z]{26}$/),
        tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
        artworkId: z.string().regex(/^art_[0-9A-HJKMNP-TV-Z]{26}$/),
        complete: z.boolean(),
        titleStatus: z
          .enum(['unknown', 'clear', 'encumbered', 'disputed'])
          .optional(),
        insuranceStatus: z
          .enum(['unknown', 'bound', 'lapsed', 'uninsured'])
          .optional(),
        mismatchOpen: z.boolean(),
        provenanceComplete: z.boolean().optional(),
        custodyBound: z.boolean().optional(),
        valuationCurrent: z.boolean().optional(),
        lendable: z.boolean().optional(),
        offerReady: z.boolean().optional(),
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
  createArtwork_Body,
  Problem,
  ArtworkId,
  TenantId,
  Artwork,
  ResponseMeta,
  ArtworkListResponse,
  ArtworkCreate,
  ArtworkResponse,
  TrustFileId,
  TrustFile,
  TrustFileResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/artworks',
    alias: 'listArtworks',
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
        name: 'readiness',
        type: 'Query',
        schema: z
          .enum([
            'complete',
            'mismatch',
            'staleMark',
            'uninsured',
            'incomplete',
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
                  id: z.string().regex(/^art_[0-9A-HJKMNP-TV-Z]{26}$/),
                  tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  title: z.string(),
                  artist: z.string().optional(),
                  year: z.number().int().optional(),
                  medium: z.string().optional(),
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
    path: '/v1/artworks',
    alias: 'createArtwork',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createArtwork_Body,
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
            id: z.string().regex(/^art_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            title: z.string(),
            artist: z.string().optional(),
            year: z.number().int().optional(),
            medium: z.string().optional(),
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
  {
    method: 'get',
    path: '/v1/artworks/:artworkId',
    alias: 'getArtwork',
    requestFormat: 'json',
    parameters: [
      {
        name: 'artworkId',
        type: 'Path',
        schema: z.string().regex(/^art_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^art_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            title: z.string(),
            artist: z.string().optional(),
            year: z.number().int().optional(),
            medium: z.string().optional(),
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
    method: 'get',
    path: '/v1/artworks/:artworkId/trust-file',
    alias: 'getTrustFile',
    requestFormat: 'json',
    parameters: [
      {
        name: 'artworkId',
        type: 'Path',
        schema: z.string().regex(/^art_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^trf_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            artworkId: z.string().regex(/^art_[0-9A-HJKMNP-TV-Z]{26}$/),
            complete: z.boolean(),
            titleStatus: z
              .enum(['unknown', 'clear', 'encumbered', 'disputed'])
              .optional(),
            insuranceStatus: z
              .enum(['unknown', 'bound', 'lapsed', 'uninsured'])
              .optional(),
            mismatchOpen: z.boolean(),
            provenanceComplete: z.boolean().optional(),
            custodyBound: z.boolean().optional(),
            valuationCurrent: z.boolean().optional(),
            lendable: z.boolean().optional(),
            offerReady: z.boolean().optional(),
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
