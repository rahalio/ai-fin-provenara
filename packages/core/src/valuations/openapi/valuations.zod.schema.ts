import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const addValuation_Body = z
  .object({
    amount: z.number(),
    currency: z
      .string()
      .min(3)
      .max(3)
      .regex(/^[A-Z]{3}$/),
    valuedOn: z.string(),
    expiresOn: z.string().optional(),
    method: z.string(),
    valuer: z.string(),
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
const ValuationMarkId = z.string();
const TenantId = z.string();
const Currency = z.string();
const ValuationMark = z
  .object({
    id: z.string().regex(/^val_[0-9A-HJKMNP-TV-Z]{26}$/),
    tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
    artworkId: z.string(),
    amount: z.number(),
    currency: z
      .string()
      .min(3)
      .max(3)
      .regex(/^[A-Z]{3}$/),
    valuedOn: z.string(),
    expiresOn: z.string().optional(),
    method: z.string(),
    valuer: z.string(),
    expired: z.boolean().optional(),
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
const ValuationMarkListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^val_[0-9A-HJKMNP-TV-Z]{26}$/),
              tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
              artworkId: z.string(),
              amount: z.number(),
              currency: z
                .string()
                .min(3)
                .max(3)
                .regex(/^[A-Z]{3}$/),
              valuedOn: z.string(),
              expiresOn: z.string().optional(),
              method: z.string(),
              valuer: z.string(),
              expired: z.boolean().optional(),
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
const ValuationMarkCreate = z
  .object({
    amount: z.number(),
    currency: z
      .string()
      .min(3)
      .max(3)
      .regex(/^[A-Z]{3}$/),
    valuedOn: z.string(),
    expiresOn: z.string().optional(),
    method: z.string(),
    valuer: z.string(),
  })
  .passthrough();
const ValuationMarkResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^val_[0-9A-HJKMNP-TV-Z]{26}$/),
        tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
        artworkId: z.string(),
        amount: z.number(),
        currency: z
          .string()
          .min(3)
          .max(3)
          .regex(/^[A-Z]{3}$/),
        valuedOn: z.string(),
        expiresOn: z.string().optional(),
        method: z.string(),
        valuer: z.string(),
        expired: z.boolean().optional(),
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
  addValuation_Body,
  Problem,
  ValuationMarkId,
  TenantId,
  Currency,
  ValuationMark,
  ResponseMeta,
  ValuationMarkListResponse,
  ValuationMarkCreate,
  ValuationMarkResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/artworks/:artworkId/valuations',
    alias: 'listValuations',
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
                  id: z.string().regex(/^val_[0-9A-HJKMNP-TV-Z]{26}$/),
                  tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  artworkId: z.string(),
                  amount: z.number(),
                  currency: z
                    .string()
                    .min(3)
                    .max(3)
                    .regex(/^[A-Z]{3}$/),
                  valuedOn: z.string(),
                  expiresOn: z.string().optional(),
                  method: z.string(),
                  valuer: z.string(),
                  expired: z.boolean().optional(),
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
    path: '/v1/artworks/:artworkId/valuations',
    alias: 'addValuation',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: addValuation_Body,
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
            id: z.string().regex(/^val_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            artworkId: z.string(),
            amount: z.number(),
            currency: z
              .string()
              .min(3)
              .max(3)
              .regex(/^[A-Z]{3}$/),
            valuedOn: z.string(),
            expiresOn: z.string().optional(),
            method: z.string(),
            valuer: z.string(),
            expired: z.boolean().optional(),
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
    path: '/v1/artworks/:artworkId/valuations/:valuationId/expire',
    alias: 'expireValuation',
    requestFormat: 'json',
    parameters: [
      {
        name: 'artworkId',
        type: 'Path',
        schema: z.string(),
      },
      {
        name: 'valuationId',
        type: 'Path',
        schema: z.string().regex(/^val_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^val_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            artworkId: z.string(),
            amount: z.number(),
            currency: z
              .string()
              .min(3)
              .max(3)
              .regex(/^[A-Z]{3}$/),
            valuedOn: z.string(),
            expiresOn: z.string().optional(),
            method: z.string(),
            valuer: z.string(),
            expired: z.boolean().optional(),
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
