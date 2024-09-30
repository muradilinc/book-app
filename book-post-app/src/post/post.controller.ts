import {Controller} from '@nestjs/common';
// import {DatabaseService} from "../database/database.service";
import {CreateBookDto} from "./create-book.dto";
import {MessagePattern, Payload} from "@nestjs/microservices";
import {CreateProductDto} from "../product/create-product.dto";
import {DatabaseService} from "../database/database.service";

@Controller('post')
export class PostController {
    books: CreateBookDto[]

    constructor(private prisma: DatabaseService) {
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

    @MessagePattern('post.new.product')
    async createProduct(@Payload() productDto: CreateProductDto) {
        const product = await this.prisma.product.create({
            data: productDto,
        });
        return product;
    }

    @MessagePattern('get.list.product')
    getProducts(){
        return this.prisma.product.findMany();
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
