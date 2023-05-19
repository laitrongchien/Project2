import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AssetModule } from './modules/asset/asset.module';
import { CategoryModule } from './modules/category/category.module';
import { AdminModule } from './modules/admin/admin.module';
import { ManufacturerModule } from './modules/manufacturer/manufacturer.module';
import { SupplierModule } from './modules/supplier/supplier.module';
import { StatusModule } from './modules/status/status.module';
import { LocationModule } from './modules/location/location.module';
import { DepartmentModule } from './modules/department/department.module';
import { LicenseModule } from './modules/license/license.module';
import { SourceCodeModule } from './modules/sourceCode/sourceCode.module';
import { DigitalContentModule } from './modules/digitalContent/digitalContent.module';
import { DeprecationModule } from './modules/deprecation/deprecation.module';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationModule } from './modules/notification/notification.module';
import { AssetMaintenanceModule } from './modules/assetMaintenance/assetMaintenance.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { MailModule } from './modules/mail/mail.module';
import { MongooseModule } from '@nestjs/mongoose';

export const Modules = [
  ConfigModule.forRoot({
    // envFilePath: '.env',
    isGlobal: true,
  }),
  // TypeOrmModule.forRoot({
  //   type: 'mongodb',
  //   url: 'mongodb+srv://chienlai01:4gylK09ug86kgUm6@cluster0.rtqhapw.mongodb.net/itams?retryWrites=true&w=majority',
  //   entities: [__dirname + '/models/entities/**/*{.ts,.js}'],
  //   synchronize: true,
  // }),
  MongooseModule.forRoot(
    'mongodb+srv://chienlai01:4gylK09ug86kgUm6@cluster0.rtqhapw.mongodb.net/itams?retryWrites=true&w=majority',
  ),
  ScheduleModule.forRoot(),
  AuthModule,
  UsersModule,
  AdminModule,
  AssetModule,
  AssetMaintenanceModule,
  CategoryModule,
  ManufacturerModule,
  SupplierModule,
  StatusModule,
  LocationModule,
  DepartmentModule,
  LicenseModule,
  SourceCodeModule,
  DigitalContentModule,
  DeprecationModule,
  NotificationModule,
  InventoryModule,
  MailModule,
];
