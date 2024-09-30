import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {Client, ClientKafka, Transport} from "@nestjs/microservices";
import {CreateBookDto} from "./create-book.dto";
import {CreateProductDto} from "./create-product.dto";
import {CreateOrderDto} from "./create-order.dto";

@Controller('post')
export class PostController {
    @Client({
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: 'post',
                brokers: ['localhost:9092']
            },
            consumer: {
                groupId: 'book-post-consumer'
            }
        }
    })
    client: ClientKafka;
    async onModuleInit() {
        this.client.subscribeToResponseOf('post.new.product');
        this.client.subscribeToResponseOf('get.list.product');
        this.client.subscribeToResponseOf('get.single.product');
        this.client.subscribeToResponseOf('delete.single.product');

        this.client.subscribeToResponseOf('post.new.order');
        this.client.subscribeToResponseOf('get.list.order');
        this.client.subscribeToResponseOf('get.single.order');
        this.client.subscribeToResponseOf('delete.single.order');

        await this.client.connect();
    }


    @Post('/product')
    createProduct(@Body() productDto: CreateProductDto){
        console.log(productDto);
        return this.client.send('post.new.product', productDto);
    }


    @Get('/product')
    getProduct(){
        return this.client.send('get.list.product', '');
    }
    @Get('/:id')
    getSingleProduct(@Param() id: string) {
        return this.client.send('get.single.product', id);
    }

    @Delete('/:id')
    deleteProduct(@Param() id: string) {
        return this.client.send('delete.single.product', id)
    }


    @Post('/')
    createOrder(@Body() orderDto: CreateOrderDto){
        console.log(orderDto);
        return this.client.send('post.new.order', orderDto);
    }

    @Get('/')
    getOrders(){
        return this.client.send('get.list.order', '');
    }

    @Get('/:id')
    getSingleOrder(@Param() id: string) {
        return this.client.send('get.single.order', id);
    }

    @Delete('/:id')
    deleteOrder(@Param() id: string) {
        return this.client.send('delete.single.order', id)
    }
}
