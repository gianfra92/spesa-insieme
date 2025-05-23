import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShoppingItem, ShoppingItemSchema } from './shopping-item.schema';
import { ShoppingListService } from './shopping-list.service';
import { ShoppingListController } from './shopping-list.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShoppingItem.name, schema: ShoppingItemSchema },
    ]),
  ],
  providers: [ShoppingListService],
  controllers: [ShoppingListController],
})
export class ShoppingListModule {}
