import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Company } from 'src/db/models/company.entity';
import { CompanyPriceCloseLatest } from 'src/db/models/companyPriceCloseLatest.entity';
import { CompanyService } from './company.service';
import CompanyRepository from 'src/db/repositories/company.repository';
import { CompanyPriceClose } from 'src/db/models/companyPriceClose.entity';
import { CompanyVolatilityScore } from 'src/db/models/companyVolatility.entity';
import { CompanyController } from './company.controller';
import { CacheService } from 'src/cache/cache.service';

@Module({
  imports: [
    SequelizeModule.forFeature([CompanyPriceClose, Company, CompanyVolatilityScore, CompanyPriceCloseLatest]),
  ],
  controllers: [CompanyController],
  providers: [
    CompanyRepository,
    CompanyService,
    CompanyController,
    CacheService
  ],
  exports: [
    CompanyService, 
    CompanyController 
  ]
})
export class CompanyModule {}
