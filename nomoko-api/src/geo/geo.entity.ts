import { Index, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEnum } from 'class-validator';
import { Point } from 'geojson';

import { BuildingsTypes, TABLE } from './geo.constants';

@Entity(TABLE)
export class Buildings {
  @PrimaryGeneratedColumn()
  readonly id?: number;

  @Column({ type: 'real', nullable: false })
  price: number;

  @IsEnum(BuildingsTypes)
  @Column({ type: 'enum', enum: BuildingsTypes, nullable: false })
  type: BuildingsTypes;

  @Column({ type: 'boolean', default: false })
  isParking: boolean;

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: false,
  })
  location: Point;
}
