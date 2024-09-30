import {Module} from "@nestjs/common";
import {AuthenticationController} from "./authentication.controller";
import {AuthService} from "./auth.service";
import {JwtStrategy} from "./jwt.strategy";
import {UsersService} from "../user/user.service";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {DatabaseService} from "../database/database.service";

@Module({
    controllers: [AuthenticationController],
    providers: [AuthService, DatabaseService, JwtStrategy, UsersService],
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        })
    ]
})
export class AuthModule {}