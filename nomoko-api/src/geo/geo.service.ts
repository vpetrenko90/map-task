import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';

import { sum } from '@app/utils/array';
import { Buildings } from '@app/geo/geo.entity';
import { GeoPoint } from '@app/geo/types';
import { SQL_NEARBY_RESULTS, SRID } from '@app/geo/geo.constants';
import { plainToClass } from 'class-transformer';

@Injectable()
export class GeoService {
  constructor(
    @InjectRepository(Buildings)
    private readonly buildingsRepository: Repository<Buildings>,
    private readonly connection: Connection,
  ) {}

  async getList(): Promise<Buildings[]> {
    return this.buildingsRepository.find();
  }

  /**
   * Get first nearby places certain point
   *
   * For this task deterministic method via inverse distance weighted (IDW) techniques are used
   * According to the IDW interpolation the measured values closest to the prediction
   * location (by st_dist IDW power coefficient) has more influence on the predicted value than those farther away.
   * So those nearest places are found, then calculate the average price.
   *
   * Some 3-d party packages are available to work with spatial analysis (https://github.com/Turfjs/turf),
   * but PostGIS extension for PostgreSQL supports spatial and geographic objects and has tools to analyze geodata.
   * For example, operator <-> provides index-assisted nearest-neighbor result sets, that is much more efficient than
   * using any additional libs.
   *
   * Also PostGIS has the other method for interpolation like ST_InterpolateRaster. It is based on 3-d points, we could try
   * to use price as Z coordinate. Need test this method deeper.
   *
   * Now we sort all nearest results by distance and take the latest several results.
   * As an improvement we can take specific distance values to filter the closest points.
   *
   * @param point
   */
  async getNearbyPoints(point: GeoPoint): Promise<Buildings[]> {
    const { long, lat } = point;

    const sql = `
            SELECT *, ST_DISTANCE(location::geography, ST_SetSRID(ST_MakePoint($1, $2), ${SRID})::geography ) AS st_dist
                FROM buildings
            ORDER BY location::geometry <-> ST_SetSRID(ST_MakePoint($1, $2), ${SRID})::geometry
            LIMIT ${SQL_NEARBY_RESULTS}`;

    const list = await this.connection.query(sql, [long, lat]);

    return list.map((item) => plainToClass(Buildings, item));
  }

  async getInterpolatedPrice(
    point,
  ): Promise<{ price: number; list: Buildings[] }> {
    const list = await this.getNearbyPoints(point);
    const result = sum(list.map((e) => e.price));
    const price = result / list.length;

    return { price, list };
  }
}
