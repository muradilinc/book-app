import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

async function bootstrap() {
  try {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'book-post-consumer',
        }
      }
    });
    await app.listen();
    console.log('Kafka microservice is running...');
  } catch (error) {
    console.error('Error starting Kafka microservice', error);
  }
}
bootstrap();
