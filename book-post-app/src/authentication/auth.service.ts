import {Injectable, NotFoundException} from "@nestjs/common";
import {DatabaseService} from "../database/database.service";
import {JwtService} from "@nestjs/jwt";
import {AuthDto} from "./auth.dto";
import * as bcrypt from 'bcrypt';
import {UsersService} from "../user/user.service";

@Injectable()
export class AuthService {
    constructor
    (
        private prisma: DatabaseService,
        private jwtService: JwtService,
        private userService: UsersService,
    ) {
    }

    async login(loginDto: AuthDto) {
        const {email, password} = loginDto;
        const user = await this.prisma.user.findUnique({
            where: {email}
        });

        if (!user) {
            throw new NotFoundException('user not found!');
        }

        const validatePassword = await bcrypt.compare(password, user.password);

        if (!validatePassword) {
            throw new NotFoundException('user or password not correct!');
        }

        return {
            token: this.jwtService.sign({email})
        }
    }

    async register(registerDto: AuthDto) {
        const {email, password} = registerDto;
        const passwordHash = await bcrypt.hash(password, 10);

        const user = await this.userService.createUser({email, password: passwordHash});

        return {
            token: this.jwtService.sign({email: user.email})
        }
    }
}