import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(data: CreateProductDto): Promise<{
        name: string;
        id: number;
        description: string | null;
        price: number;
        stock: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        name: string;
        id: number;
        description: string | null;
        price: number;
        stock: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        name: string;
        id: number;
        description: string | null;
        price: number;
        stock: number;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    update(id: number, data: CreateProductDto): Promise<{
        name: string;
        id: number;
        description: string | null;
        price: number;
        stock: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: number): Promise<{
        name: string;
        id: number;
        description: string | null;
        price: number;
        stock: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
