import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import { InjectRepository } from '@nestjs/typeorm';
import { Buildings } from '@app/geo/geo.entity';
import { plainToClass } from 'class-transformer';
import { BUILDING_TYPES } from '@app/geo/geo.constants';
import { Point } from 'geojson';
import { Repository } from 'typeorm';

const FILE = 'properties_f.csv';

interface GeoCsvRow {
  Coordinates: string;
  ['Price/m^2']: string;
  BuildingType: BUILDING_TYPES;
  Parking: string;
}

@Injectable()
export class GeoService {
  constructor(
    @InjectRepository(Buildings)
    private buildingsRepository: Repository<Buildings>,
  ) {}

  async import(): Promise<{ response: string }> {
    return new Promise((resolve, reject) => {
      fs.createReadStream(path.resolve(__dirname, FILE))
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
}
