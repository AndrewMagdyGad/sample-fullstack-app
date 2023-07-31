import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ItemService } from './item.service';
import { UseGuards } from '@nestjs/common';
import { NewItemInput } from './dto/new-item.input';
import { CurrentUser } from '../decorators/current-user.decorator';
import { User } from '../users/user.model';
import { Item } from './item.model';
import { ItemsArgs } from './dto/items.args';

@Resolver((of) => Item)
export class ItemResolver {
  constructor(private readonly itemService: ItemService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Item)
  createItem(
    @Args('createItem') createItemDto: NewItemInput,
    @CurrentUser() user: User,
  ): Promise<Item> {
    return this.itemService.create(createItemDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Item])
  getAllItems(@Args() itemsArgs: ItemsArgs): Promise<Item[]> {
    return this.itemService.findAll(itemsArgs);
  }
}
