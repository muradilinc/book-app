import {Controller} from '@nestjs/common';
import {DatabaseService} from "../database/database.service";
import {MessagePattern, Payload} from "@nestjs/microservices";
import {CreateOrderDto} from "./create-order.dto";
import {OrderStatus} from "@prisma/client";

@Controller('order')
export class OrderController {
    constructor(private prisma: DatabaseService) {
    }

    @MessagePattern('post.new.order')
    createOrder(@Payload() orderDto: CreateOrderDto) {
        const orderData = {
            userId: orderDto.user,
            productId: orderDto.product,
            count: orderDto.count,
            status: OrderStatus.PENDING
        }
        return this.prisma.order.create({
            data: orderData,
        })
    }

    @MessagePattern('get.list.order')
    getOrders() {
        return this.prisma.order.findMany();
    }

    @MessagePattern('get.single.order')
    getSingleOrder(@Payload() id: string) {
        return this.prisma.order.findUnique({where: {id: Number(id)}});
    }

    @MessagePattern('delete.single.order')
    deleteOrder(@Payload() id: string) {
        return this.prisma.order.delete({where: {id: Number(id)}});
    }
}
