import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CompanyPriceClose } from 'src/db/models/companyPriceClose.entity';
import CompanyRepository from 'src/db/repositories/company.repository';
import { VolatilityService } from './volatality-service';
import { VolatilitySchedulerService } from './volatality-scheduler-service';
import { Company } from 'src/db/models/company.entity';
import { CompanyVolatilityScore } from 'src/db/models/companyVolatility.entity';
import { CompanyPriceCloseLatest } from 'src/db/models/companyPriceCloseLatest.entity';
import { CompanyService } from 'src/company/company.service';
import { CacheService } from 'src/cache/cache.service';

@Module({
  imports: [
    SequelizeModule.forFeature([CompanyPriceClose, Company, CompanyVolatilityScore, CompanyPriceCloseLatest]),
  ],
  providers: [
    CompanyRepository,
    CompanyService,
    VolatilityService,
    VolatilitySchedulerService,
    CacheService
  ],
  exports: [
    VolatilityService,
    VolatilitySchedulerService
  ]
})
export class VolatilityModule { }
