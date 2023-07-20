import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { memo, useEffect, useState } from 'react';
import { GOOGLE_API_KEY } from 'shared/config/AppConfig';
import MapMouseEvent = google.maps.MapMouseEvent;
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'components/primitives/spinner/Spinner';
import IconButton from 'components/primitives/icon-button/IconButton';
import styles from './LocationPicker.module.scss';
import { GeoPosition } from 'shared/types/Other';
import classNames from 'classnames';

interface LocationPickerProps {
  selected: GeoPosition | null;
  onChange: (newLocation: GeoPosition) => void; // eslint-disable-line no-unused-vars
  className?: string;
}

const DEFAULT_LOCATION: GeoPosition = {
  lat: 52.134717,
  lng: 21.004241
};

const LocationPicker = ({ selected, onChange, className }: LocationPickerProps) => {
  const [centerPosition, setCenterPosition] = useState<GeoPosition>(DEFAULT_LOCATION);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_API_KEY
  });

  useEffect(() => {
    setPositionBasedOnGeolocation();
  }, []);

  const setPositionBasedOnGeolocation = () => {
    navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
      if (permissionStatus.state === 'denied') {
        alert('Please allow location access.');
      } else {
        window.navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          onChange({ lat: latitude, lng: longitude });
          setCenterPosition({ lat: latitude, lng: longitude });
        });
      }
    });
  };

  const setMarkerPositionOnMapClick = (ev: MapMouseEvent) => {
    if (ev.latLng) {
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
        onClick={setPositionBasedOnGeolocation}
      />
      <GoogleMap
        mapContainerClassName={styles.map}
        onClick={setMarkerPositionOnMapClick}
        center={centerPosition}
        zoom={10}>
        {!!selected && (
          <MarkerF draggable position={selected} onDrag={setMarkerPositionOnMapClick} />
        )}
      </GoogleMap>
    </section>
  );
};

export default memo(LocationPicker);
