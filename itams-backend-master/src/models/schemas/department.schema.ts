import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Location } from './location.schema';

@Schema()
export class Department extends Document {
  @Prop({ default: null })
  name: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Location' })
  location: Location;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
