import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Point } from 'geojson';

import { Buildings } from '@app/geo/geo.entity';
import { FILE_DATA } from '@app/geo/geo.constants';
import { GeoCsvRow, GeoPoint } from '@app/geo/types';

@Injectable()
export class GeoService {
  constructor(
    @InjectRepository(Buildings)
    private buildingsRepository: Repository<Buildings>,
    private readonly connection: Connection,
  ) {}

  async import(): Promise<{ response: string }> {
    return new Promise((resolve, reject) => {
      fs.createReadStream(path.resolve(__dirname, FILE_DATA))
        .pipe(csv.parse({ headers: true, delimiter: ';', objectMode: true }))
        .transform((row: GeoCsvRow, next): void => {
          const parsed = row.Coordinates?.match(/POINT\((\d.+)\s(\d.+)\)/);
          const location: Point = {
            type: 'Point',
            coordinates: [parseFloat(parsed[1]), parseFloat(parsed[2])],
          };

          return next(
            null,
            plainToClass(Buildings, {
              location,
              price: parseFloat(row['Price/m^2']),
              type: row.BuildingType,
              isParking: row.Parking === 'x',
            }),
          );
        })
        .on('data', (data: Buildings) => {
          return this.buildingsRepository.save(data);
        })
        .on('error', reject)
        .on('end', resolve);
    });
  }

  async find(): Promise<Buildings[]> {
    return this.buildingsRepository.find();
  }

  async getNearbyPoints(point: GeoPoint) {
    const { long, lat } = point;

    const queryRunner = this.connection.createQueryRunner();
    return queryRunner.query(
      `SELECT  * FROM
        (
            SELECT *, ST_DISTANCE(location::geography, ST_MakePoint($1, $2)::geography ) AS st_dist
                FROM buildings
            ORDER BY location::geometry <-> ST_SetSRID(ST_MakePoint($1, $2), 4326)::geometry
        )
        AS s
        ORDER BY st_dist LIMIT 5;`,
      [long, lat],
    );
  }

  async getPredictPrice(list) {
    const arrSum = (arr) => arr.reduce((a, b) => a + b, 0);
    const sum = arrSum(list.map((e) => e.price));

    return sum / list.length;
  }
}
