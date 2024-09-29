import {OrderStatus} from "@prisma/client";

export class CreateOrderDto {
    user: number;
    product: number;
    count: number;
    status: OrderStatus
}