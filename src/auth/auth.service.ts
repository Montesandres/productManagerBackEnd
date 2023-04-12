import * as bcrypt from 'bcrypt'
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpInput } from './dto/inputs/signup.input';
import { AuthResponse } from './types/auth-response.type';
import { UsersService } from 'src/users/users.service';
import { LogInInput } from './dto/inputs/login.input';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService:UsersService,
        private readonly jwtService:JwtService
    ){}

    private getJwt(userID:string){
        return this.jwtService.sign({id:userID})
    }

    async signUp(signUpInput:SignUpInput):Promise<AuthResponse>{

        const user =  await this.userService.create(signUpInput)

        const token =  this.getJwt(user.id);

        return {token,user}
    }

    async logIn(loginInput:LogInInput):Promise<AuthResponse>{

        const {email,password} = loginInput;

        const user = await this.userService.findOneByEmail(email);

        if (!bcrypt.compareSync(password, user.password)){
            throw new BadRequestException('Email not found or incorrect password')
        }

        const token = this.getJwt(user.id);


        return{
            token,
            user
        }
    }

    revalidateToken(user:User):AuthResponse{
        const token = this.getJwt(user.id);
        return{
            token,
            user
        }
    }

    async validateUser(id:string):Promise<User>{
        const user = await this.userService.findOneByID(id);

        if (!user.isActive){
            throw new UnauthorizedException(`User is inactive`)
        }

        delete user.password;

        return user;
    }
}
