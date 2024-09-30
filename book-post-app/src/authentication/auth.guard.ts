import {AuthGuard} from "@nestjs/passport";
import {ExecutionContext, UnauthorizedException} from "@nestjs/common";

export class JWTAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context)
    }

    handleRequest(err, user, info) {
        if(err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}