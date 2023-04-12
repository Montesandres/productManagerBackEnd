import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import {ParseUUIDPipe} from '@nestjs/common'
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput, UpdateProductInput } from './dto/inputs/index';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  async createProduct(@Args('createProductInput') createProductInput: CreateProductInput):Promise<Product> {
    return this.productsService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'products' })
  async findAll():Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Query(() => Product, { name: 'product' })
  async findOne(@Args('id', { type: () => ID },ParseUUIDPipe) id: string):Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Mutation(() => Product)
  updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductInput):Promise<Product> {
    return this.productsService.update(updateProductInput.id, updateProductInput);
  }

  @Mutation(() => Product)
  removeProduct(@Args('id', { type: () => ID }) id: string):Promise<Product> {
    return this.productsService.remove(id);
  }
}
