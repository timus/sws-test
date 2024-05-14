import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CompanyPriceClose } from 'src/db/models/companyPriceClose.entity';
import { VolatilityQueueService } from './volatality-queue.service';

@Module({
  imports: [
    SequelizeModule.forFeature([CompanyPriceClose]) 
  ],
  providers: [VolatilityQueueService],
 
})
export class WorkerModule {}
