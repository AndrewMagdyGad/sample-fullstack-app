import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Model,
  Table,
  PrimaryKey,
  Default,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../users/user.model';

@ObjectType({ description: 'item' })
@Table
export class Item extends Model {
  @Field((type) => ID)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Field((type) => String)
  @Column
  title!: string;

  @ForeignKey(() => User)
  @Column
  creatorId: string;

  @Field((type) => User)
  @BelongsTo(() => User)
  creator: User;

  @Field((type) => Date)
  @CreatedAt
  createdAt!: Date;

  @Field((type) => Date)
  @UpdatedAt
  updatedAt!: Date;
}
