import { Injectable } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { Item } from './item.model';
import { ItemsArgs } from './dto/items.args';
import { InjectModel } from '@nestjs/sequelize';
import { NewItemInput } from './dto/new-item.input';
import { User } from '../users/user.model';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item)
    private itemModel: typeof Item,
  ) {}

  async create(createItemDto: NewItemInput, user: User): Promise<Item> {
    const item = await Item.create({ ...createItemDto, creatorId: user.id });
    return Item.findOne({ where: { id: item.id }, include: [User] });
  }

  // TODO: handle pagination
  async findAll(itemsArgs: ItemsArgs): Promise<Item[]> {
    return await this.itemModel.findAll({ include: [User] });
  }
}
