import {ConflictException, Injectable} from "@nestjs/common";
import {DatabaseService} from "../database/database.service";
import {CreateUserDto} from "./create-user.dto";

@Injectable()
export class UsersService {
    constructor(private prisma: DatabaseService) {
    }

    async createUser(createDto: CreateUserDto) {
        const existing = await this.prisma.user.findUnique({
            where: {
                email: createDto.email
            }
        });

        if (existing) {
            throw new ConflictException('user already exists!');
        }

        return this.prisma.user.create({
            data: createDto,
        })
    }
}