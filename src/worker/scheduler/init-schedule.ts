import { queue } from './init';

export async function initSchedule(): Promise<void> {
    await queue.add(queue.name, {}, {
        repeat: { every: 60000 } 
    });
    console.log('Scheduled task to calculate volatility every 60 seconds.');
}
