import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ShoppingItemDocument = ShoppingItem & Document;

@Schema({ timestamps: true })
export class ShoppingItem {
  @Prop({ required: true })
  name: string;

  @Prop({ default: 1 })
  quantity: number;

  @Prop({
    type: [{ user: String, quantity: Number }],
    default: [],
  })
  selectedBy: { user: string; quantity: number }[];
}

export const ShoppingItemSchema = SchemaFactory.createForClass(ShoppingItem);
