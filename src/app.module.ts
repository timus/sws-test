import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeConfigService } from './db/sequelize-config.service';
import { VolatilityModule } from './volatality/volatality.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    VolatilityModule,
    CompanyModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [SequelizeConfigService],
      useClass: SequelizeConfigService,
    }),
     
  ],
})
export class AppModule {}
