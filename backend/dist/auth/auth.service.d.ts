import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(data: {
        email: string;
        password: string;
        name?: string;
        role?: string;
    }): Promise<User>;
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
    validateUser(userId: number): Promise<User | null>;
}
