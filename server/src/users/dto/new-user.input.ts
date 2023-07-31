import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength, IsEmail } from 'class-validator';

@InputType()
export class NewUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MaxLength(30)
  firstName: string;

  @Field()
  @MaxLength(30)
  lastName: string;

  @Field()
  @MinLength(5)
  password: string;
}
