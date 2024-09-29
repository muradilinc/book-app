import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {Client, ClientKafka, Transport} from "@nestjs/microservices";
import {CreateBookDto} from "../post/create-book.dto";
import {CreateOrderDto} from "./create-order.dto";

@Controller('order')
export class OrderController {
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
        this.client.subscribeToResponseOf('post.new.order');
        this.client.subscribeToResponseOf('get.list.order');
        this.client.subscribeToResponseOf('get.single.order');
        this.client.subscribeToResponseOf('delete.single.order');

        await this.client.connect();
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
