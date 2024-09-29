import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostController } from './post/post.controller';
import { DatabaseService } from './database/database.service';
import {DatabaseModule} from "./database/database.module";
import { OrderController } from './order/order.controller';
import { ProductController } from './product/product.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, PostController, OrderController, ProductController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
