import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop()
  _id?: Types.ObjectId;

  @Prop({ required: true, unique: true })
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
