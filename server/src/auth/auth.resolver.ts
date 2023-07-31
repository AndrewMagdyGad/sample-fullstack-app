import { Resolver, Args, Query } from '@nestjs/graphql';
import { LoginResult, LoginUserInput } from './dto';
import { AuthService } from './auth.service';
import { BadRequestException } from '@nestjs/common';
import { User } from '../users/user.model';

type Login = {
  user: User;
  token: String;
};

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => LoginResult)
  async login(@Args('user') user: LoginUserInput): Promise<Login> {
    const result = await this.authService.validateUserByPassword(user);

    if (result) return result;
    throw new BadRequestException(
      'Could not log-in with the provided credentials',
    );
  }
}
