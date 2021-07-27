import { Icon, LatLngLiteral, IconOptions } from 'leaflet';
import markerShadow from './assets/marker-shadow.png';

import markerRedIcon from './assets/marker-icon-2x-red.png';
import markerVioletIcon from './assets/marker-icon-2x-violet.png';
import markerBlueIcon from './assets/marker-icon-2x-blue.png';
import markerGoldIcon from './assets/marker-icon-2x-gold.png';

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
  shadowUrl: markerShadow,
};

export const MARKERS = {
  blue: new Icon({
    iconUrl: markerBlueIcon,
    ...MARKERS_BASIC,
  }),
  gold: new Icon({
    iconUrl: markerGoldIcon,
    ...MARKERS_BASIC,
  }),
  red: new Icon({
    iconUrl: markerRedIcon,
    ...MARKERS_BASIC,
  }),
  violet: new Icon({
    iconUrl: markerVioletIcon,
    ...MARKERS_BASIC,
  }),
};

export const MARKERS_HINTS = [
  { alt: 'Blue marker', src: markerBlueIcon, text: 'Points on map' },
  {
    alt: 'Red marker',
    src: markerRedIcon,
    text: 'Current position to search estimation',
  },
  {
    alt: 'Violet marker',
    src: markerVioletIcon,
    text: 'Search history points',
  },
  {
    alt: 'Gold marker',
    src: markerGoldIcon,
    text: 'Nearby locations to estimate price',
  },
];
