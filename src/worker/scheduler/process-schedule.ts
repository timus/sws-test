import { NestFactory } from '@nestjs/core';
import { Worker, Job } from 'bullmq';
import { queue } from './init';
import { AppModule } from 'src/app.module';
import { VolatilityService } from 'src/volatality/volatality-service';
import { CompanyService } from 'src/company/company.service';
import { Logger } from '@nestjs/common';

async function setupWorker() {
    const appContext = await NestFactory.createApplicationContext(AppModule);
    const volatilityService = appContext.get(VolatilityService);
    const companyService = appContext.get(CompanyService);
    const logger = new Logger('Worker');

    logger.log('Waiting for jobs');

    const worker = new Worker(
        queue.name,
        async (job: Job) => {
            logger.log(`Processing job: ${job.id}`);
            try {
                const result = await volatilityService.calculateVolatility(job.data.companyId);
                logger.log(`Volatility calculated for company ID ${job.data.companyId}: ${result}`);

                const latestPrice = await companyService.getLatestPrice(job.data.companyId);
                if (latestPrice) {
                    await companyService.upsertLatestPrice(job.data.companyId, latestPrice.price, latestPrice.date);
                    logger.log(`Latest price updated for company ID ${job.data.companyId}: ${latestPrice.price} on ${latestPrice.date}`);
                } else {
                    logger.warn(`No latest price found for company ID ${job.data.companyId}`);
                }

                return { result: `Volatility calculated: ${result}`, id: job.id };
            } catch (error) {
                logger.error(`Error calculating volatility for job ID ${job.id}`, error.stack);
                throw error;
            }
        },
        {
            connection: queue.opts.connection,
            removeOnComplete: { age: 3600, count: 1000 }, // keep jobs for 1 hour or up to 1000 jobs
            removeOnFail: { age: 3600, count: 5000 } // keep failed jobs for 1 hour or up to 5000 jobs
        }
    );

    worker.on('completed', (job, result) => {
        logger.log(`Job ${job.id} completed with result: ${result}`);
    });

    worker.on('failed', (job, err) => {
        logger.error(`Job ${job.id} failed with error: ${err.message}`);
    });
}

setupWorker().catch((error) => {
    const logger = new Logger('SetupWorker');
    logger.error('Error setting up worker', error.stack);
});
