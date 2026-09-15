/**
 * ID Generator Service Implementation — Provenara prefixes.
 */

import type { DomainCode } from '@provenara/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@provenara/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@provenara/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  artId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.artwork);
  }
  trfId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.trustFile);
  }
  prvId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.provenanceEvent);
  }
  docId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.documentArtefact);
  }
  cusId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.custodyEvent);
  }
  ttlId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.titleStatus);
  }
  encId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.encumbrance);
  }
  ctpId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.counterparty);
  }
  scrId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.screenResult);
  }
  valId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.valuationMark);
  }
  insId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.insurancePolicy);
  }
  shrId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.shareClass);
  }
  posId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.investorPosition);
  }
  xfrId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.transfer);
  }
  dstId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.distribution);
  }
  altId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.riskAlert);
  }
  audId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auditExport);
  }
  ancId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.anchorReceipt);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
