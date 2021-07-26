import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GeoService } from './geo.service';
import { GeoController } from './geo.controller';
import { Buildings } from '@app/geo/geo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Buildings])],
  providers: [GeoService],
  controllers: [GeoController],
})
export class GeoModule {}
