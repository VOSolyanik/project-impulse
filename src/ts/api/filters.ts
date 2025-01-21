import { axiosGoit } from './axiosConfig';
import { FilterResponse, Filter } from '../types/filters';

const getFilters = async (
  category: string,
  page: number = 1,
  limit: number = 100
): Promise<FilterResponse> => {
  const response = await axiosGoit.get<FilterResponse>('/filters', {
    params: {
      filter: category,
      page: page,
      limit: limit,
    },
  });
  return response.data;
};

export { getFilters };
