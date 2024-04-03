import React from 'react';
import { FormControlLabel, Switch } from '@mui/material';

import type { MapDisplayOptions as MapDisplayOptionsType } from 'components//HospitalsDashboard';

type Props = {
  displayOptions: MapDisplayOptionsType;
  onChange: (field: keyof MapDisplayOptionsType, value: boolean) => void;
};

const MapDisplayOptions: React.FC<Props> = ({ displayOptions, onChange }) => {
  const handleOnChange = (
    field: keyof MapDisplayOptionsType,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onChange(field, event.target.checked);
  };

  return (
    <div>
      <FormControlLabel
        control={
          <Switch
            checked={displayOptions.markers}
            onChange={(event) => handleOnChange('markers', event)}
          />
        }
        label="Display markers"
      />
      <FormControlLabel
        control={
          <Switch
            checked={displayOptions.heatMap}
            onChange={(event) => handleOnChange('heatMap', event)}
          />
        }
        label="Display heat map"
      />
    </div>
  );
};

export default MapDisplayOptions;
