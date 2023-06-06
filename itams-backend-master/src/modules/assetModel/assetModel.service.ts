import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AssetModel } from '../../models/schemas/assetModel.schema';
import { CategoryService } from '../category/category.service';
import { FirebaseService } from '../firebase/firebase.service';
import { ManufacturerService } from '../manufacturer/manufacturer.service';
import { IMAGE_PATH } from './assetModel.constants';
import { AssetModelDto } from './dtos/assetModel.dto';
import { AssetModelQueryDto } from './dtos/assetModelQuery.dto';

@Injectable()
export class AssetModelService {
  private logger = new Logger(AssetModelService.name);

  constructor(
    @InjectModel(AssetModel.name)
    private readonly assetModelModel: Model<AssetModel>,
    private categoryService: CategoryService,
    private manufacturerService: ManufacturerService,
    private firebaseService: FirebaseService,
  ) {}

  async getAllAssetModels(assetModelQuery?: AssetModelQueryDto): Promise<any> {
    const assetModels = await this.assetModelModel
      .find({
        // 'category._id': assetModelQuery.categoryId,
        // 'manufacturer._id': assetModelQuery.manufacturerId,
        category: { _id: assetModelQuery.categoryId },
        manufacturer: { _id: assetModelQuery.manufacturerId },
      })
      .populate('assets')
      .populate('category')
      .populate('manufacturer');
    const res = assetModels.map((assetModel) => {
      const { assets, category, manufacturer, ...rest } = assetModel.toObject();
      return {
        ...rest,
        numOfAssets: assets.length,
        category: category?.name,
        manufacturer: manufacturer?.name,
      };
    });
    return res;
  }

  async getAssetModelByAssetModelId(id: string): Promise<any> {
    const assetModel = await this.assetModelModel
      .findById(id)
      .populate('category')
      .populate('manufacturer');
    const { category, manufacturer, ...rest } = assetModel.toObject();
    return {
      ...rest,
      category: category?.name,
      manufacturer: manufacturer?.name,
    };
  }

  async getAssetModelById(id: string) {
    const assetModel = await this.assetModelModel.findById(id);
    return assetModel;
  }

  async createNewAssetModel(assetModelDto: AssetModelDto) {
    if (await this.assetModelModel.findOne({ name: assetModelDto.name }))
      throw new HttpException(
        'This value already exists',
        HttpStatus.BAD_REQUEST,
      );
    const category = await this.categoryService.getCategoryById(
      assetModelDto.categoryId,
    );
    const manufacturer = await this.manufacturerService.getManufacturerById(
      assetModelDto.manufacturerId,
    );

    const assetModel = new this.assetModelModel();
    assetModel.name = assetModelDto.name;
    assetModel.category = category;
    assetModel.manufacturer = manufacturer;
    assetModel.cpe = this.createCPE(manufacturer.name, assetModelDto.name);
    return await assetModel.save();
  }

  async saveImage(id: string, file: Express.Multer.File) {
    // upload ảnh lên storage
    const image = await this.firebaseService.uploadFile(file, IMAGE_PATH);
    // cập nhật db
    return await this.assetModelModel.findByIdAndUpdate(id, { image: image });
  }

  async updateAssetModel(id: string, assetModelDto: AssetModelDto) {
    if (
      (await this.assetModelModel.findById(id))?.name !== assetModelDto.name &&
      (await this.assetModelModel.findOne({ name: assetModelDto.name }))
    )
      throw new HttpException(
        'This value already exists',
        HttpStatus.BAD_REQUEST,
      );
    const toUpdate = await this.assetModelModel.findById(id);
    if (!toUpdate) {
      throw new Error('Asset model document not found');
    }
    const { categoryId, manufacturerId, ...rest } = assetModelDto;
    const category = await this.categoryService.getCategoryById(
      assetModelDto.categoryId,
    );
    const manufacturer = await this.manufacturerService.getManufacturerById(
      assetModelDto.manufacturerId,
    );
    const updated = Object.assign(toUpdate, rest);
    // updated.name = assetModelDto.name;
    updated.category = category;
    updated.manufacturer = manufacturer;
    updated.cpe = this.createCPE(manufacturer.name, assetModelDto.name);
    return await updated.save();
  }

  async deleteAssetModel(id: string) {
    try {
      return await this.assetModelModel.findByIdAndDelete(id);
    } catch (err) {
      throw new HttpException(
        'This value is still in use',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  createCPE(vendor: string, product: string) {
    vendor = vendor.toLowerCase().replace(new RegExp(' ', 'g'), '_');
    product = product.toLowerCase().replace(new RegExp(' ', 'g'), '_');
    return `cpe:/h:${vendor}:${product}`;
  }

  /*------------------------ cron ------------------------- */
  async getAllAssetModelsByCategory(categoryId: string) {
    const assetModels: AssetModel[] = await this.assetModelModel
      .find({
        // 'category._id': categoryId,
        category: { _id: categoryId },
      })
      .populate('assets')
      .populate('category')
      .populate('manufacturer');
    return assetModels;
  }
}
