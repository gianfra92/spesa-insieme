import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ShoppingItem, ShoppingItemDocument } from './shopping-item.schema';

@Injectable()
export class ShoppingListService {
  constructor(
    @InjectModel(ShoppingItem.name)
    private shoppingItemModel: Model<ShoppingItemDocument>,
  ) {}

  async getAll() {
    return this.shoppingItemModel
      .find()
      .populate('selectedBy.user', 'name')
      .exec();
  }

  async addItem(name: string, quantity: number) {
    const item = new this.shoppingItemModel({ name, quantity });
    return item.save();
  }

  async deleteItem(id: string) {
    return this.shoppingItemModel.findByIdAndDelete(id).exec();
  }

  async updateSelection(itemId: string, userId: string, quantity: number) {
    const item = await this.shoppingItemModel
      .findById(itemId)
      .populate('selectedBy.user', 'name')
      .exec();
    if (!item) throw new NotFoundException('Item not found');

    const userObjectId = new Types.ObjectId(userId);

    const existing = item.selectedBy.find((s) => s.user.equals(userObjectId));

    if (existing) {
      existing.quantity = quantity;
    } else {
      item.selectedBy.push({ user: userObjectId, quantity });
    }

    return item.save();
  }
}
