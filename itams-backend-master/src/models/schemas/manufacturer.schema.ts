import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Manufacturer extends Document {
  @Prop({ default: null })
  name: string;

  @Prop({ default: null })
  image: string;
}

export const ManufacturerSchema = SchemaFactory.createForClass(Manufacturer);
