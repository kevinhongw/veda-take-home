import React, { useEffect, useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useHospitals } from 'hooks/useHospitals';
import HospitalMap from './HospitalMap';
import SearchInput from './SearchInput';
import Filter from './Filter';

type Filters = {
  rating: string[];
  hasER: string[]; // should be a boolean
  meetsEHRCriteria: string[];
};

type DisplayFilterConfig = {
  name: string;
  options: any[];
  values: any[];
  onChange: (value: string) => void;
};

type FilterFields = keyof Filters;

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

  const displayFilters: DisplayFilterConfig[] = [
    {
      name: 'Rating',
      options: ['1', '2', '3', '4', '5'],
      values: filters?.rating || [],
      onChange: (value: string) => handleFilterChange('rating', value),
    },
    {
      name: 'Has ER',
      options: ['Yes', 'No'],
      values: filters?.hasER || [],
      onChange: (value: string) => handleFilterChange('hasER', value),
    },
    {
      name: 'Meets EHR criteria',
      options: ['Yes', 'No'],
      values: filters?.meetsEHRCriteria || [],
      onChange: (value: string) => handleFilterChange('meetsEHRCriteria', value),
    },
  ];

  const filterHospitals = () => {
    let result = [...(hospitals || [])];

    console.log(filters);

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
      <Grid md={12}>
        <SearchInput onSearch={handleOnSearch} />
      </Grid>
      <Grid md={3}>
        {displayFilters.map((filterConfig) => (
          <Filter
            key={filterConfig.name}
            name={filterConfig.name}
            options={filterConfig.options}
            values={filterConfig.values}
            onChange={filterConfig.onChange}
          />
        ))}
      </Grid>
      <Grid xs={9}>
        <HospitalMap data={filteredHospitals} isLoading={loading} />
      </Grid>
    </Grid>
  );
};

export default HospitalSearchMap;
