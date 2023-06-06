import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DigitalContent } from '../../models/schemas/digitalContent.schema';
import { DigitalContentToSourceCode } from '../../models/schemas/digitalContentToSourceCode.schema';
import { SourceCodeService } from '../sourceCode/sourceCode.service';
import { CheckinDigitalContentDto } from './dtos/checkinDigitalContent.dto';
import { CheckoutDigitalContentDto } from './dtos/checkoutDigitalContent.dto';
import { DigitalContentDto } from './dtos/digitalContent.dto';
import { DigitalContentToSourceCodeQueryDto } from './dtos/digitalContentToSourceCode.dto';

@Injectable()
export class DigitalContentService {
  private logger = new Logger(DigitalContentService.name);

  constructor(
    @InjectModel(DigitalContent.name)
    private digitalContentModel: Model<DigitalContent>,
    @InjectModel(DigitalContentToSourceCode.name)
    private digitalContentToSourceCodeModel: Model<DigitalContentToSourceCode>,
    private sourceCodeService: SourceCodeService,
  ) {}

  async getAllDigitalContents() {
    const digitalContents = await this.digitalContentModel.find();
    return digitalContents;
  }

  async getDigitalContentById(id: string) {
    const digitalContent = await this.digitalContentModel.findById(id);
    return digitalContent;
  }

  async getDigitalContentToSourceCode(
    digitalContentToSourceCodeDto?: DigitalContentToSourceCodeQueryDto,
  ): Promise<any> {
    // const sourceCodeToUsers = await this.digitalContentToSourceCodeRepo.find({
    //   relations: {
    //     sourceCode: true,
    //     digitalContent: true,
    //   },
    //   where: {
    //     sourceCode: { id: digitalContentToSourceCodeDto.sourceCodeId },
    //     digitalContent: { id: digitalContentToSourceCodeDto.digitalContentId },
    //   },
    //   withDeleted: digitalContentToSourceCodeDto.withDeleted,
    // });
    const sourceCodeToUsers = await this.digitalContentToSourceCodeModel
      .find({
        // 'sourceCode._id': digitalContentToSourceCodeDto.sourceCodeId,
        // 'digitalContent._id': digitalContentToSourceCodeDto.digitalContentId,
        sourceCode: { _id: digitalContentToSourceCodeDto.sourceCodeId },
        digitalContent: { _id: digitalContentToSourceCodeDto.digitalContentId },
      })
      .populate('sourceCode')
      .populate('digitalContent');
    const res = sourceCodeToUsers.map((sourceCodeToUser) => {
      const { sourceCode, digitalContent, ...rest } =
        sourceCodeToUser.toObject();
      return {
        ...rest,
        sourceCodeId: sourceCode?._id,
        sourceCodeName: sourceCode?.name,
        digitalContentId: digitalContent?._id,
        digitalContentName: digitalContent?.name,
      };
    });
    return res;
  }

  async createNewDigitalContent(digitalContentDto: DigitalContentDto) {
    const digitalContent = new this.digitalContentModel(digitalContentDto);
    return await digitalContent.save();
  }

  async updateDigitalContent(id: string, digitalContentDto: DigitalContentDto) {
    // let toUpdate = await this.digitalContentRepo.findOneBy({ id });

    // let updated = Object.assign(toUpdate, digitalContentDto);
    // return await this.digitalContentRepo.save(updated);
    const updated = await this.digitalContentModel.findByIdAndUpdate(
      id,
      digitalContentDto,
    );
    return updated;
  }

  async deleteDigitalContent(id: string) {
    // const toRemove = await this.digitalContentRepo.findOneOrFail({
    //   where: { id },
    //   relations: { digitalContentToSourceCodes: true },
    // });
    // return await this.digitalContentRepo.softRemove(toRemove);
    return await this.digitalContentModel.findByIdAndDelete(id);
  }

  /*------------------------ checkin/checkout sourceCode ------------------------- */

  async checkoutDigitalContent(
    checkoutDigitalContentDto: CheckoutDigitalContentDto,
  ) {
    if (
      await this.digitalContentToSourceCodeModel.findOne({
        // 'digitalContent._id': checkoutDigitalContentDto.digitalContentId,
        // 'sourceCode._id': checkoutDigitalContentDto.sourceCodeId,
        digitalContent: { _id: checkoutDigitalContentDto.digitalContentId },
        sourceCode: { _id: checkoutDigitalContentDto.sourceCodeId },
      })
    )
      throw new HttpException(
        'This source code is already checkout',
        HttpStatus.BAD_REQUEST,
      );
    const digitalContent = await this.digitalContentModel.findById(
      checkoutDigitalContentDto.digitalContentId,
    );
    const sourceCode = await this.sourceCodeService.getSourceCodeById(
      checkoutDigitalContentDto.sourceCodeId,
    );
    const digitalContentToSourceCode =
      new this.digitalContentToSourceCodeModel();
    digitalContentToSourceCode.digitalContent = digitalContent;
    digitalContentToSourceCode.sourceCode = sourceCode;
    digitalContentToSourceCode.checkout_date =
      checkoutDigitalContentDto.checkout_date;
    digitalContentToSourceCode.checkout_note =
      checkoutDigitalContentDto.checkout_note;
    await digitalContentToSourceCode.save();
    return digitalContentToSourceCode;
  }

  async checkinDigitalContent(
    checkinDigitalContentDto: CheckinDigitalContentDto,
  ) {
    const digitalContentToSourceCode =
      await this.digitalContentToSourceCodeModel.findById(
        checkinDigitalContentDto.digitalContentToSourceCodeId,
      );
    digitalContentToSourceCode.checkin_date =
      checkinDigitalContentDto.checkin_date;
    digitalContentToSourceCode.checkin_note =
      checkinDigitalContentDto.checkin_note;
    await digitalContentToSourceCode.save();
    // Soft delete
    // await this.digitalContentToSourceCodeRepo.softDelete({
    //   id: checkinDigitalContentDto.digitalContentToSourceCodeId,
    // });
    return digitalContentToSourceCode;
  }
}
