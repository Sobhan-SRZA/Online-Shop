import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards, SetMetadata, UsePipes, ValidationPipe } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { RolesGuard } from "../auth/roles.guard";
import { AuthGuard } from "@nestjs/passport";

@Controller("products")
@UsePipes(new ValidationPipe())
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @SetMetadata("roles", ["SELLER"])
    create(@Body() data: CreateProductDto) {
        return this.productsService.create(data);
    }

    @Get()
    findAll() {
        return this.productsService.findAll();
    }

    @Get(":id")
    findOne(@Param("id", ParseIntPipe) id: number) {
        return this.productsService.findOne(id);
    }

    @Put(":id")
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @SetMetadata("roles", ["SELLER"])
    update(@Param("id", ParseIntPipe) id: number, @Body() data: CreateProductDto) {
        return this.productsService.update(id, data);
    }

    @Delete(":id")
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @SetMetadata("roles", ["SELLER"])
    delete(@Param("id", ParseIntPipe) id: number) {
        return this.productsService.delete(id);
    }
}