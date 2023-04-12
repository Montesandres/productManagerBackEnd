import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpInput, LogInInput } from './dto/inputs/index.input';
import { AuthResponse } from './types/auth-response.type';
import {JwtAuthGuard} from './Guards/jwt-auth.guard'
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(()=>AuthResponse,{name:'singup'})
  async signup(@Args('signUpInput') signUpInput:SignUpInput):Promise<AuthResponse>{
    return this.authService.signUp(signUpInput);
  }

  @Mutation(()=>AuthResponse,{name:'login'})
  async login(@Args('logInInput')loginInput:LogInInput):Promise<AuthResponse>{
    return this.authService.logIn(loginInput);
  }

  @Query(()=>AuthResponse,{name:'revalidate'})
   @UseGuards(JwtAuthGuard)
   revalidateToken(
    @CurrentUser() user:User
   ):AuthResponse{
  
    return this.authService.revalidateToken(user);
  }
}
