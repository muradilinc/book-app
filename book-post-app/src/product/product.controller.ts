import { Controller } from '@nestjs/common';
import {DatabaseService} from "../database/database.service";
import {MessagePattern, Payload} from "@nestjs/microservices";
import {CreateProductDto} from "./create-product.dto";

@Controller('product')
export class ProductController {
    constructor(private prisma: DatabaseService) {
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

    @MessagePattern('get.single.product')
    getSingleProduct(@Payload() id: string) {
        return this.prisma.product.findUnique({where:{id: Number(id)}})
    }

    @MessagePattern('delete.single.product')
    deleteProduct(@Payload() id: string) {
        return this.prisma.product.delete({where: {id: Number(id)}})
    }
}
