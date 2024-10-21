import { useCallback, useRef } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Box } from '@mui/material';
import { defaultTheme } from './Theme';

const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: false,
  keyboardShortcuts: false,
  scrollwheel: false,
  disableDoubleClickZoom: true,
  fullscreenControl: false,
  styles: defaultTheme
};

interface IProps {
  center: {
    lat: number;
    lng: number;
  };
}

function MapUsage({ center }: IProps) {
  const mapRef = useRef<google.maps.Map | undefined>(undefined);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = undefined;
  }, []);

  return (
    <Box sx={{ width: '100%', height: '600px' }}>
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '100%'
        }}
        center={center}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultOptions}>
        <Marker position={center} />
      </GoogleMap>
    </Box>
  );
}

export default MapUsage;
