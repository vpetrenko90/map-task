import {Controller, Get} from '@nestjs/common';
import {GeoService} from "@app/geo/geo.service";


@Controller('geo')
export class GeoController {
  constructor(public service: GeoService) {}

  @Get()
  getHello(): string {
    return this.service.getHello();
  }
}
