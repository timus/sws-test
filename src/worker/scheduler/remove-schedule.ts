import { queue } from './init';
import { Logger } from '@nestjs/common';

const logger = new Logger('Scheduler');

export async function removeSchedule(jobName: string): Promise<void> {
    try {
        const jobs = await queue.getRepeatableJobs();
        for (const job of jobs) {
            if (job.name === jobName) {
                await queue.removeRepeatableByKey(job.key);
                logger.log(`Removed scheduled job: ${jobName}`);
            }
        }
        logger.log(`Completed removal check for job: ${jobName}`);
    } catch (error) {
        logger.error(`Error removing scheduled job: ${jobName}`, error.stack);
    }
}
