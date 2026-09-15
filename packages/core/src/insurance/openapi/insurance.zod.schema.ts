import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const bindInsurancePolicy_Body = z
  .object({
    insurerRef: z.string(),
    policyNumber: z.string(),
    coverageAmount: z.number().optional(),
    currency: z
      .string()
      .min(3)
      .max(3)
      .regex(/^[A-Z]{3}$/)
      .optional(),
    effectiveOn: z.string().optional(),
    expiresOn: z.string().optional(),
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
const InsurancePolicyId = z.string();
const TenantId = z.string();
const Currency = z.string();
const InsurancePolicy = z
  .object({
    id: z.string().regex(/^ins_[0-9A-HJKMNP-TV-Z]{26}$/),
    tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
    artworkId: z.string(),
    insurerRef: z.string().optional(),
    policyNumber: z.string().optional(),
    status: z.enum(['bound', 'lapsed', 'uninsured']),
    coverageAmount: z.number().optional(),
    currency: z
      .string()
      .min(3)
      .max(3)
      .regex(/^[A-Z]{3}$/)
      .optional(),
    effectiveOn: z.string().optional(),
    expiresOn: z.string().optional(),
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
const InsurancePolicyListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^ins_[0-9A-HJKMNP-TV-Z]{26}$/),
              tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
              artworkId: z.string(),
              insurerRef: z.string().optional(),
              policyNumber: z.string().optional(),
              status: z.enum(['bound', 'lapsed', 'uninsured']),
              coverageAmount: z.number().optional(),
              currency: z
                .string()
                .min(3)
                .max(3)
                .regex(/^[A-Z]{3}$/)
                .optional(),
              effectiveOn: z.string().optional(),
              expiresOn: z.string().optional(),
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
const InsurancePolicyCreate = z
  .object({
    insurerRef: z.string(),
    policyNumber: z.string(),
    coverageAmount: z.number().optional(),
    currency: z
      .string()
      .min(3)
      .max(3)
      .regex(/^[A-Z]{3}$/)
      .optional(),
    effectiveOn: z.string().optional(),
    expiresOn: z.string().optional(),
  })
  .passthrough();
const InsurancePolicyResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^ins_[0-9A-HJKMNP-TV-Z]{26}$/),
        tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
        artworkId: z.string(),
        insurerRef: z.string().optional(),
        policyNumber: z.string().optional(),
        status: z.enum(['bound', 'lapsed', 'uninsured']),
        coverageAmount: z.number().optional(),
        currency: z
          .string()
          .min(3)
          .max(3)
          .regex(/^[A-Z]{3}$/)
          .optional(),
        effectiveOn: z.string().optional(),
        expiresOn: z.string().optional(),
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
  bindInsurancePolicy_Body,
  Problem,
  InsurancePolicyId,
  TenantId,
  Currency,
  InsurancePolicy,
  ResponseMeta,
  InsurancePolicyListResponse,
  InsurancePolicyCreate,
  InsurancePolicyResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/artworks/:artworkId/insurance',
    alias: 'listInsurancePolicies',
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
                  id: z.string().regex(/^ins_[0-9A-HJKMNP-TV-Z]{26}$/),
                  tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  artworkId: z.string(),
                  insurerRef: z.string().optional(),
                  policyNumber: z.string().optional(),
                  status: z.enum(['bound', 'lapsed', 'uninsured']),
                  coverageAmount: z.number().optional(),
                  currency: z
                    .string()
                    .min(3)
                    .max(3)
                    .regex(/^[A-Z]{3}$/)
                    .optional(),
                  effectiveOn: z.string().optional(),
                  expiresOn: z.string().optional(),
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
    path: '/v1/artworks/:artworkId/insurance',
    alias: 'bindInsurancePolicy',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: bindInsurancePolicy_Body,
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
            id: z.string().regex(/^ins_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            artworkId: z.string(),
            insurerRef: z.string().optional(),
            policyNumber: z.string().optional(),
            status: z.enum(['bound', 'lapsed', 'uninsured']),
            coverageAmount: z.number().optional(),
            currency: z
              .string()
              .min(3)
              .max(3)
              .regex(/^[A-Z]{3}$/)
              .optional(),
            effectiveOn: z.string().optional(),
            expiresOn: z.string().optional(),
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
    path: '/v1/artworks/:artworkId/insurance/:policyId/lapse',
    alias: 'lapseInsurancePolicy',
    requestFormat: 'json',
    parameters: [
      {
        name: 'artworkId',
        type: 'Path',
        schema: z.string(),
      },
      {
        name: 'policyId',
        type: 'Path',
        schema: z.string().regex(/^ins_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^ins_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            artworkId: z.string(),
            insurerRef: z.string().optional(),
            policyNumber: z.string().optional(),
            status: z.enum(['bound', 'lapsed', 'uninsured']),
            coverageAmount: z.number().optional(),
            currency: z
              .string()
              .min(3)
              .max(3)
              .regex(/^[A-Z]{3}$/)
              .optional(),
            effectiveOn: z.string().optional(),
            expiresOn: z.string().optional(),
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
