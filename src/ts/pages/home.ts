import Breadcrumbs from '@/components/exercises/breadcrumbs';
import ExerciseCategories from '@/components/exercises/exercise-categories';
import { FilterCategory } from '@/enums/filter-category';
import {
  getUrlParams,
  removeUrlParam,
  setUrlParams,
} from '@/helpers/urlParams';

const { categoryPage, category, filter } = getUrlParams();

const categoryFiltersElement = document.querySelector<HTMLElement>(
  '.js-category-filters'
);

const breadcrumbsElement =
  document.querySelector<HTMLElement>('.js-breadcrumbs');

const searchBar = document.querySelector<HTMLElement>('#search');

const exercisesCategoriesGallery = document.querySelector<HTMLElement>(
  '.exercise-categories-list'
);

const paginationContainer = document.querySelector<HTMLElement>(
  '.pagination-wrapper'
);

const breadcrumbs = new Breadcrumbs(
  {
    categoryFiltersElement: categoryFiltersElement!,
    breadcrumbsElement: breadcrumbsElement!,
    searchElement: searchBar!,
  },
  filter || FilterCategory.Muscles
);

if (category) {
  breadcrumbs.setFilter(category);
}

const pageSize = 12; // TODO: Set ,to 9 on mobile

const exerciseCategories = new ExerciseCategories(
  exercisesCategoriesGallery!,
  filter || breadcrumbs.getCategory(),
  pageSize,
  paginationContainer!,
  parseInt(categoryPage) || 1
);

breadcrumbs.onFilterChange(category => {
  setUrlParams({ filter: category });
  removeUrlParam('category');
  removeUrlParam('categoryPage');
  exerciseCategories.setCategory(category);
});

exerciseCategories.onCategoryChange(category => {
  setUrlParams({ category: category });
  // removeUrlParam('categoryPage'); TODO: add back when excersises are added to remove category pagination and use excercise pagination
  breadcrumbs.setFilter(category);
});
