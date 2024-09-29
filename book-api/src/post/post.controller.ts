import {Body, Controller, Get, Post} from '@nestjs/common';
import {Client, ClientKafka, Transport} from "@nestjs/microservices";
import {CreateBookDto} from "./create-book.dto";

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
        this.client.subscribeToResponseOf('post.new.book');
        this.client.subscribeToResponseOf('get.list.book');

        await this.client.connect();
    }

    @Post('/')
    createBook(@Body() bookDto: CreateBookDto){
        console.log(bookDto);
        return this.client.send('post.new.book', bookDto);
    }

    @Get('/')
    getBooks(){
        return this.client.send('get.list.book', '');
    }
}
