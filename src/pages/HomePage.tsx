import React from 'react';
import { Container, Typography } from '@mui/material';
import HospitalSearchMap from 'components/HospitalSearchMap';

const HomePage = () => {
  return (
    <Container maxWidth={'lg'} sx={{ paddingTop: '32px' }}>
      <Typography variant="h2" marginBottom={'32px'} color="#673fe6">
        Veda coding project
      </Typography>
      <HospitalSearchMap />
    </Container>
  );
};

export default HomePage;
