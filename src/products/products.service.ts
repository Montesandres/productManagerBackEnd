import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductInput } from './dto/inputs/create-product.input';
import { UpdateProductInput } from './dto/inputs/update-product.input';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {


  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>
  ){}

  async create(createProductInput: CreateProductInput):Promise<Product> {
    const newItem = this.productsRepository.create(createProductInput)
    //Se hace en dos pasos para hacer cambios antes de guadar, como por ej encriptar la contraseña
    await this.productsRepository.save(newItem);
    return newItem;
  }

  async  findAll():Promise<Product[]> {
    return this.productsRepository.find();
  }

  async findOne(id: string):Promise<Product> {
    const product = await this.productsRepository.findOneBy({id})

    if (!product) throw new NotFoundException(`Product with ID ${id} not found`)

    return product
  }

  async update(id: string, updateProductInput: UpdateProductInput):Promise<Product> {
      const product = await this.productsRepository.preload(updateProductInput)

      if (!product) throw new NotFoundException(`Product with ID ${id} not found`)

      return this.productsRepository.save(product)
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
