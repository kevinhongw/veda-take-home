import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useHospitals } from 'hooks/useHospitals';

import HospitalMap from 'components/HospitalMap';
import SearchInput from 'components/SearchInput';
import FilterGroups from './FilterGroups';

export type Filters = {
  rating: string[];
  hasER: string[]; // should be a boolean
  meetsEHRCriteria: string[];
};

export type FilterFields = keyof Filters;

const HospitalSearchMap = () => {
  const { data: hospitals, isLoading: isDataLoading } = useHospitals(); // simulate real api call
  const [isMapLoading, setIsMapLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState<Filters>({
    rating: [],
    hasER: [],
    meetsEHRCriteria: [],
  });
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>(hospitals || []);

  useEffect(() => {
    filterHospitals();
  }, [hospitals, filters, searchTerm]);

  const filterHospitals = () => {
    // TODO: Performance could be way better

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

    setFilteredHospitals(result);
    setIsMapLoading(false);
  };

  const handleOnSearch = (newSearchTerm: string) => {
    setIsMapLoading(true);
    setSearchTerm(newSearchTerm);
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
          <SearchInput onSearch={handleOnSearch} />
          <FilterGroups filters={filters} onChange={handleFilterChange} />
        </Box>
      </Grid>
      <Grid xs={9}>
        <HospitalMap data={filteredHospitals} isLoading={loading} />
      </Grid>
    </Grid>
  );
};

export default HospitalSearchMap;
