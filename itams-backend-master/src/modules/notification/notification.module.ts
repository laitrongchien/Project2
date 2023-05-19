import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from 'src/models/entities/notification.entity';
import { NotificationRepository } from 'src/models/repositories/notification.repository';
import { AssetModule } from '../asset/asset.module';
import { LicenseModule } from '../license/license.module';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    forwardRef(() => AssetModule),
    forwardRef(() => LicenseModule),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationRepository],
  exports: [NotificationService],
})
export class NotificationModule {}
