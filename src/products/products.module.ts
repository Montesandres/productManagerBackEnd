import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { Product } from './entities/product.entity';

@Module({
  providers: [ProductsResolver, ProductsService],
  imports:[
    TypeOrmModule.forFeature([Product])
  ]
})
export class ProductsModule {}
