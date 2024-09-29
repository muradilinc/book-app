import {Controller} from '@nestjs/common';
// import {DatabaseService} from "../database/database.service";
import {CreateBookDto} from "./create-book.dto";
import {MessagePattern, Payload} from "@nestjs/microservices";

@Controller('post')
export class PostController {
    books: CreateBookDto[]

    constructor() {
        this.books = [];
    }

    @MessagePattern('post.new.book')
    async createBook(@Payload() bookDto: CreateBookDto) {
        this.books.push(bookDto);
        return {message: 'Post created', data: bookDto}
        // return this.prisma.book.create({
        //     data: bookDto
        // });
    }

    @MessagePattern('get.list.book')
    async getAll() {
        return this.books;
    }

    // @Get(':id')
    // async getSingleBook(@Param('id') id: string) {
    //     return this.prisma.book.findUnique({where: {id: Number(id)}});
    // }
    //
    // @Put(':id')
    // async updateBook(@Param('id') id: string, @Body() updateDto: CreateBookDto) {
    //     return this.prisma.book.update({
    //         where: {id: Number(id)},
    //         data: {
    //             name: updateDto.name,
    //             author: updateDto.author,
    //             created_date: updateDto.created_date
    //         }
    //     });
    // }
    //
    // @Delete(':id')
    // async removeBook(@Param('id') id: string) {
    //     return this.prisma.book.delete({where: {id: Number(id)}});
    // }
}
