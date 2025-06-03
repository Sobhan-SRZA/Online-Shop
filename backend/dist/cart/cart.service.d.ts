import { PrismaService } from '../prisma.service';
import { CartItem } from '@prisma/client';
export declare class CartService {
    private prisma;
    constructor(prisma: PrismaService);
    addToCart(userId: number, productId: number, quantity: number): Promise<CartItem>;
    getCart(userId: number): Promise<CartItem[]>;
    updateCartItem(userId: number, cartItemId: number, quantity: number): Promise<CartItem>;
    removeFromCart(userId: number, cartItemId: number): Promise<CartItem>;
}
