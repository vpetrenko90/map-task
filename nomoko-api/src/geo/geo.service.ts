import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Point } from 'geojson';
import { Repository } from 'typeorm';

import { Buildings } from '@app/geo/geo.entity';
import { FILE_DATA, GeoCsvRow } from '@app/geo/geo.constants';
import { RequestParams } from '@app/geo/types';

@Injectable()
export class GeoService {
  constructor(
    @InjectRepository(Buildings)
    private buildingsRepository: Repository<Buildings>,
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

  async find(query: RequestParams): Promise<Buildings[]> {
    const { lat, long } = query;
    if (lat && long) {
      return this.buildingsRepository.find({ id: 1 });
    } else {
      return this.buildingsRepository.find();
    }
  }
}
