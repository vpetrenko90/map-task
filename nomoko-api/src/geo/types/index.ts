import { BuildingsTypes } from '@app/geo/geo.constants';

export interface RequestParams {
  lat: string;
  long: string;
}

export interface GeoCsvRow {
  Coordinates: string;
  ['Price/m^2']: string;
  BuildingType: BuildingsTypes;
  Parking: string;
}
