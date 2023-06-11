import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Manufacturer } from '../../models/schemas/manufacturer.schema';
import { FirebaseService } from '../firebase/firebase.service';
import { ManufacturerDto } from './dtos/manufacturer.dto';
import { IMAGE_PATH } from './manufacturer.constants';

@Injectable()
export class ManufacturerService {
  private logger = new Logger(ManufacturerService.name);

  constructor(
    @InjectModel(Manufacturer.name)
    private readonly manufacturerModel: Model<Manufacturer>,
    private firebaseService: FirebaseService,
  ) {}

  async getAllManufacturers(): Promise<any> {
    // const manufacturers = await this.manufacturerModel.find({
    //   relations: { assetModels: true, licenses: true },
    // });
    const manufacturers = await this.manufacturerModel
      .find()
      .populate('assetModels')
      .populate('licenses');
    const res = manufacturers.map((manufacturer) => {
      const { assetModels, licenses, ...rest } = manufacturer.toObject();
      return {
        ...rest,
        assetModels: assetModels.length,
        licenses: licenses.length,
      };
    });
    return res;
  }

  async getManufacturerById(id: string) {
    const manufacturer = await this.manufacturerModel.findById(id);
    return manufacturer.toObject();
  }

  async createNewManufacturer(manufacturerDto: ManufacturerDto) {
    if (await this.manufacturerModel.findOne({ name: manufacturerDto.name }))
      throw new HttpException(
        'This value already exists',
        HttpStatus.BAD_REQUEST,
      );
    const manufacturer = new this.manufacturerModel();
    manufacturer.name = manufacturerDto.name;
    await manufacturer.save();
    return manufacturer;
  }

  async saveImage(id: string, file: Express.Multer.File) {
    // upload ảnh lên storage
    const image = await this.firebaseService.uploadFile(file, IMAGE_PATH);
    // cập nhật db
    return await this.manufacturerModel.findByIdAndUpdate(id, { image });
  }

  async updateManufacturer(id: string, manufacturerDto: ManufacturerDto) {
    if (
      (await this.manufacturerModel.findById(id))?.name !==
        manufacturerDto.name &&
      (await this.manufacturerModel.findOne({ name: manufacturerDto.name }))
    )
      throw new HttpException(
        'This value already exists',
        HttpStatus.BAD_REQUEST,
      );
    const updated = await this.manufacturerModel.findByIdAndUpdate(
      id,
      manufacturerDto,
    );
    return updated;
  }

  async deleteManufacturer(id: string) {
    try {
      return await this.manufacturerModel.findByIdAndDelete(id);
    } catch (err) {
      throw new HttpException(
        'This value is still in use',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
