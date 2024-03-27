import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useHealthCheck = () => {
  const getHealthCheck = async () => {
    const response = await axios.get('http://localhost:4000/v1/health');

    return response.data;
  };

  return useQuery({ queryKey: ['health'], queryFn: getHealthCheck });
};
