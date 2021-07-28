import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';

import { sum } from '@app/utils/array';
import { Buildings } from '@app/geo/geo.entity';
import { GeoPoint } from '@app/geo/types';

@Injectable()
export class GeoService {
  constructor(
    @InjectRepository(Buildings)
    private readonly buildingsRepository: Repository<Buildings>,
    private readonly connection: Connection,
  ) {}

  async find(): Promise<Buildings[]> {
    return this.buildingsRepository.find();
  }

  async getNearbyPoints(point: GeoPoint) {
    const { long, lat } = point;

    const queryRunner = this.connection.createQueryRunner();
    const sql = `SELECT  * FROM
        (
            SELECT *, ST_DISTANCE(location::geography, ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography ) AS st_dist
                FROM buildings
            ORDER BY location::geometry <-> ST_SetSRID(ST_MakePoint($1, $2), 4326)::geometry
            LIMIT 1000
        )
        AS s
        ORDER BY st_dist LIMIT 5;`;
    return queryRunner.query(sql, [long, lat]);
  }

  async getInterpolatedPrice(point) {
    const list = await this.getNearbyPoints(point);

    const result = sum(list.map((e) => e.price));

    const price = result / list.length;

    return { price, list };
  }
}
