import { Index, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEnum } from 'class-validator';
import { Point } from 'geojson';

import { BUILDING_TYPES, TABLE } from './geo.constants';

@Entity(TABLE)
export class Buildings {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ type: 'real', nullable: false })
  price: number;

  @IsEnum(BUILDING_TYPES)
  @Column({ type: 'enum', enum: BUILDING_TYPES, nullable: false })
  type: BUILDING_TYPES;

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: false,
  })
  location: Point;
}
