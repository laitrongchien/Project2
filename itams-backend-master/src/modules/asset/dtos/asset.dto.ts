import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AssetDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  purchase_cost: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  purchase_date: Date;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  assetModelId: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  departmentId: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  statusId: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  supplierId: string;
}
