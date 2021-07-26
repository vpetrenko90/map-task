import { Controller, Get, Post } from '@nestjs/common';
import { GeoService } from '@app/geo/geo.service';
import {Buildings} from "@app/geo/geo.entity";

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
}
