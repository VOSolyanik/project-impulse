import { FilterCategory } from '../enums/filterCategory';

type FilterResponse = {
  page: number;
  perPage: number;
  totalPages: number;
  results: Filter[];
};
    
type Filter = {
  filter: FilterCategory;
  name: string;
  imgURL: string;
};

export { FilterResponse, Filter };
