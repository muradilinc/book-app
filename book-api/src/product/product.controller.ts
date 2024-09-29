import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {Client, ClientKafka, Transport} from "@nestjs/microservices";
import {CreateProductDto} from "./create-product.dto";

@Controller('product')
export class ProductController {
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

        await this.client.connect();
    }

    @Post('/')
    createProduct(@Body() productDto: CreateProductDto){
        console.log(productDto);
        return this.client.send('post.new.product', productDto);
    }

    @Get('/')
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

}
