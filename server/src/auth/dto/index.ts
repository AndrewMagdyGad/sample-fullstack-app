import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/user.model';

@InputType()
export class LoginUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

@ObjectType()
export class LoginResult {
  @Field(() => User)
  user: User;

  @Field(() => String)
  token: string;
}
