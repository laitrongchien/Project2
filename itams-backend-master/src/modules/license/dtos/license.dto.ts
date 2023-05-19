import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LicenseDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  purchase_cost: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  purchase_date: Date;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  expiration_date: Date;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  seats: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  manufacturerId: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  supplierId: number;
}
