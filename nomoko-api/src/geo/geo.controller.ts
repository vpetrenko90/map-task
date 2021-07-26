import { Controller, Get, Post } from '@nestjs/common';
import { GeoService } from '@app/geo/geo.service';

@Controller('geo')
export class GeoController {
  constructor(public service: GeoService) {}

  @Post('/')
  import(): Promise<void> {
    return this.service.import();
  }
}
