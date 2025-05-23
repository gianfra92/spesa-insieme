import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ShoppingItemDocument = ShoppingItem & Document;

@Schema({ timestamps: true })
export class ShoppingItem {
  @Prop()
  _id?: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ default: 1 })
  quantity: number;

  @Prop({
    type: [{ userId: String, quantity: Number }],
    default: [],
  })
  selectedBy: { userId: string; quantity: number }[];
}

export const ShoppingItemSchema = SchemaFactory.createForClass(ShoppingItem);
