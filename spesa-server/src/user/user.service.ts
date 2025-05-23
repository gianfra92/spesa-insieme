import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.shema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async getAll() {
    return this.userModel.find().exec();
  }

  async addUser(name: string) {
    const existing = await this.userModel.findOne({ name }).exec();
    if (existing) {
      // throw new Error('User with this name already exists');
      return existing;
    }
    const user = new this.userModel({ name });
    return user.save();
  }

  async deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
