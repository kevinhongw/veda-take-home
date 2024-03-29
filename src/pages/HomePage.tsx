import React from 'react';
import { Container, Typography } from '@mui/material';
import HospitalSearchMap from 'components/HospitalSearchMap';

const HomePage = () => {
  return (
    <Container maxWidth={'lg'}>
      <Typography>Veda coding project</Typography>
      <HospitalSearchMap />
    </Container>
  );
};

export default HomePage;
