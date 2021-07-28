import { LatLngLiteral } from 'leaflet';

import { Buildings, GetPriceResponse } from '../types';

const BASIC_URL = process.env.REACT_APP_API_HOST;

async function getList<Entity>(url: string): Promise<Entity> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.json();
}

export const getMarkers = (): Promise<Buildings[]> =>
  getList<Buildings[]>(`${BASIC_URL}/geo`);

export const getPrice = ({
  lng,
  lat,
}: LatLngLiteral): Promise<GetPriceResponse> =>
  getList<GetPriceResponse>(`${BASIC_URL}/geo/price?long=${lng}&lat=${lat}`);
