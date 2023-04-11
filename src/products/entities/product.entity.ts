import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({name:'products'})
@ObjectType()
export class Product {

  @PrimaryGeneratedColumn('uuid')
  @Field(()=>ID)
  id:string;

  @Column()
  @Field(()=>String)
  name:string;

  @Column()
  @Field(()=>String)
  type:string
}
