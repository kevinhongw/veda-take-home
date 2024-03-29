import React from 'react';

import type { Filters, FilterFields } from 'components/HospitalSearchMap';
import Filter from 'components/Filter';

type DisplayFilterConfig = {
  name: string;
  options: string[];
  field: FilterFields;
};

type Props = {
  filters: Filters;
  onChange: (field: FilterFields, value: string) => void;
};

const FilterGroups: React.FC<Props> = ({ filters, onChange }) => {
  const displayFilters: DisplayFilterConfig[] = [
    {
      name: 'Rating',
      options: ['5', '4', '3', '2', '1'],
      field: 'rating',
    },
    {
      name: 'Has ER',
      options: ['Yes', 'No'],
      field: 'hasER',
    },
    {
      name: 'Meets EHR criteria',
      options: ['Yes', 'No'],
      field: 'meetsEHRCriteria',
    },
    {
      name: 'Hospital Type',
      options: [
        'Acute Care Hospitals',
        'Acute Care - Department of Defense',
        'Childrens',
        'Critical Access Hospitals',
      ],
      field: 'hospitalType',
    },
    {
      name: 'Timeliness of care',
      options: [
        'Above the national average',
        'Same as the national average',
        'Below the national average',
        'Not Available',
      ],
      field: 'timelinessOfCare',
    },

    {
      name: 'Safety of care',
      options: [
        'Above the national average',
        'Same as the national average',
        'Below the national average',
        'Not Available',
      ],
      field: 'safetyOfCare',
    },
  ];
  return (
    <>
      {displayFilters.map((filterConfig) => (
        <Filter
          key={filterConfig.name}
          name={filterConfig.name}
          options={filterConfig.options}
          values={filters[filterConfig.field]}
          onChange={(value: string) => onChange(filterConfig.field, value)}
        />
      ))}
    </>
  );
};

export default FilterGroups;
