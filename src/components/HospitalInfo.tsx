import { Box } from '@mui/material';
import React from 'react';

type Props = {
  hospital: Hospital;
};

const HospitalInfo: React.FC<Props> = ({ hospital }) => {
  return (
    <Box display="flex" flexDirection={'column'} rowGap={'8px'}>
      <Box fontSize={'16px'} margin={0}>
        {hospital.name}
      </Box>
      <Box>{`${hospital.address}, ${hospital.city}, ${hospital.state} ${hospital.zip}`}</Box>
      <Box>
        <strong>{hospital.phoneNumber}</strong>
      </Box>
      <Box>
        <strong>Overall rating:</strong> {hospital.overallRating}
      </Box>
      <Box>
        <strong>Has ER: </strong> {hospital.hasER ? 'Yes' : 'No'}
      </Box>
      <Box>
        <strong>Type:</strong> {hospital.hospitalType}
      </Box>
      <Box>
        <strong>Ownership:</strong> {hospital.hospitalOwnership}
      </Box>
      <Box>
        <strong>Meets EHR criteria:</strong> {hospital.meetsEHRCriteria ? 'Yes' : 'No'}
      </Box>
      <Box>
        <strong>Mortality national comparison:</strong> {hospital.mortalityNationalComparison}
      </Box>
    </Box>
  );
};

export default HospitalInfo;
