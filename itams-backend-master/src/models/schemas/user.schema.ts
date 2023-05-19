import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Exclude } from 'class-transformer';
import { DEFAULT_AVATAR } from 'src/modules/admin/admin.constants';
import { Department } from './department.schema';

@Schema()
export class User extends Document {
  @Prop({ default: null })
  name: string;

  @Prop({ unique: true })
  username: string;

  @Prop({})
  @Exclude()
  password: string;

  @Prop({ default: null })
  phone: string;

  @Prop({ default: null })
  email: string;

  @Prop({ default: null })
  birthday: Date;

  @Prop({ default: DEFAULT_AVATAR })
  avatar: string;

  @Prop({ default: null })
  deletedAt: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Department' })
  department: Department;
}

export const UserSchema = SchemaFactory.createForClass(User);
