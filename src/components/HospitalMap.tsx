import { Box, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import L, { Map as LeafletMap } from 'leaflet';
import 'leaflet.heat';
import { HeatLatLngTuple, HeatLayer } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import type { MapDisplayOptions } from './HospitalsDashboard';
import HospitalInfo from 'components/HospitalInfo';

type Props = {
  data: Hospital[];
  isLoading: boolean;
  displayOptions: MapDisplayOptions;
};

// This is required for leaflet-cluster to work properly
const customIcon = new L.Icon({
  // eslint-disable-next-line
  iconUrl: require('../assets/marker.svg').default,
  iconSize: new L.Point(30, 37),
});

const HospitalMap: React.FC<Props> = ({ data, isLoading, displayOptions }) => {
  const [map, setMap] = useState<LeafletMap | null>(null);
  const [heatLayer, setHeatLayer] = useState<HeatLayer | null>();

  // Set up heat map layer
  useEffect(() => {
    if (map && data) {
      // Init heat map
      if (!heatLayer) {
        const layer = L.heatLayer([], {
          minOpacity: 0.6,
          radius: 10,
          gradient: { 0.2: 'blue', 0.4: 'lime', 0.6: 'yellow', 0.8: 'orange', 1: 'red' },
        });
        layer.addTo(map);
        setHeatLayer(layer);
      }

      if (displayOptions.heatMap) {
        const heatPoints = data.map((hospital) => {
          return [hospital.lat, hospital.lon, 1] as HeatLatLngTuple;
        });
        heatLayer?.setLatLngs(heatPoints);
      } else {
        heatLayer?.setLatLngs([]);
      }
    }
  }, [map, data, displayOptions.heatMap]);

  return (
    <Box position={'relative'}>
      {isLoading && (
        <Box position={'absolute'} left="50%" top="50%" width="50px" height="50px" zIndex={5000}>
          <CircularProgress size={'70'} sx={{ display: 'block' }} />
        </Box>
      )}
      <Box zIndex={0}>
        {/* Markers cluster layer */}
        <MapContainer
          center={[39.688709, -98.287453]}
          zoom={4}
          scrollWheelZoom={true}
          ref={setMap}
          style={{ height: '600px' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {displayOptions.markers && (
            <MarkerClusterGroup chunkedLoading maxClusterRadius={50} spiderfyOnMaxZoom={true}>
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
          )}
        </MapContainer>
      </Box>
    </Box>
  );
};
export default HospitalMap;
