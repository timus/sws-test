import { Injectable, Logger } from '@nestjs/common';
import { CompanyService } from 'src/company/company.service';
import CompanyRepository from 'src/db/repositories/company.repository';

@Injectable()
export class VolatilityService {
  private readonly logger = new Logger(VolatilityService.name);

  constructor(private companyService: CompanyService) {}

  async calculateVolatility(companyId: string): Promise<number> {
    this.logger.log(`Starting volatility calculation for company ID: ${companyId}`);

    const prices = await this.companyService.findPricesByCompanyId(companyId, 30);
    if (prices.length < 30) {
      this.logger.warn(`Not enough data to calculate volatility for company ID: ${companyId}`);
      throw new Error('Not enough data to calculate volatility.');
    }

    this.logger.log(`Calculating volatility for company ID: ${companyId} with ${prices.length} data points`);
    const volatility = this.computeVolatility(prices.map(price => price.price));

    await this.companyService.upsertVolatilityScore(companyId, volatility);
    this.logger.log(`Volatility calculation completed for company ID: ${companyId}. Volatility: ${volatility}`);

    return volatility;
  }

  //https://corporatefinanceinstitute.com/resources/career-map/sell-side/capital-markets/volatility-vol/
  private computeVolatility(prices: number[]): number {
    const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
    const variances = prices.map(price => (price - mean) ** 2);
    const variance = variances.reduce((a, b) => a + b, 0) / prices.length;

    return Math.sqrt(variance);
  }
}
