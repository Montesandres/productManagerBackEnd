import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpInput, LogInInput } from './dto/inputs/index.input';
import { AuthResponse } from './types/auth-response.type';

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
}
