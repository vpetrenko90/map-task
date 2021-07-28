import { Controller, Get, Query } from '@nestjs/common';
import { GeoService } from '@app/geo/geo.service';
import { Buildings } from '@app/geo/geo.entity';
import { GeoPoint } from '@app/geo/types';

@Controller('geo')
export class GeoController {
  constructor(public readonly service: GeoService) {}

  /**
   * Get list of all locations
   */
  @Get('/')
  getList(): Promise<Buildings[]> {
    return this.service.getList();
  }

  /**
   * Get interpolated price for certain point
   *
   * @param point GeoPoint
   */
  @Get('/price')
  async getPrice(
    @Query() point: GeoPoint,
  ): Promise<{ price: number; list: Buildings[] }> {
    return this.service.getInterpolatedPrice(point);
  }
}
