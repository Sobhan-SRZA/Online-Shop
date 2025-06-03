import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [ConfigModule.forRoot(), ProductsModule, AuthModule, CartModule],
  providers: [PrismaService],
})
export class AppModule { }