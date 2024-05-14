import { Injectable } from '@nestjs/common';
import { SequelizeOptionsFactory, SequelizeModuleOptions } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { Company } from './models/company.entity';
import { CompanyPriceClose } from './models/companyPriceClose.entity';
import { CompanyScore } from './models/companyScore.entity';
import { CompanyVolatilityScore } from './models/companyVolatility.entity';
import { CompanyPriceCloseLatest } from './models/companyPriceCloseLatest.entity';

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
    constructor(private configService: ConfigService) { }

    createSequelizeOptions(): SequelizeModuleOptions {
        return {
            dialect: 'mysql',
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USERNAME'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_DATABASE'),
            autoLoadModels: true,
            synchronize: false,
            models: [Company, CompanyPriceClose, CompanyScore, CompanyVolatilityScore, CompanyPriceCloseLatest],
        };
    }
}
