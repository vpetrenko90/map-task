import { Controller, Get, Post, Req, Query } from '@nestjs/common';
import { GeoService } from '@app/geo/geo.service';
import { Buildings } from '@app/geo/geo.entity';
import { GeoPoint } from '@app/geo/types';

@Controller('geo')
export class GeoController {
  constructor(public service: GeoService) {}

  @Post('/')
  import(): Promise<any> {
    return this.service.import();
  }

  @Get('/')
  getList(): Promise<Buildings[]> {
    return this.service.find();
  }

  @Get('/price')
  async getPredictedPrice(@Query() point: GeoPoint) {
    const list = await this.service.getNearbyPoints(point);
    const price = await this.service.getPredictPrice(list);

    return { price, list };
  }
}
