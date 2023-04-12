import { Injectable } from '@nestjs/common';
import { SignUpInput } from './dto/inputs/signup.input';
import { AuthResponse } from './types/auth-response.type';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService:UsersService
    ){}

    async signUp(signUpInput:SignUpInput):Promise<AuthResponse>{

        const user =  await this.userService.create(signUpInput)

        const token = 'ABC1234'

        return {token,user}
    }
}
