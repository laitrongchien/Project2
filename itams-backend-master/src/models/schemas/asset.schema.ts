import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Model, Query } from 'mongoose';
import { AssetModel } from './assetModel.schema';
import { Department } from './department.schema';
import { Supplier } from './supplier.schema';
import { Status } from './status.schema';
import { AssetToUser } from './assetToUser.schema';
import { LicenseToAsset } from './licenseToAsset.schema';
import { AssetToInventory } from './assetToInventory.schema';
import { AssetMaintenance } from './assetMaintenance.schema';

@Schema()
export class Asset extends Document {
  @Prop({ default: null })
  name: string;

  @Prop({ default: null })
  image: string;

  @Prop({ default: null })
  purchase_cost: number;

  @Prop({ default: null })
  current_cost: number;

  @Prop({ default: null })
  purchase_date: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'AssetModel' })
  assetModel: AssetModel;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Department' })
  department: Department;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Supplier' })
  supplier: Supplier;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Status' })
  status: Status;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'AssetToUser' }],
  })
  assetToUsers: AssetToUser[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'LicenseToAsset' }],
  })
  licenseToAssets: LicenseToAsset[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'AssetToInventory' }],
  })
  assetToInventories: AssetToInventory[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'AssetMaintenance' }],
  })
  assetMaintenances: AssetMaintenance[];

  @Prop({ default: null })
  deletedAt: Date;

  toJSON() {
    const { _id, ...obj } = this.toObject();
    obj.id = _id;
    return obj;
  }
}

export const AssetSchema = SchemaFactory.createForClass(Asset);

// eslint-disable-next-line @typescript-eslint/ban-types
AssetSchema.pre<Model<any>>(/^find/, function (next) {
  this.find({ deletedAt: null });
  next();
});

// AssetSchema.methods.softDelete = function () {
//   this.deletedAt = new Date(Date.now());
//   return this.save();
// };

// Model methods to include soft-deleted records in the query
// AssetSchema.methods.findInCludeSoftDeleted = function (): Promise<any> {
//   return this.find();
// };
