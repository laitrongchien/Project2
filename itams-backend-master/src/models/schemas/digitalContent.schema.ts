import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsBoolean } from 'class-validator';
import { Document } from 'mongoose';

@Schema()
export class DigitalContent extends Document {
  @Prop({ default: null })
  name: string;

  @Prop({ default: null })
  owner: string;

  @Prop({ default: null })
  description: string;

  @Prop({ default: false })
  @IsBoolean()
  isPrivate: boolean;

  @Prop({ default: null })
  url: string;

  @Prop({ default: null })
  deletedAt: Date;
}

export const DigitalContentSchema =
  SchemaFactory.createForClass(DigitalContent);
