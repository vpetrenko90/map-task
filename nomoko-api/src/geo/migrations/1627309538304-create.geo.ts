import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { SRID, TABLE } from '../geo.constants';

export class GeoCreate1627304760736 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: TABLE,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'price',
            type: 'real',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'location',
            type: 'geography',
            spatialFeatureType: 'Point',
            srid: SRID,
            isNullable: false,
          },
          {
            name: 'isParking',
            type: 'boolean',
            default: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(TABLE);
  }
}
