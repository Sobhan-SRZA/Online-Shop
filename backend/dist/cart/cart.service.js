"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let CartService = class CartService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addToCart(userId, productId, quantity) {
        const product = await this.prisma.product.findUnique({ where: { id: productId } });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${productId} not found`);
        }
        if (product.stock < quantity) {
            throw new common_1.BadRequestException(`Not enough stock for product ${product.name}`);
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
    async getCart(userId) {
        return this.prisma.cartItem.findMany({
            where: { userId },
            include: { product: true },
        });
    }
    async updateCartItem(userId, cartItemId, quantity) {
        const cartItem = await this.prisma.cartItem.findUnique({ where: { id: cartItemId } });
        if (!cartItem) {
            throw new common_1.NotFoundException(`Cart item with ID ${cartItemId} not found`);
        }
        if (cartItem.userId !== userId) {
            throw new common_1.ForbiddenException('You can only update your own cart items');
        }
        const product = await this.prisma.product.findUnique({ where: { id: cartItem.productId } });
        if (product.stock < quantity) {
            throw new common_1.BadRequestException(`Not enough stock for product ${product.name}`);
        }
        return this.prisma.cartItem.update({
            where: { id: cartItemId },
            data: { quantity },
        });
    }
    async removeFromCart(userId, cartItemId) {
        const cartItem = await this.prisma.cartItem.findUnique({ where: { id: cartItemId } });
        if (!cartItem) {
            throw new common_1.NotFoundException(`Cart item with ID ${cartItemId} not found`);
        }
        if (cartItem.userId !== userId) {
            throw new common_1.ForbiddenException('You can only remove your own cart items');
        }
        return this.prisma.cartItem.delete({ where: { id: cartItemId } });
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartService);
//# sourceMappingURL=cart.service.js.map