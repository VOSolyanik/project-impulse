import { FilterCategory } from '../enums/filter-category';
import { PaginationParams } from './pagination';

type Filter = {
  filter: FilterCategory;
  name?: string;
  imgURL?: string;
};

type GetFilterParams = PaginationParams & {
  filter: string;
};

export { Filter, GetFilterParams };
