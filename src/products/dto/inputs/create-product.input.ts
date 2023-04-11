import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateProductInput {

  @IsNotEmpty()
  @IsString()
  @Field(()=>String)
  name:string;

  @IsString()
  @Field(()=>String)
  type:string;
}
