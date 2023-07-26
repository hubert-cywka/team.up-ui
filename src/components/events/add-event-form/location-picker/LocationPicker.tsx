'use client';

import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { memo, useEffect, useState } from 'react';
import { GOOGLE_API_KEY } from '@shared/config/AppConfig';
import MapMouseEvent = google.maps.MapMouseEvent;
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import Spinner from '@components/primitives/spinner/Spinner';
import IconButton from '@components/primitives/icon-button/IconButton';
import styles from './LocationPicker.module.scss';
import { GeoPosition } from '@shared/types/Other';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { useUserDetailsStore } from '@stores/UserDetailsStore';

interface LocationPickerProps {
  selected: GeoPosition | null;
  onChange: (newLocation: GeoPosition) => void; // eslint-disable-line no-unused-vars
  className?: string;
  disabled?: boolean;
}

const DEFAULT_LOCATION: GeoPosition = {
  lat: 52.134717,
  lng: 21.004241
};

const LocationPicker = observer(
  ({ selected, onChange, className, disabled }: LocationPickerProps) => {
    const [centerPosition, setCenterPosition] = useState<GeoPosition>(DEFAULT_LOCATION);
    const userDetailsStore = useUserDetailsStore();

    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: GOOGLE_API_KEY
    });

    useEffect(() => {
      const userLocation = userDetailsStore.userLocation;
      if (userLocation && !disabled) {
        onChange(userLocation);
        setCenterPosition(userLocation);
      } else {
        userDetailsStore.initialLocate();
      }
    }, [userDetailsStore.userLocation, disabled]);

    const triggerLocationUpdate = () => {
      navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
        if (permissionStatus.state === 'denied') {
          alert('Please allow location access.');
        } else {
          userDetailsStore.locate();
        }
      });
    };

    const setMarkerPositionOnMapClick = (ev: MapMouseEvent) => {
      if (!disabled && ev.latLng) {
        const lat = ev.latLng.lat();
        const lng = ev.latLng.lng();
        onChange({ lat, lng });
      }
    };

    if (!isLoaded) {
      return <Spinner />;
    }

    return (
      <section className={classNames(styles.locationPicker, className)}>
        <IconButton
          icon={faLocationCrosshairs}
          className={styles.locateButton}
          onClick={triggerLocationUpdate}
        />
        <GoogleMap
          mapContainerClassName={styles.map}
          onClick={setMarkerPositionOnMapClick}
          center={centerPosition}
          zoom={10}>
          {!!selected && (
            <MarkerF
              draggable={!disabled}
              position={selected}
              onDrag={setMarkerPositionOnMapClick}
            />
          )}
        </GoogleMap>
      </section>
    );
  }
);

export default memo(LocationPicker);
