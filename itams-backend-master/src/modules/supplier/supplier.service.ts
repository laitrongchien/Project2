import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Supplier } from '../../models/schemas/supplier.schema';
import { SupplierDto } from './dtos/supplier.dto';

@Injectable()
export class SupplierService {
  private logger = new Logger(SupplierService.name);

  constructor(
    @InjectModel(Supplier.name)
    private readonly supplierModel: Model<Supplier>,
  ) {}

  async getAllSuppliers(): Promise<any> {
    // const suppliers = await this.supplierRepo.find({
    //   relations: { assets: true, licenses: true },
    // });
    const suppliers = await this.supplierModel
      .find()
      .populate('assets')
      .populate('licenses');
    const res = suppliers.map((supplier) => {
      const { assets, licenses, ...rest } = supplier.toObject();
      return {
        ...rest,
        assets: assets?.length ?? 0,
        licenses: licenses?.length ?? 0,
      };
    });
    return res;
  }

  async getSupplierById(id: string): Promise<Supplier> {
    const supplier = await this.supplierModel.findById(id);
    return supplier;
  }

  async createNewSupplier(supplierDto: SupplierDto): Promise<Supplier> {
    if (await this.supplierModel.findOne({ name: supplierDto.name }))
      throw new HttpException(
        'This value already exists',
        HttpStatus.BAD_REQUEST,
      );
    return await this.supplierModel.create(supplierDto);
  }

  async updateSupplier(
    id: string,
    supplierDto: SupplierDto,
  ): Promise<Supplier> {
    if (
      (await this.supplierModel.findById(id))?.name !== supplierDto.name &&
      (await this.supplierModel.findOne({ name: supplierDto.name }))
    )
      throw new HttpException(
        'This value already exists',
        HttpStatus.BAD_REQUEST,
      );
    const toUpdate = await this.supplierModel.findById(id);
    toUpdate.name = supplierDto.name;
    return await toUpdate.save();
  }

  async deleteSupplier(id: string): Promise<Supplier> {
    try {
      return await this.supplierModel.findByIdAndDelete(id);
    } catch (err) {
      throw new HttpException(
        'This value is still in use',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
