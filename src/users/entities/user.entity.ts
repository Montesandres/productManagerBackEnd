import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'users'})
@ObjectType()
export class User {
  
  @PrimaryGeneratedColumn('uuid')
  @Field(()=>ID)
  id:string;

  @Column()
  @Field(()=>ID)
  fullName:string;

  @Column({unique:true})
  @Field(()=>ID)
  email:string;

  @Column()
  // @Field(()=>String)
  password:string;

  @Column({
    type:'text',
    array:true,
    default:['user']
  })
  @Field(()=>[String])
  roles:string[];

  @Column({
    type:'boolean',
    default:true
  })
  @Field(()=>Boolean)
  isActive:boolean;

}
