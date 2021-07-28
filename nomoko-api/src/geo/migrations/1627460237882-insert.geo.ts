import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import { MigrationInterface, QueryRunner } from 'typeorm';

import { FILE_DATA, TABLE } from '../geo.constants';
import { GeoCsvRow } from '@app/geo/types';
import { Point } from 'geojson';
import { plainToClass } from 'class-transformer';
import { Buildings } from '@app/geo/geo.entity';

export class GeoInsert1627460237882 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    return new Promise((resolve, reject) => {
      fs.createReadStream(path.resolve(__dirname, FILE_DATA))
        .pipe(csv.parse({ headers: true, delimiter: ';', objectMode: true }))
        .transform((row: GeoCsvRow, next): void => {
          const parsed = row.Coordinates?.match(/POINT\((\d.+)\s(\d.+)\)/);
          const location: Point = {
            type: 'Point',
            coordinates: [parseFloat(parsed[2]), parseFloat(parsed[1])],
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
          return queryRunner.manager.save(Buildings, data);
        })
        .on('error', reject)
        .on('end', resolve);
    });
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.clearTable(TABLE);
  }
}
