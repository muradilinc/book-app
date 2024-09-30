import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostController } from './post/post.controller';
import { DatabaseService } from './database/database.service';
import {DatabaseModule} from "./database/database.module";
import { OrderController } from './order/order.controller';
import { ProductController } from './product/product.controller';
import { UserController } from './user/user.controller';
import {AuthModule} from "./authentication/auth.module";

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [AppController, PostController, OrderController, ProductController, UserController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
