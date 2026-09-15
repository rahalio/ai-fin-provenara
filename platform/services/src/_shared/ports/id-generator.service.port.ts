/**
 * IdGeneratorService Port — Provenara prefixes.
 */

import type { DomainCode } from '@provenara/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  artId(): string;
  trfId(): string;
  prvId(): string;
  docId(): string;
  cusId(): string;
  ttlId(): string;
  encId(): string;
  ctpId(): string;
  scrId(): string;
  valId(): string;
  insId(): string;
  shrId(): string;
  posId(): string;
  xfrId(): string;
  dstId(): string;
  altId(): string;
  audId(): string;
  ancId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
