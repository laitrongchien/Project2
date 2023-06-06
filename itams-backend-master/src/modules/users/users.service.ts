import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import CreateUserDto from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { UserQueryDto } from './dtos/userQuery.dto';
import UpdateProfileDto from './dtos/update-profile.dto';
import { AVATAR_PATH } from './user.constants';
import { DepartmentService } from '../department/department.service';
import { FirebaseService } from '../firebase/firebase.service';
import { User } from 'src/models/schemas/user.schema';
import { log } from 'console';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private departmentService: DepartmentService,
    private firebaseService: FirebaseService,
  ) {}

  async getAll(userQuery?: UserQueryDto): Promise<any> {
    const users = await this.userModel
      .find({
        // 'department._id': userQuery.departmentId,
        department: { _id: userQuery.departmentId },
      })
      .populate('department')
      .populate('assetToUsers');
    const res = users.map((user) => {
      const { department, assetToUsers, password, ...rest } = user.toObject();
      return {
        ...rest,
        department: department?.name,
        assets: assetToUsers?.length,
      };
    });
    return res;
  }

  async getUserByUserId(id: string): Promise<any> {
    const user = await this.userModel.findById(id).populate('department');
    const { department, password, ...rest } = user.toObject();
    return { ...rest, department: department?.name };
  }

  async createNewUser(userDto: UserDto): Promise<any> {
    const department = await this.departmentService.getDepartmentById(
      userDto.departmentId,
    );

    // console.log(department);
    // Update code

    const userData = {
      name: userDto.name,
      username: userDto.username,
      password: await bcrypt.hash(userDto.password, 10),
      phone: userDto.phone,
      email: userDto.email,
      birthday: userDto.birthday,
      avatar: userDto.avatar,
      department: department,
    };
    const user = new this.userModel(userData);
    await user.save();
    return user;
  }

  async importUser(userDtos: UserDto[]) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      await Promise.all(
        userDtos.map(async (userDto: UserDto) => {
          const user = new User();
          const { password, departmentId, ...rest } = userDto;
          Object.assign(user, rest);
          const department = await this.departmentService.getDepartmentById(
            userDto.departmentId,
          );
          user.password = await bcrypt.hash(userDto.password, 10);
          user.department = department;
          await user.save({ session });
        }),
      );
      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
    return userDtos;
  }

  async updateUser(id: string, userDto: UserDto) {
    const toUpdate = await this.userModel.findById(id);
    const { password, departmentId, ...rest } = userDto;
    const department = await this.departmentService.getDepartmentById(
      userDto.departmentId,
    );
    const updated = Object.assign(toUpdate, rest);
    updated.password = await bcrypt.hash(userDto.password, 10);
    updated.department = department;
    return await updated.save();
  }

  async deleteUser(id: string) {
    // const toRemove = await this.userRepo.findOneOrFail({
    //   where: { id },
    //   relations: {
    //     assetToUsers: true,
    //     sourceCodeToUsers: true,
    //     requestAssets: true,
    //   },
    // });
    // return await this.userRepo.softRemove(toRemove);
    return this.userModel.findByIdAndDelete(id);
  }

  async getUserByUsername(username: string) {
    const user = await this.userModel.findOne({ username });

    if (user) {
      return user;
    }
  }

  async getUserById(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }

  async saveAvatar(user: User, file: Express.Multer.File) {
    // upload ảnh lên storage
    const avatar = await this.uploadImage(file, AVATAR_PATH);
    // cập nhật db
    await this.userModel.updateOne({ _id: user._id }, { avatar });
    const newUser = await this.getUserById(user._id);
    return newUser;
  }

  async uploadImage(file: Express.Multer.File, path: string) {
    const url: string = await this.firebaseService.uploadFile(file, path);
    return url;
  }

  async createUser(createUserDto: CreateUserDto) {
    const newUser = new this.userModel();
    newUser.username = createUserDto.username;
    newUser.password = createUserDto.password;

    return await newUser.save();
  }

  async updateProfile(userId: string, userData: UpdateProfileDto) {
    const toUpdate = await this.getUserById(userId);

    // TODO why delete?
    delete toUpdate.password;
    delete toUpdate.username;

    const updated = Object.assign(toUpdate, userData);
    return await updated.save();
  }

  async setNewPassword(username: string, password: string) {
    const user = await this.getUserByUsername(username);

    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userModel.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });
  }
}
