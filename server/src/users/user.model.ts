import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Model,
  Table,
  PrimaryKey,
  Default,
  DataType,
  Unique,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript';
import { Item } from '../items/item.model';

@ObjectType({ description: 'user' })
@Table
export class User extends Model {
  @Field((type) => ID)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Field((type) => String)
  @Unique
  @Column
  email!: string;

  @Field((type) => String)
  @Column
  password!: string;

  @Field((type) => String)
  @Column
  firstName!: string;

  @Field((type) => String)
  @Column
  lastName!: string;

  @Field((type) => Date)
  @CreatedAt
  createdAt!: Date;

  @Field((type) => Date)
  @UpdatedAt
  updatedAt!: Date;

  @Field(() => [Item])
  @HasMany(() => Item)
  items: Item[];
}
