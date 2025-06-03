import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
})

export class ProductsModule { }