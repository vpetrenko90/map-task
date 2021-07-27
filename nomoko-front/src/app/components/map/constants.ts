import { Icon, LatLngLiteral, IconOptions } from 'leaflet';
import markerRedIcon from './assets/marker-icon-2x-red.png';
import markerShadow from './assets/marker-shadow.png';
import markerVioletIcon from './assets/marker-icon-2x-violet.png';

export const DEFAULT_CENTER: LatLngLiteral = {
  lat: 47.3810326,
  lng: 8.5583433,
};
export const DEFAULT_ZOOM = 13;

const MARKERS_BASIC: Partial<IconOptions> = {
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
};

export const MARKERS = {
  red: new Icon({
    iconUrl: markerRedIcon,
    shadowUrl: markerShadow,
    ...MARKERS_BASIC,
  }),
  violet: new Icon({
    iconUrl: markerVioletIcon,
    shadowUrl: markerShadow,
    ...MARKERS_BASIC,
  }),
};
