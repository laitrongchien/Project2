import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SourceCode } from '../../models/schemas/sourceCode.schema';
import { SourceCodeToUser } from '../../models/schemas/sourceCodeToUser.schema';
import { UsersService } from '../users/users.service';
import { CheckinSourceCodeDto } from './dtos/checkinSourceCode.dto';
import { CheckoutSourceCodeDto } from './dtos/checkoutSourceCode.dto';
import { SourceCodeDto } from './dtos/sourceCode.dto';
import { SourceCodeToUserQueryDto } from './dtos/sourceCodeToUser.dto';

@Injectable()
export class SourceCodeService {
  private logger = new Logger(SourceCodeService.name);

  constructor(
    @InjectModel(SourceCode.name)
    private readonly sourceCodeModel: Model<SourceCode>,
    @InjectModel(SourceCodeToUser.name)
    private readonly sourceCodeToUserModel: Model<SourceCodeToUser>,
    private userService: UsersService,
  ) {}

  async getAllSourceCodes() {
    const sourceCodes = await this.sourceCodeModel.find();
    return sourceCodes;
  }

  async getSourceCodeById(id: string) {
    const sourceCode = await this.sourceCodeModel.findById(id);
    return sourceCode;
  }

  async getSourceCodeToUser(
    sourceCodeToUserQueryDto?: SourceCodeToUserQueryDto,
  ): Promise<any> {
    // console.log(
    //   sourceCodeToUserQueryDto.userId,
    //   sourceCodeToUserQueryDto.sourceCodeId,
    // );
    const sourceCodeToUsers = await this.sourceCodeToUserModel
      .find({
        // 'user._id': sourceCodeToUserQueryDto.userId,
        // 'sourceCode._id': sourceCodeToUserQueryDto.sourceCodeId,
        user: { _id: sourceCodeToUserQueryDto.userId },
        sourceCode: { _id: sourceCodeToUserQueryDto.sourceCodeId },
      })
      .populate('user')
      .populate('sourceCode');
    const res = sourceCodeToUsers.map((sourceCodeToUser) => {
      const { sourceCode, user, ...rest } = sourceCodeToUser.toObject();
      return {
        ...rest,
        sourceCodeId: sourceCode?._id,
        sourceCodeName: sourceCode?.name,
        userId: user?._id,
        userName: user?.name,
      };
    });
    return res;
  }

  async createNewSourceCode(sourceCodeDto: SourceCodeDto) {
    const sourceCode = Object.assign({}, sourceCodeDto);
    await this.sourceCodeModel.create(sourceCode);
    return sourceCode;
  }

  async updateSourceCode(id: string, sourceCodeDto: SourceCodeDto) {
    const updated = await this.sourceCodeModel.findByIdAndUpdate(
      id,
      sourceCodeDto,
    );
    return updated;
  }

  async deleteSourceCode(id: string) {
    return await this.sourceCodeModel.findByIdAndDelete(id);
  }

  /*------------------------ checkin/checkout sourceCode ------------------------- */

  async checkoutSourceCode(checkoutSourceCodeDto: CheckoutSourceCodeDto) {
    if (
      await this.sourceCodeToUserModel.findOne({
        // 'sourceCode._id': checkoutSourceCodeDto.sourceCodeId,
        // 'user._id': checkoutSourceCodeDto.userId,
        sourceCode: { _id: checkoutSourceCodeDto.sourceCodeId },
        user: { _id: checkoutSourceCodeDto.userId },
      })
    )
      throw new HttpException(
        'This user is already checkout',
        HttpStatus.BAD_REQUEST,
      );
    const sourceCode = await this.sourceCodeModel.findById(
      checkoutSourceCodeDto.sourceCodeId,
    );
    const user = await this.userService.getUserById(
      checkoutSourceCodeDto.userId,
    );
    const sourceCodeToUser = new this.sourceCodeToUserModel();
    sourceCodeToUser.user = user;
    sourceCodeToUser.sourceCode = sourceCode;
    sourceCodeToUser.start_date = checkoutSourceCodeDto.start_date;
    sourceCodeToUser.start_note = checkoutSourceCodeDto.start_note;
    await sourceCodeToUser.save();
    return sourceCodeToUser;
  }

  async checkinSourceCode(checkinSourceCodeDto: CheckinSourceCodeDto) {
    const sourceCodeToUser = await this.sourceCodeToUserModel.findById(
      checkinSourceCodeDto.sourceCodeToUserId,
    );
    sourceCodeToUser.end_date = checkinSourceCodeDto.end_date;
    sourceCodeToUser.end_note = checkinSourceCodeDto.end_note;
    await sourceCodeToUser.save();
    // await this.sourceCodeToUserRepo.softDelete({
    //   id: checkinSourceCodeDto.sourceCodeToUserId,
    // });
    return sourceCodeToUser;
  }
}
