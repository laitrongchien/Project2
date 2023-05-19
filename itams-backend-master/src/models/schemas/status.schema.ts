import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Status extends Document {
  @Prop({ default: null })
  name: string;

  @Prop({ default: '#666' })
  color: string;
}

export const StatusSchema = SchemaFactory.createForClass(Status);
