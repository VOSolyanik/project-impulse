import { FilterCategory } from '../enums/filter-сategory';
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
