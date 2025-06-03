import { PrismaService } from '../prisma.service';
import { Prisma, Product } from '@prisma/client';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.ProductCreateInput): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(id: number): Promise<Product | null>;
    update(id: number, data: Prisma.ProductUpdateInput): Promise<Product>;
    delete(id: number): Promise<Product>;
}
