import { FilterCategory } from '../enums/filter-category';
import { PaginationParams } from './pagination';

type Filter = {
  filter: FilterCategory;
  name: string;
  imgURL: string;
};

type GetFilterParams = PaginationParams & {
  category: string;
};

export { Filter, GetFilterParams };
