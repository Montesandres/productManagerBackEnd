import * as bcrypt from 'bcrypt'

import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from './entities/user.entity';
import { SignUpInput } from 'src/auth/dto/inputs/signup.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

  private logger = new Logger('UserService')

  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>){}

  async create(signUpInput: SignUpInput): Promise<User>{
    
    try {
        const newUser = this.userRepository.create({
          ...signUpInput,
          password: bcrypt.hashSync(signUpInput.password,10)
        })

        await this.userRepository.save(newUser);

        return newUser;

    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  async findOneByEmail(email: string):Promise<User>{
    try {
      return await this.userRepository.findOneByOrFail({email})
    } catch (error) {
      this.handleDBErrors({
        code:'error-001',
        detail:`${email} not found`
      })
    }
  }


  async findOne(id:string):Promise<User>{
    return new User;
  }

  async findAll():Promise<User[]> {
    return [];
  }

  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }

  async block(id: string):Promise<User> {
    return new User;
  }

  private handleDBErrors(error:any):never{

    this.logger.error(error);


    if(error.code === '23505'){
      throw new BadRequestException(error.detail.replace('key',''))
    }

    if(error.code === 'error-001'){
      throw new BadRequestException(error.detail.replace('key',''))
    }

    throw new InternalServerErrorException('please check server logs')
  }
}
