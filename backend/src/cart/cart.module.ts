import { CartController } from './cart.controller';
import { PrismaService } from '../prisma.service';
import { CartService } from './cart.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [CartController],
  providers: [CartService, PrismaService],
})

export class CartModule { }