import { Injectable, Logger } from '@nestjs/common';
import { CacheService } from 'src/cache/cache.service';
import { Company } from 'src/db/models/company.entity';
import CompanyRepository from 'src/db/repositories/company.repository';

@Injectable()
export class CompanyService {
  private readonly cacheKey = 'companies_cache';
  private readonly cacheTTL = 86400;
  private readonly logger = new Logger(CompanyService.name);

  constructor(
    private companyRepo: CompanyRepository,
    private readonly cacheService: CacheService
  ) { }

  async upsertLatestPrice(companyId: string, price: number, date: Date): Promise<void> {
    this.logger.log(`Upserting latest price for company ID ${companyId}`);
    await this.companyRepo.upsertLatestPrice(companyId, price, date);
  }

  async getLatestPrice(companyId: string): Promise<{ price: number; date: Date } | null> {
    this.logger.log(`Fetching latest price for company ID ${companyId}`);
    const latestPriceRecord = await this.companyRepo.getLatestPrice(companyId);
    if (!latestPriceRecord) {
      this.logger.warn(`No latest price found for company ID ${companyId}`);
      return null;
    }
    return {
      price: latestPriceRecord.price,
      date: latestPriceRecord.date
    };
  }

  async getAllCompanyIds() {
    this.logger.log('Fetching all company IDs');
    return await this.companyRepo.getAllCompanyIds();
  }

  async upsertVolatilityScore(companyId: string, score: number) {
    this.logger.log(`Upserting volatility score for company ID ${companyId}`);
    return await this.companyRepo.upsertVolatilityScore(companyId, score);
  }

  async findPricesByCompanyId(companyId: string, days: number) {
    this.logger.log(`Fetching prices for company ID ${companyId} for the last ${days} days`);
    return await this.companyRepo.findPricesByCompanyId(companyId, days);
  }

  async getCompaniesWithDetails(
    sortParam: 'score' | 'volatility',
    sortDirection: 'ASC' | 'DESC',
    filterExchangeSymbol?: string,
    filterScore?: number
  ): Promise<any[]> {
    this.logger.log('Fetching companies with details');
    const cachedData = await this.cacheService.get(this.cacheKey);
    let companies;

    if (cachedData) {
      this.logger.log('Serving from cache');
      companies = JSON.parse(cachedData);
    } else {
      this.logger.log('Serving from database');
      companies = await this.companyRepo.findCompaniesWithDetails();
      await this.cacheService.set(this.cacheKey, JSON.stringify(companies), this.cacheTTL);
    }

    return this.filterAndSortCompanies(companies, sortParam, sortDirection, filterExchangeSymbol, filterScore);
  }

  private filterAndSortCompanies(
    companies: any[],
    sortParam: string,
    sortDirection: string,
    filterExchangeSymbol?: string,
    filterScore?: number
  ): any[] {
    this.logger.log('Filtering and sorting companies');
    
    let filteredCompanies = companies.filter(company => {
      const matchesExchangeSymbol = filterExchangeSymbol ? company.exchange_symbol === filterExchangeSymbol : true;
      const matchesScore = filterScore ? (Number(company.scores[0]?.total) >= filterScore) : true;
      return matchesExchangeSymbol && matchesScore;
    });

    filteredCompanies = filteredCompanies.sort((a, b) => {
      let aValue, bValue;
      if (sortParam === 'score') {
        aValue = Number(a.scores[0]?.total) || 0; 
        bValue = Number(b.scores[0]?.total) || 0; 
      } else if (sortParam === 'volatility') {
        aValue = Number(a.volatilityScores[0]?.score) || 0; 
        bValue = Number(b.volatilityScores[0]?.score) || 0; 
      }
      return sortDirection === 'ASC' ? aValue - bValue : bValue - aValue;
    });

    return filteredCompanies;
  }
}
