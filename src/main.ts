import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VolatilitySchedulerService } from './volatality/volatality-scheduler-service';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.RUN_MODE === 'HTTP') {
    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
  } else {
    // Worker mode
    console.log('Initializing the scheduler...');
    const volatilitySchedulerService = app.get(VolatilitySchedulerService);
    await volatilitySchedulerService.initSchedule(); 
    require('./worker/scheduler/process-schedule'); 
    console.log('Running in CLI mode');
  }
}

bootstrap();
