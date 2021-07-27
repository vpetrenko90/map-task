export enum BuildingsTypes {
  Residential = 'residental',
  Offices = 'offices',
  Commercial = 'commercial',
  Mixed = 'mixed',
}

export interface Building {
  id: number;
  isParking: boolean;
  location: string;
  price: number;
  st_dist: number;
  type: BuildingsTypes;
}
