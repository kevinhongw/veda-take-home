import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useHospitals } from 'hooks/useHospitals';

import HospitalMap from 'components/HospitalMap';
import SearchInput from 'components/SearchInput';
import FilterGroups from './FilterGroups';
import MapDisplayOptions from './MapDisplayOptions';

export type Filters = {
  rating: string[];
  hasER: string[]; // should be a boolean
  meetsEHRCriteria: string[];
  hospitalType: string[];
  safetyOfCare: string[];
  timelinessOfCare: string[];
};

export type MapDisplayOptions = {
  markers: boolean;
  heatMap: boolean;
};

export type FilterFields = keyof Filters;

const initFilters = () => ({
  rating: [],
  hasER: [],
  meetsEHRCriteria: [],
  hospitalType: [],
  safetyOfCare: [],
  timelinessOfCare: [],
});

const HospitalsDashboard = () => {
  const { data: hospitals, isLoading: isDataLoading } = useHospitals(); // simulate real api call
  const [isMapLoading, setIsMapLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState<Filters>(initFilters());
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>(hospitals || []);
  const [displayOptions, setDisplayOptions] = useState<MapDisplayOptions>({
    markers: true,
    heatMap: true,
  });

  useEffect(() => {
    filterHospitals();
  }, [hospitals, filters, searchTerm]);

  // TODO: Improve filter performance
  const filterHospitals = () => {
    let result = hospitals || [];

    if (searchTerm && searchTerm !== '') {
      result = result.filter((hospital) =>
        hospital.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()),
      );
    }

    if (filters.rating.length > 0) {
      result = result.filter((hospital) => filters.rating.includes(hospital.overallRating));
    }

    if (filters.hasER.length > 0) {
      result = result.filter((hospital) => filters.hasER.includes(hospital.hasER ? 'Yes' : 'No'));
    }

    if (filters.meetsEHRCriteria.length > 0) {
      result = result.filter((hospital) =>
        filters.meetsEHRCriteria.includes(hospital.meetsEHRCriteria ? 'Yes' : 'No'),
      );
    }

    if (filters.hospitalType.length > 0) {
      result = result.filter((hospital) => filters.hospitalType.includes(hospital.hospitalType));
    }

    if (filters.safetyOfCare.length > 0) {
      result = result.filter((hospital) =>
        filters.safetyOfCare.includes(hospital.safetyOfCareNationalComparison),
      );
    }

    if (filters.timelinessOfCare.length > 0) {
      result = result.filter((hospital) =>
        filters.timelinessOfCare.includes(hospital.timelinessOfCareNationalComparison),
      );
    }

    setFilteredHospitals(result);
    setIsMapLoading(false);
  };

  const handleOnSearch = (newSearchTerm: string) => {
    setIsMapLoading(true);
    setSearchTerm(newSearchTerm);
  };

  const handleDisplayOptionChange = (field: keyof MapDisplayOptions, value: boolean) => {
    setDisplayOptions({
      ...displayOptions,
      [field]: value,
    });
  };

  const handleFilterChange = (filterField: FilterFields, value: string) => {
    setIsMapLoading(true);

    const filterValue = filters[filterField];

    // Toggle filter value
    const index = filterValue?.indexOf(value);
    if (index !== -1) {
      filterValue.splice(index, 1);
    } else {
      filterValue.push(value);
    }

    setFilters({
      ...filters,
      [filterField]: filterValue,
    });
  };

  const handleResetFilter = () => {
    setFilters(initFilters());
  };

  const loading = isDataLoading || isMapLoading;

  return (
    <Grid container spacing={2}>
      <Grid md={3}>
        <Box
          padding="16px"
          sx={{ border: '1px solid #aaa', borderRadius: '8px' }}
          display={'flex'}
          flexDirection={'column'}
          gap={'16px'}>
          <MapDisplayOptions displayOptions={displayOptions} onChange={handleDisplayOptionChange} />
          <SearchInput onSearch={handleOnSearch} />
          <FilterGroups filters={filters} onChange={handleFilterChange} />
          <Button variant="contained" size="small" onClick={handleResetFilter}>
            Reset filters
          </Button>
        </Box>
      </Grid>
      <Grid xs={9}>
        <Typography>{filteredHospitals.length} hospitals found</Typography>
        <HospitalMap data={filteredHospitals} isLoading={loading} displayOptions={displayOptions} />
      </Grid>
    </Grid>
  );
};

export default HospitalsDashboard;
