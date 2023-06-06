import {
  Controller,
  Get,
  UseGuards,
  Post,
  Put,
  Body,
  Delete,
  Query,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAdminAuthGuard } from '../auth/guards/jwt-admin-auth.guard';
import { JwtAllAuthGuard } from '../auth/guards/jwt-all-auth.guard';
import { DepartmentDto } from './dtos/department.dto';
import { DepartmentService } from './department.service';
import { DepartmentQueryDto } from './dtos/departmentQuery.dto';

@ApiTags('department')
@Controller('department')
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @Get('all')
  @UseGuards(JwtAllAuthGuard)
  async getAllDepartments(@Query() departmentQuery: DepartmentQueryDto) {
    return await this.departmentService.getAllDepartments(departmentQuery);
  }

  @Get('get-department-by-id/:id')
  @UseGuards(JwtAllAuthGuard)
  async getDepartmentById(@Param('id') id: string) {
    return await this.departmentService.getDepartmentByDepartmentId(id);
  }

  // @Get('get-department-by-location-id/:id')
  // @UseGuards(JwtAllAuthGuard)
  // async getDepartmentByLocationId(@Param('id') id: string) {
  //   return await this.departmentService.getDepartmentByLocationId(id);
  // }

  @Post('create-department')
  @UseGuards(JwtAdminAuthGuard)
  async createDepartment(@Body() departmentDto: DepartmentDto) {
    return await this.departmentService.createNewDepartment(departmentDto);
  }

  @Put('update-department')
  @UseGuards(JwtAdminAuthGuard)
  async updateDepartment(
    @Body() departmentDto: DepartmentDto,
    @Body('id') id: string,
  ) {
    return await this.departmentService.updateDepartment(id, departmentDto);
  }

  @Delete('delete-department')
  @UseGuards(JwtAdminAuthGuard)
  async deleteDepartment(@Body('id') id: string) {
    return await this.departmentService.deleteDepartment(id);
  }
}
