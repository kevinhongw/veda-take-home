import { Box, BoxProps } from '@mui/material';
import React from 'react';

type Props = {
  hospital: Hospital;
};

type InfoProps = { title?: string; value?: string } & BoxProps;

const Info: React.FC<InfoProps> = ({ title, value, ...boxProps }) => {
  return (
    <Box {...boxProps}>
      {title && <strong>{title}</strong>} {value || ''}
    </Box>
  );
};

const HospitalInfo: React.FC<Props> = ({ hospital }) => {
  return (
    <Box display="flex" flexDirection={'column'} rowGap={'8px'}>
      <Info value={hospital.name} fontSize={'16px'} margin={0} />
      <Info value={`${hospital.address}, ${hospital.city}, ${hospital.state} ${hospital.zip}`} />
      <Info value={hospital.phoneNumber} />
      <Info title="Overall rating:" value={hospital.overallRating} />
      <Info title="Has ER:" value={hospital.hasER ? 'Yes' : 'No'} />
      <Info title="Type:" value={hospital.hospitalType} />
      <Info title="Ownership:" value={hospital.hospitalOwnership} />
      <Info title="Meets EHR criteria:" value={hospital.meetsEHRCriteria ? 'Yes' : 'No'} />
      <Info title="Mortality national comparison:" value={hospital.mortalityNationalComparison} />
      <Info
        title="Safely of care national comparison:"
        value={hospital.safetyOfCareNationalComparison}
      />
      <Info
        title="Readmission national comparison:"
        value={hospital.readmissionNationalComparison}
      />
      <Info
        title="Effectiveness of care national comparison:"
        value={hospital.effectivenessOfCareNationalComparison}
      />
      <Info
        title="Timeliness of care national comparison:"
        value={hospital.timelinessOfCareNationalComparison}
      />
    </Box>
  );
};

export default HospitalInfo;
