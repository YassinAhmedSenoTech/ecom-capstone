import { useQuery } from '@tanstack/react-query';
import api from '../api/axiosConfig';

const fetchProducts = async () => {
  const { data } = await api.get('/products');
  return Array.isArray(data) ? data : data.products; 
};

export const useProducts = (params) => {
  return useQuery({
    queryKey: ['products', params], 
    queryFn: async () => {
      const { data } = await api.get('/products', { params }); 
      return data;
    },
    keepPreviousData: true 
  });
};
