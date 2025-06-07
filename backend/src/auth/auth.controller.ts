import {
    Controller,
    Post,
    Body,
    UseGuards
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("register")
    async register(
        @Body() body: { email: string; password: string; name?: string; role?: string; },
    ) {
        return this.authService.register(body);
    }

    @Post("login")
    async login(@Body() body: { email: string; password: string }) {
        return this.authService.login(body.email, body.password);
    }

    @Post("logout")
    @UseGuards(AuthGuard("jwt"))
    async logout() {
        return { message: "Successfully logged out" };
    }
}