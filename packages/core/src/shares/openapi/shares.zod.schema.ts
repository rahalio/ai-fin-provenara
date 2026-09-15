import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createShareClass_Body = z
  .object({
    artworkId: z.string(),
    name: z.string(),
    totalShares: z.number(),
    eligibilityPolicy: z.string().optional(),
  })
  .passthrough();
const subscribeShares_Body = z
  .object({ investorId: z.string(), shares: z.number() })
  .passthrough();
const transferShares_Body = z
  .object({
    fromInvestorId: z.string(),
    toInvestorId: z.string(),
    shares: z.number(),
  })
  .passthrough();
const recordDistribution_Body = z
  .object({
    amount: z.number(),
    currency: z
      .string()
      .min(3)
      .max(3)
      .regex(/^[A-Z]{3}$/),
    memo: z.string().optional(),
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
const ShareClassId = z.string();
const TenantId = z.string();
const ShareClass = z
  .object({
    id: z.string().regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
    tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
    artworkId: z.string(),
    name: z.string(),
    totalShares: z.number(),
    status: z.enum(['draft', 'open', 'closed', 'frozen']),
    eligibilityPolicy: z.string().optional(),
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
const ShareClassListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
              tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
              artworkId: z.string(),
              name: z.string(),
              totalShares: z.number(),
              status: z.enum(['draft', 'open', 'closed', 'frozen']),
              eligibilityPolicy: z.string().optional(),
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
const ShareClassCreate = z
  .object({
    artworkId: z.string(),
    name: z.string(),
    totalShares: z.number(),
    eligibilityPolicy: z.string().optional(),
  })
  .passthrough();
const ShareClassResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
        tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
        artworkId: z.string(),
        name: z.string(),
        totalShares: z.number(),
        status: z.enum(['draft', 'open', 'closed', 'frozen']),
        eligibilityPolicy: z.string().optional(),
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
const InvestorPositionId = z.string();
const InvestorPosition = z
  .object({
    id: z.string().regex(/^pos_[0-9A-HJKMNP-TV-Z]{26}$/),
    tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
    shareClassId: z.string().regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
    investorId: z.string(),
    shares: z.number(),
    lockupUntil: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const InvestorPositionListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^pos_[0-9A-HJKMNP-TV-Z]{26}$/),
              tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
              shareClassId: z.string().regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
              investorId: z.string(),
              shares: z.number(),
              lockupUntil: z.string().optional(),
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
const SubscriptionCreate = z
  .object({ investorId: z.string(), shares: z.number() })
  .passthrough();
const InvestorPositionResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^pos_[0-9A-HJKMNP-TV-Z]{26}$/),
        tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
        shareClassId: z.string().regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
        investorId: z.string(),
        shares: z.number(),
        lockupUntil: z.string().optional(),
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
const TransferCreate = z
  .object({
    fromInvestorId: z.string(),
    toInvestorId: z.string(),
    shares: z.number(),
  })
  .passthrough();
const TransferId = z.string();
const Transfer = z
  .object({
    id: z.string().regex(/^xfr_[0-9A-HJKMNP-TV-Z]{26}$/),
    tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
    shareClassId: z.string().regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
    fromInvestorId: z.string(),
    toInvestorId: z.string(),
    shares: z.number(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const TransferResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^xfr_[0-9A-HJKMNP-TV-Z]{26}$/),
        tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
        shareClassId: z.string().regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
        fromInvestorId: z.string(),
        toInvestorId: z.string(),
        shares: z.number(),
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
const FreezeCreate = z.object({ reason: z.string() }).passthrough();
const DistributionId = z.string();
const Currency = z.string();
const Distribution = z
  .object({
    id: z.string().regex(/^dst_[0-9A-HJKMNP-TV-Z]{26}$/),
    tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
    shareClassId: z.string().regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
    amount: z.number(),
    currency: z
      .string()
      .min(3)
      .max(3)
      .regex(/^[A-Z]{3}$/),
    distributedOn: z.string().optional(),
    memo: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const DistributionListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^dst_[0-9A-HJKMNP-TV-Z]{26}$/),
              tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
              shareClassId: z.string().regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
              amount: z.number(),
              currency: z
                .string()
                .min(3)
                .max(3)
                .regex(/^[A-Z]{3}$/),
              distributedOn: z.string().optional(),
              memo: z.string().optional(),
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
const DistributionCreate = z
  .object({
    amount: z.number(),
    currency: z
      .string()
      .min(3)
      .max(3)
      .regex(/^[A-Z]{3}$/),
    memo: z.string().optional(),
  })
  .passthrough();
const DistributionResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^dst_[0-9A-HJKMNP-TV-Z]{26}$/),
        tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
        shareClassId: z.string().regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
        amount: z.number(),
        currency: z
          .string()
          .min(3)
          .max(3)
          .regex(/^[A-Z]{3}$/),
        distributedOn: z.string().optional(),
        memo: z.string().optional(),
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
  createShareClass_Body,
  subscribeShares_Body,
  transferShares_Body,
  recordDistribution_Body,
  Problem,
  ShareClassId,
  TenantId,
  ShareClass,
  ResponseMeta,
  ShareClassListResponse,
  ShareClassCreate,
  ShareClassResponse,
  InvestorPositionId,
  InvestorPosition,
  InvestorPositionListResponse,
  SubscriptionCreate,
  InvestorPositionResponse,
  TransferCreate,
  TransferId,
  Transfer,
  TransferResponse,
  FreezeCreate,
  DistributionId,
  Currency,
  Distribution,
  DistributionListResponse,
  DistributionCreate,
  DistributionResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/share-classes',
    alias: 'listShareClasses',
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
        name: 'artworkId',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
                  tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  artworkId: z.string(),
                  name: z.string(),
                  totalShares: z.number(),
                  status: z.enum(['draft', 'open', 'closed', 'frozen']),
                  eligibilityPolicy: z.string().optional(),
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
    path: '/v1/share-classes',
    alias: 'createShareClass',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createShareClass_Body,
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
            id: z.string().regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            artworkId: z.string(),
            name: z.string(),
            totalShares: z.number(),
            status: z.enum(['draft', 'open', 'closed', 'frozen']),
            eligibilityPolicy: z.string().optional(),
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
    path: '/v1/share-classes/:shareClassId',
    alias: 'getShareClass',
    requestFormat: 'json',
    parameters: [
      {
        name: 'shareClassId',
        type: 'Path',
        schema: z.string().regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            artworkId: z.string(),
            name: z.string(),
            totalShares: z.number(),
            status: z.enum(['draft', 'open', 'closed', 'frozen']),
            eligibilityPolicy: z.string().optional(),
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
    path: '/v1/share-classes/:shareClassId/distributions',
    alias: 'listDistributions',
    requestFormat: 'json',
    parameters: [
      {
        name: 'shareClassId',
        type: 'Path',
        schema: z.string().regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
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
                  id: z.string().regex(/^dst_[0-9A-HJKMNP-TV-Z]{26}$/),
                  tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  shareClassId: z
                    .string()
                    .regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
                  amount: z.number(),
                  currency: z
                    .string()
                    .min(3)
                    .max(3)
                    .regex(/^[A-Z]{3}$/),
                  distributedOn: z.string().optional(),
                  memo: z.string().optional(),
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
    path: '/v1/share-classes/:shareClassId/distributions',
    alias: 'recordDistribution',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: recordDistribution_Body,
      },
      {
        name: 'shareClassId',
        type: 'Path',
        schema: z.string().regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^dst_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            shareClassId: z.string().regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
            amount: z.number(),
            currency: z
              .string()
              .min(3)
              .max(3)
              .regex(/^[A-Z]{3}$/),
            distributedOn: z.string().optional(),
            memo: z.string().optional(),
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
    path: '/v1/share-classes/:shareClassId/freeze',
    alias: 'freezeShareClass',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ reason: z.string() }).passthrough(),
      },
      {
        name: 'shareClassId',
        type: 'Path',
        schema: z.string().regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            artworkId: z.string(),
            name: z.string(),
            totalShares: z.number(),
            status: z.enum(['draft', 'open', 'closed', 'frozen']),
            eligibilityPolicy: z.string().optional(),
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
    path: '/v1/share-classes/:shareClassId/subscriptions',
    alias: 'listInvestorPositions',
    requestFormat: 'json',
    parameters: [
      {
        name: 'shareClassId',
        type: 'Path',
        schema: z.string().regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
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
                  id: z.string().regex(/^pos_[0-9A-HJKMNP-TV-Z]{26}$/),
                  tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  shareClassId: z
                    .string()
                    .regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
                  investorId: z.string(),
                  shares: z.number(),
                  lockupUntil: z.string().optional(),
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
    path: '/v1/share-classes/:shareClassId/subscriptions',
    alias: 'subscribeShares',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: subscribeShares_Body,
      },
      {
        name: 'shareClassId',
        type: 'Path',
        schema: z.string().regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^pos_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            shareClassId: z.string().regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
            investorId: z.string(),
            shares: z.number(),
            lockupUntil: z.string().optional(),
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
    path: '/v1/share-classes/:shareClassId/transfers',
    alias: 'transferShares',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: transferShares_Body,
      },
      {
        name: 'shareClassId',
        type: 'Path',
        schema: z.string().regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^xfr_[0-9A-HJKMNP-TV-Z]{26}$/),
            tenantId: z.string().regex(/^tnt_[0-9A-HJKMNP-TV-Z]{26}$/),
            shareClassId: z.string().regex(/^shr_[0-9A-HJKMNP-TV-Z]{26}$/),
            fromInvestorId: z.string(),
            toInvestorId: z.string(),
            shares: z.number(),
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
