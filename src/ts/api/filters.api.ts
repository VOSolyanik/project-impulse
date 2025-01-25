import { yourEnergyApi } from './base';
import { Filter, GetFilterParams } from '@/types/filters';
import { PaginatedResponse } from '@/types/pagination';

const getFilters = async (
  params: GetFilterParams
): Promise<PaginatedResponse<Filter>> => {
  const response = await yourEnergyApi.get<PaginatedResponse<Filter>>(
    '/filters',
    {
      params,
    }
  );
  return response.data;
};

export { getFilters };
