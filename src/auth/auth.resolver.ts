import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpInput } from './dto/inputs/signup.input';
import { AuthResponse } from './types/auth-response.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(()=>AuthResponse,{name:'singup'})
  async signup(@Args('signUpInput') signUpInput:SignUpInput):Promise<AuthResponse>{
    return this.authService.signUp(signUpInput);
  }

  // @Mutation(/**????*/,{name:'login'})
  // async login(/**siginput*/):Promise</**????*/>{
  //   return this.authService.login();
  // }
}
