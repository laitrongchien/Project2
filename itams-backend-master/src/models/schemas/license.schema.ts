import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Category } from './category.schema';
import { Manufacturer } from './manufacturer.schema';
import { Supplier } from './supplier.schema';

@Schema()
export class License extends Document {
  @Prop({ default: null })
  name: string;

  @Prop({ default: null })
  key: string;

  @Prop({ default: null })
  purchase_cost: number;

  @Prop({ default: null })
  purchase_date: Date;

  @Prop({ default: null })
  expiration_date: Date;

  @Prop({ default: null })
  deletedAt: Date;

  @Prop()
  seats: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Manufacturer' })
  manufacturer: Manufacturer;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Supplier' })
  supplier: Supplier;
}

export const LicenseSchema = SchemaFactory.createForClass(License);
