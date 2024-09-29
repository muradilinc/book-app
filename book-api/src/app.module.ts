import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostController } from './post/post.controller';
import { OrderController } from './order/order.controller';
import { ProductController } from './product/product.controller';

@Module({
  imports: [],
  controllers: [AppController, PostController, OrderController, ProductController],
  providers: [AppService],
})
export class AppModule {}
