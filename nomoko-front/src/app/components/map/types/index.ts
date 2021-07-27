export enum BuildingsTypes {
  Residential = 'residental',
  Offices = 'offices',
  Commercial = 'commercial',
  Mixed = 'mixed',
}

export interface Buildings {
  id: number;
  price: number;
  type: BuildingsTypes;
  isParking: boolean;
  location: {
    type: string;
    coordinates: [number, number];
  };
  st_dist?: number;
}

export interface GetPriceResponse {
  price: number;
  list: Buildings[];
}
