import { useQuery } from '@tanstack/react-query';
import hospitalsData from 'data/hospitals.json';

export const useHospitals = () => {
  const getHospitals = async () => {
    // TODO: replace with API endpoint
    return hospitalsData as Hospital[];
  };

  return useQuery({ queryKey: ['hostpitals'], queryFn: getHospitals });
};
