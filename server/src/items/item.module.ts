import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Item } from './item.model';
import { ItemResolver } from './item.resolver';
import { ItemService } from './item.service';

@Module({
  imports: [SequelizeModule.forFeature([Item])],
  providers: [ItemResolver, ItemService],
})
export class ItemModule {}
