import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /** CORS Configurations */
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  /** Setting up Websocket Adapter */
  app.useWebSocketAdapter(new IoAdapter(app));
  await app.listen(process.env.PORT ?? 3001);
}

bootstrap()
  .then(() => {
    Logger.log(`Application started on port ${process.env.PORT ?? 3001}`, 'Bootstrap');
  })
  .catch((error: unknown) => {
    const err = error as Error;
    Logger.error(`Failed to start application: ${err.message}`, err.stack, 'Bootstrap');
    process.exit(1);
  });
