import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SupplierSchema } from '../../models/schemas/supplier.schema';
import { SupplierController } from './supplier.controller';
import { SupplierService } from './supplier.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Supplier', schema: SupplierSchema }]),
  ],
  controllers: [SupplierController],
  providers: [SupplierService],
  exports: [SupplierService],
})
export class SupplierModule {}
