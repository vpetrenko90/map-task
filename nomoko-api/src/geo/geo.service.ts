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

  async getNearbyPoints(point: GeoPoint): Promise<Buildings[]> {
    const { long, lat } = point;

    const queryRunner = this.connection.createQueryRunner();
    const sql = `
            SELECT *, ST_DISTANCE(location::geography, ST_SetSRID(ST_MakePoint($1, $2), ${SRID})::geography ) AS st_dist
                FROM buildings
            ORDER BY location::geometry <-> ST_SetSRID(ST_MakePoint($1, $2), ${SRID})::geometry
            LIMIT ${SQL_NEARBY_RESULTS}`;

    const list = await queryRunner.query(sql, [long, lat]);

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
