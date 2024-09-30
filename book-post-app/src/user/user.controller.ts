import {DatabaseService} from "../database/database.service";
import {Controller, Get} from "@nestjs/common";

@Controller('user')
export class UserController {
    constructor(private prisma: DatabaseService) {
    }

    @Get()
    async getUsers() {
        return await this.prisma
    }
}