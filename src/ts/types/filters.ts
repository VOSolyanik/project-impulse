import { FilterCategory } from '../enums/filterCategory';
import PaginationParams from './params.api';

type Filter = {
  filter: FilterCategory;
  name: string;
  imgURL: string;
};

type GetFilterParams = PaginationParams & {
  category: string;
};

export { Filter, GetFilterParams };
