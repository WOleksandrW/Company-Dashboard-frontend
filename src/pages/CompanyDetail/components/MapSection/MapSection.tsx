import { useContext, useEffect, useState } from 'react';
import { APIProviderContext, APIProviderContextValue } from '@vis.gl/react-google-maps';
import { Box, Typography } from '@mui/material';
import { MapUsage } from '../';

import mapPlaceholder from '@root/assets/images/map-placeholder.jpg';

interface IProps {
  address: string;
}

function MapSection({ address }: IProps) {
  const { status: mapStatus } = useContext(APIProviderContext) as APIProviderContextValue;

  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (mapStatus === 'LOADED') {
      setGeocoder(new google.maps.Geocoder());
    }
  }, [mapStatus]);

  useEffect(() => {
    if (geocoder && address) {
      new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
        geocoder.geocode({ address }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK && results) {
            resolve(results);
          } else {
            reject(new Error(`Geocode failed: ${status}`));
          }
        });
      })
        .then((data) => {
          if (data.length > 0) {
            const { location } = data[0].geometry;
            setCoordinates({ lat: location.lat(), lng: location.lng() });
          } else {
            throw new Error();
          }
        })
        .catch(() => {
          setCoordinates(null);
        });
    }
  }, [geocoder, address]);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px'
      }}>
      <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
        Google map
      </Typography>
      {mapStatus === 'LOADED' && coordinates ? (
        <MapUsage center={coordinates} />
      ) : (
        <Box
          component="img"
          src={mapPlaceholder}
          alt={address}
          sx={{ width: '100%', maxWidth: '900px' }}
        />
      )}
    </Box>
  );
}

export default MapSection;
