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
        const newUser = this.userRepository.create(signUpInput)

        await this.userRepository.save(newUser);

        return newUser;

    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  async findAll():Promise<User[]> {
    return [];
  }

  async findOne(id: string):Promise<User>{
    return new User;
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

    throw new InternalServerErrorException('please check server logs')
  }
}
