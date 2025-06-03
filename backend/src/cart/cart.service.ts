import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Prisma, CartItem } from "@prisma/client";

@Injectable()
export class CartService {
    constructor(private prisma: PrismaService) { }

    async addToCart(userId: number, productId: number, quantity: number): Promise<CartItem> {
        const product = await this.prisma.product.findUnique({ where: { id: productId } });
        if (!product) {
            throw new NotFoundException(`Product with ID ${productId} not found`);
        }
        if (product.stock < quantity) {
            throw new BadRequestException(`Not enough stock for product ${product.name}`);
        }

        const existingItem = await this.prisma.cartItem.findFirst({
            where: { userId, productId },
        });

        if (existingItem) {
            return this.prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity },
            });
        }

        return this.prisma.cartItem.create({
            data: {
                userId,
                productId,
                quantity,
            },
        });
    }

    async getCart(userId: number): Promise<CartItem[]> {
        return this.prisma.cartItem.findMany({
            where: { userId },
            include: { product: true }
        });
    }

    async updateCartItem(userId: number, cartItemId: number, quantity: number): Promise<CartItem> {
        const cartItem = await this.prisma.cartItem.findUnique({ where: { id: cartItemId } });
        if (!cartItem) {
            throw new NotFoundException(`Cart item with ID ${cartItemId} not found`);
        }
        if (cartItem.userId !== userId) {
            throw new ForbiddenException("You can only update your own cart items");
        }
        const product = (await this.prisma.product.findUnique({ where: { id: cartItem.productId } }))!;
        if (product.stock < quantity) {
            throw new BadRequestException(`Not enough stock for product ${product.name}`);
        }
        return this.prisma.cartItem.update({
            where: { id: cartItemId },
            data: { quantity },
        });
    }

    async removeFromCart(userId: number, cartItemId: number): Promise<CartItem> {
        const cartItem = await this.prisma.cartItem.findUnique({ where: { id: cartItemId } });
        if (!cartItem) {
            throw new NotFoundException(`Cart item with ID ${cartItemId} not found`);
        }
        if (cartItem.userId !== userId) {
            throw new ForbiddenException("You can only remove your own cart items");
        }
        return this.prisma.cartItem.delete({ where: { id: cartItemId } });
    }
}