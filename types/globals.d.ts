export { };

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: "admin";
    };
  }

  interface Criteria {
    id: number;
    name: string;
    count: number;
    editable: boolean;
    boxName: string;
  }

  interface SectionItem {
    header: string;
    dataKey: string;
  }

  interface FinancialRange {
    min: string;
    max: string;
  }

  interface FinancialMetrics {
    revenue: FinancialRange;
    netIncome: FinancialRange;
    ebitda: FinancialRange;
    impliedEV: FinancialRange;
    ebit: string;
    marketCap: string;
    netDebt: string;
    grossProfit: string;
    totalRaised: string;
    totalDebt: string;
  }

  interface FiscalPeriod {
    from: string;
    to: string;
  }

  interface TableRow {
    companyLegalName: string;
    companyID: string;
    businessDescription: string;
    website: string;
    yearFounded: number;
    businessStatus: string;
    entityType: string;
    keyWords: string;
    numberOfEmployees: number;
    keyContactTitle: string;
    keyContactEmail: string;
    keyContactPhone: string;
    exchange: string;
    ticker: string;
    sicCodes: string;
    linkedInURL: string;
    lastUCCFilingData: string;
    businessLifeCycle: string;
    ownershipStatus: string;
    revenue: string;
    ebitda: string;
    financingStatus: string;
    enterpriseValue: string;
    totalRaised: string;
    fiscalPeriod: string;
    lastKnownValuation: string;
    primaryIndustrySector: string;
    primaryIndustryGroup: string;
    primaryIndustryCode: string;
    hqLocation: string;
    hqGlobalSubRegion: string;
    hqGlobalRegion: string;
    totalPatentDocuments?: number;
    totalPatentFamilies?: number;
    activePatentDocuments?: number;
    pendingPatentDocuments?: number;
    patentsExpiringNextYear?: number;
    topCPCCodes?: string;
  }
  interface IntellectualPropertyData {
    [key: string]: {
      min?: string;
      max?: string;
      value?: string;
    };
  }
}
