import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class NewItemInput {
  @Field()
  @MinLength(1)
  title: string;
}
