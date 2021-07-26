import { Controller, Get, Post, Req, Query } from '@nestjs/common';
import { GeoService } from '@app/geo/geo.service';
import { Buildings } from '@app/geo/geo.entity';
import {RequestParams} from "@app/geo/types";

@Controller('geo')
export class GeoController {
  constructor(public service: GeoService) {}

  @Post('/')
  import(): Promise<any> {
    return this.service.import();
  }

  @Get('/')
  getList(@Query() query: RequestParams): Promise<Buildings[]> {
    return this.service.find(query);
  }
}
