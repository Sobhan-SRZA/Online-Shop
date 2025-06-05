import { AuthController } from "./auth.controller";
import { PrismaService } from "../prisma.service";
import { JwtStrategy } from "./jwt.strategy";
import { AuthService } from "./auth.service";
import { RolesGuard } from "./roles.guard";
import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { Config } from "config";

@Module({
  imports: [
    JwtModule.register({
      secret: Config.jwtSecret,
      signOptions: { expiresIn: "1h" }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy, RolesGuard],
})
export class AuthModule { }