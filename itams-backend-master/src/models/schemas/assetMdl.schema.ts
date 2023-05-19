import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Category } from './category.schema';
import { Manufacturer } from './manufacturer.schema';

@Schema()
export class AssetMdl extends Document {
  @Prop({ default: null })
  name: string;

  @Prop({ default: null })
  image: string;

  @Prop({ default: null })
  cpe: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Manufacturer' })
  manufacturer: Manufacturer;
}

export const AssetMdlSchema = SchemaFactory.createForClass(AssetMdl);
