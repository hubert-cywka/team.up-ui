import { GeoPosition } from '@shared/types/Other';

export const calculateDistanceInKilometers = (from: GeoPosition, to: GeoPosition) => {
  const earthRadius = 6371e3;
  const latitude1 = (from.lat * Math.PI) / 180;
  const latitude2 = (to.lat * Math.PI) / 180;
  const deltaLatitude = ((to.lat - from.lat) * Math.PI) / 180;
  const deltaLongitude = ((to.lng - from.lng) * Math.PI) / 180;

  const a =
    Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
    Math.cos(latitude1) *
      Math.cos(latitude2) *
      Math.sin(deltaLongitude / 2) *
      Math.sin(deltaLongitude / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round((earthRadius * c) / 10) / 100;
};
