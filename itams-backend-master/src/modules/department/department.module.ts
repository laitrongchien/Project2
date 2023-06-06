import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { DepartmentSchema } from '../../models/schemas/department.schema';
import { LocationModule } from '../location/location.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Department', schema: DepartmentSchema },
    ]),
    LocationModule,
  ],
  controllers: [DepartmentController],
  providers: [DepartmentService],
  exports: [DepartmentService],
})
export class DepartmentModule {}
