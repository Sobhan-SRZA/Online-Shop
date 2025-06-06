import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async register(data: { email: string; password: string; name?: string; role?: string }): Promise<{ data: User; access_token: string }> {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                name: data.name,
                role: data.role || 'BUYER',
            },
        });
        const payload = { sub: user.id, email: user.email, role: user.role };
        return {
            data: user,
            access_token: this.jwtService.sign(payload),
        };
    }

    async login(email: string, password: string): Promise<{ access_token: string }> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException("Invalid credentials");
        }
        const payload = { sub: user.id, email: user.email, role: user.role };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }

    async validateUser(userId: number): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { id: userId } });
    }
}