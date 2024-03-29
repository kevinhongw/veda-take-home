import { Box, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import HospitalInfo from 'components/HospitalInfo';

type Props = {
  data: Hospital[];
  isLoading: boolean;
};

// This is required for leaflet-cluster to work properly
const customIcon = new L.Icon({
  // eslint-disable-next-line
  iconUrl: require('../assets/location.svg').default,
  iconSize: new L.Point(40, 47),
});

const HospitalMap: React.FC<Props> = ({ data, isLoading }) => {
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    map?.on('viewreset', console.log('Loading'));
    return () => {
      map?.off('viewreset', console.log('Off loading'));
    };
  }, [map]);

  return (
    <Box position={'relative'}>
      {isLoading && (
        <Box position={'absolute'} left="50%" top="50%" width="50px" height="50px" zIndex={1000}>
          <CircularProgress size={'50'} sx={{ display: 'block' }} />
        </Box>
      )}
      <Box zIndex={0}>
        <MapContainer
          center={[39.688709, -98.287453]}
          zoom={5}
          scrollWheelZoom={true}
          ref={setMap}
          style={{ height: '600px' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerClusterGroup chunkedLoading maxClusterRadius={75} spiderfyOnMaxZoom={true}>
            {data.map((hospital) => {
              return (
                <Marker
                  key={hospital.id}
                  position={[hospital.lat, hospital.lon]}
                  title={hospital.name}
                  icon={customIcon}>
                  <Popup>
                    <HospitalInfo hospital={hospital} />
                  </Popup>
                </Marker>
              );
            })}
          </MarkerClusterGroup>
        </MapContainer>
      </Box>
    </Box>
  );
};
export default HospitalMap;
