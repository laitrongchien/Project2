import {
  Controller,
  Get,
  UseGuards,
  Post,
  Put,
  Body,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAdminAuthGuard } from '../auth/guards/jwt-admin-auth.guard';
import { JwtAllAuthGuard } from '../auth/guards/jwt-all-auth.guard';
import { LocationDto } from './dtos/location';
import { LocationService } from './location.service';

@ApiTags('location')
@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get('all')
  @UseGuards(JwtAllAuthGuard)
  async getAllLocations() {
    return await this.locationService.getAllLocations();
  }

  @Get('get-location-by-id/:id')
  @UseGuards(JwtAllAuthGuard)
  async getLocationById(@Param('id') id: string) {
    return await this.locationService.getLocationById(id);
  }

  @Post('create-location')
  @UseGuards(JwtAdminAuthGuard)
  async createLocation(@Body() locationDto: LocationDto) {
    return await this.locationService.createNewLocation(locationDto);
  }

  @Put('update-location')
  @UseGuards(JwtAdminAuthGuard)
  async updateLocation(
    @Body('id') id: string,
    @Body() locationDto: LocationDto,
  ) {
    return await this.locationService.updateLocation(id, locationDto);
  }

  @Delete('delete-location')
  @UseGuards(JwtAdminAuthGuard)
  async deleteLocation(@Body('id') id: string) {
    return await this.locationService.deleteLocation(id);
  }
}
