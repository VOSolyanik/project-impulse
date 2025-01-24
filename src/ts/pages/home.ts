console.log('This is home page');
import { Pagination } from '@/components/pagination';
import { getExercises } from '@/api/exersises.api';
import generateExerciseMarkup from '@components/exercises/exercisesold';
import generateFilterMarkup from '@/components/exercises/category-item';
import { getFilters } from '@/api/filters.api';
import { FilterCategory } from '@/enums/filter-category';
import Breadcrumbs from '@/components/exercises/breadcrumbs';

const container = document.querySelector<HTMLElement>('.pagination-wrapper');
const filtersContainer = Array.from(
  document.querySelectorAll<HTMLElement>('.js-filter-btn')
);
const filterElement = document.querySelector<HTMLElement>('.filter-value');
const searchBar = document.querySelector<HTMLElement>('#search');

console.log('filtersContainer', filtersContainer);
const pagination = new Pagination(container!, 5, 12);

const breadcrumps = new Breadcrumbs({
  filtersListElement: filtersContainer,
  displayCategoryElement: filterElement!,
  searchElement: searchBar!,
});

breadcrumps.onFilterChange(category => {
  console.log('Filter changed for category', category);
});

// generate filters
// const exercisesCategoryGalley = document.querySelector<HTMLElement>(
//   '.exercises-category-gallery'
// );
//
// if (exercisesCategoryGalley) {
//   const filters = getFilters({ filter: FilterCategory.Muscles }).then(data => {
//     console.log(data);
//   });
//   //   generateFilterMarkup();
// }
