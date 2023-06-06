import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatusSchema } from '../../models/schemas/status.schema';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Status', schema: StatusSchema }]),
  ],
  controllers: [StatusController],
  providers: [StatusService],
  exports: [StatusService],
})
export class StatusModule {}
