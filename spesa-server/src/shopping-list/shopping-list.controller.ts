import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ShoppingListService } from './shopping-list.service';
import { CreateItemDto } from './dto/create-item.dto';
import { SelectItemDto } from './dto/select-item.dto';
import { ShoppingItem } from './shopping-item.schema';

@Controller('items')
export class ShoppingListController {
  constructor(private readonly service: ShoppingListService) {}

  @Get()
  getAll(): Promise<ShoppingItem[]> {
    return this.service.getAll();
  }

  @Post()
  addItem(@Body() dto: CreateItemDto): Promise<ShoppingItem> {
    return this.service.addItem(dto.name, dto.quantity);
  }

  @Put(':id/select')
  updateSelection(@Param('id') id: string, @Body() dto: SelectItemDto) {
    return this.service.updateSelection(id, dto.userId, dto.quantity);
  }

  @Delete(':id')
  deleteItem(@Param('id') id: string) {
    return this.service.deleteItem(id);
  }
}
