import { NotFoundException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewUserInput } from './dto/new-user.input';
import { UsersArgs } from './dto/users.args';
import { User } from './user.model';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Query((returns) => User)
  async user(@Args('id') id: string): Promise<User> {
    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Query((returns) => [User])
  users(@Args() usersArgs: UsersArgs): Promise<User[]> {
    return this.userService.findAll(usersArgs);
  }

  @Mutation((returns) => User)
  async addUser(@Args('newUserData') newUserData: NewUserInput): Promise<User> {
    const user = await this.userService.create(newUserData);
    return user;
  }
}
