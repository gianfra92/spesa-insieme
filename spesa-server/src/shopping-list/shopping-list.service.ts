import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShoppingItem, ShoppingItemDocument } from './shopping-item.schema';

@Injectable()
export class ShoppingListService {
  constructor(
    @InjectModel(ShoppingItem.name)
    private shoppingItemModel: Model<ShoppingItemDocument>,
  ) {}

  async getAll() {
    return this.shoppingItemModel.find().exec();
  }

  async addItem(name: string, quantity: number) {
    const item = new this.shoppingItemModel({ name, quantity });
    return item.save();
  }

  async deleteItem(id: string) {
    return this.shoppingItemModel.findByIdAndDelete(id).exec();
  }

  async updateSelection(id: string, userId: string, quantity: number) {
    const item = await this.shoppingItemModel.findById(id).exec();
    if (!item) throw new NotFoundException('Item not found');

    const existing = item.selectedBy.find((s) => s.userId === userId);
    if (existing) {
      existing.quantity = quantity;
    } else {
      item.selectedBy.push({ userId, quantity });
    }

    return item.save();
  }
}
