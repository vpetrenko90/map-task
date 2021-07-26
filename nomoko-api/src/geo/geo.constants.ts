export const TABLE = 'buildings';

export const FILE_DATA = 'properties_f.csv';

export enum BuildingsTypes {
  Residential = 'residental',
  Offices = 'offices',
  Commercial = 'commercial',
  Mixed = 'mixed',
}

export interface GeoCsvRow {
  Coordinates: string;
  ['Price/m^2']: string;
  BuildingType: BuildingsTypes;
  Parking: string;
}
