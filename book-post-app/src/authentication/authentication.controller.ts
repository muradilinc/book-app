import {AuthService} from "./auth.service";
import {Body, Controller, Post, Req, Res} from "@nestjs/common";
import {Request, Response} from "express";
import {AuthDto} from "./auth.dto";
import {MessagePattern, Payload} from "@nestjs/microservices";

@Controller('auth')
export class AuthenticationController {
    constructor(private readonly authService: AuthService) {
    }

    @MessagePattern('login.user')
    async login(@Req() request: Request, @Res() response: Response, @Body() loginDto: AuthDto) {
        try {
            const result = await this.authService.login(loginDto);
            return {
                status: 'Ok!',
                message: 'Login success',
                result,
            }
        } catch (error) {
            return{
                status: 'Error!',
                message: 'Login error',
            }
        }
    }

    @MessagePattern('register.user')
    async register(@Req() request: Request, @Res() response: Response, @Body() registerDto: AuthDto) {
        try {
            const result = await this.authService.register(registerDto);
            return {
                result,
            }
        } catch (error) {
            return {
                status: 'Error!',
                message: 'Register error',
            }
        }
    }
}