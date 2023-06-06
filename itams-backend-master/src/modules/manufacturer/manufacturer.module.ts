import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ManufacturerSchema } from '../../models/schemas/manufacturer.schema';
import { ManufacturerController } from './manufacturer.controller';
import { ManufacturerService } from './manufacturer.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Manufacturer', schema: ManufacturerSchema },
    ]),
  ],
  controllers: [ManufacturerController],
  providers: [ManufacturerService],
  exports: [ManufacturerService],
})
export class ManufacturerModule {}
