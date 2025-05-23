import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ShoppingItemDocument = ShoppingItem & Document;

@Schema({ _id: false })
export class SelectedByUser {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  quantity: number;
}

@Schema({ timestamps: true })
export class ShoppingItem {
  @Prop({ required: true })
  name: string;

  @Prop({ default: 1 })
  quantity: number;

  @Prop({
    type: [SelectedByUser],
    default: [],
  })
  selectedBy: SelectedByUser[] = [];
}

export const ShoppingItemSchema = SchemaFactory.createForClass(ShoppingItem);
