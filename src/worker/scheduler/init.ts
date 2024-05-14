import { Queue } from 'bullmq';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();

const configService = new ConfigService();

const queue = new Queue('volatilityCalculation', {
    connection: {
        host: configService.get<string>('REDIS_HOST'),
        port: parseInt(configService.get<string>('REDIS_PORT'), 10),
    }
});

export { queue };
