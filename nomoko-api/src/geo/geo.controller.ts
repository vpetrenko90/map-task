import { Controller, Get, Post, Req, Query } from '@nestjs/common';
import { GeoService } from '@app/geo/geo.service';
import { Buildings } from '@app/geo/geo.entity';
import { GeoPoint } from '@app/geo/types';

@Controller('geo')
export class GeoController {
  constructor(public readonly service: GeoService) {}

  @Get('/')
  getList(): Promise<Buildings[]> {
    return this.service.find();
  }

  @Get('/price')
  async getPredictedPrice(@Query() point: GeoPoint) {
    return this.service.getInterpolatedPrice(point);
  }
}
