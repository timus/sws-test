import { Controller, Get, Query } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('companies')
export class CompanyController {
  constructor(private companyService: CompanyService) { }

  @Get('/')
  async getCompanies(
    @Query('sort') sortParam: 'score' | 'volatility',
    @Query('sortDirection') sortDirection: 'ASC' | 'DESC' = 'DESC', 
    @Query('exchangeSymbol') exchangeSymbol?: string,
    @Query('score') score?: number
  ) {
    const numericScore = score ? Number(score) : undefined;

    const companies = await this.companyService.getCompaniesWithDetails(
      sortParam,
      sortDirection,
      exchangeSymbol,
      numericScore
    );
    return companies;
  }
}
