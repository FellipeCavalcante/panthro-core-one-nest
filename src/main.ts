import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotFoundFilter } from './utils/not-found-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalFilters(new NotFoundFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
