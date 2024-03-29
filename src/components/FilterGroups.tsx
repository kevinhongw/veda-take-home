import React from 'react';

import type { Filters, FilterFields } from 'components/HospitalSearchMap';
import Filter from 'components/Filter';

type DisplayFilterConfig = {
  name: string;
  options: string[];
  values: string[];
  onChange: (value: string) => void;
};

type Props = {
  filters: Filters;
  onChange: (field: FilterFields, value: string) => void;
};

const FilterGroups: React.FC<Props> = ({ filters, onChange }) => {
  const displayFilters: DisplayFilterConfig[] = [
    {
      name: 'Rating',
      options: ['1', '2', '3', '4', '5'],
      values: filters?.rating || [],
      onChange: (value: string) => onChange('rating', value),
    },
    {
      name: 'Has ER',
      options: ['Yes', 'No'],
      values: filters?.hasER || [],
      onChange: (value: string) => onChange('hasER', value),
    },
    {
      name: 'Meets EHR criteria',
      options: ['Yes', 'No'],
      values: filters?.meetsEHRCriteria || [],
      onChange: (value: string) => onChange('meetsEHRCriteria', value),
    },
  ];
  return (
    <>
      {displayFilters.map((filterConfig) => (
        <Filter
          key={filterConfig.name}
          name={filterConfig.name}
          options={filterConfig.options}
          values={filterConfig.values}
          onChange={filterConfig.onChange}
        />
      ))}
    </>
  );
};

export default FilterGroups;
