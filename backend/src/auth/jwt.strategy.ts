import {
    ExtractJwt,
    Strategy
} from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { Injectable } from "@nestjs/common";
import { Config } from "config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: Config.jwtSecret
        });
    }

    async validate(payload: { sub: number; email: string }) {
        const user = await this.authService.validateUser(payload.sub);
        if (!user) {
            return null;
        }
        return user;
    }
}