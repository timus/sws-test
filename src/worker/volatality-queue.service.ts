// volatility-queue.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { initSchedule } from './scheduler/init-schedule';


@Injectable()
export class VolatilityQueueService implements OnModuleInit {

  async onModuleInit() {
    await initSchedule();
  }
 
}
