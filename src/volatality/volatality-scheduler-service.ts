import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CompanyService } from 'src/company/company.service';
import { queue } from 'src/worker/scheduler/init';

@Injectable()
export class VolatilitySchedulerService implements OnModuleInit {
    private readonly logger = new Logger(VolatilitySchedulerService.name);

    constructor(private companyService: CompanyService) {}

    async onModuleInit() {
        this.logger.log('Initializing VolatilitySchedulerService...');
        await this.initSchedule();
    }

    async initSchedule() {
        try {
            const companyIds = await this.companyService.getAllCompanyIds();
            this.logger.log(`Preparing scheduler for ${companyIds.length} companies`);
            await this.initSchedulesForCompanies(companyIds);
            this.logger.log('Scheduler initialized successfully');
        } catch (error) {
            this.logger.error('Error initializing scheduler', error.stack);
        }
    }

    private async initSchedulesForCompanies(companyIds: string[]) {
        for (const companyId of companyIds) {
            try {
                await queue.add(
                    `calculate-volatility-${companyId}`,
                    { companyId },
                    { repeat: { every: 6000 } }
                );
                this.logger.log(`Scheduled volatility calculation for company ID: ${companyId}`);
            } catch (error) {
                this.logger.error(`Failed to schedule volatility calculation for company ID: ${companyId}`, error.stack);
            }
        }
    }
}
