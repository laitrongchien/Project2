import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Supplier extends Document {
  @Prop({ default: null })
  name: string;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);
