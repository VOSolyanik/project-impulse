import { FilterCategory } from '@/enums/filter-category';
import Breadcrumbs from '@/components/exercises/breadcrumbs';
import ExerciseCategories from '@/components/exercises/exercise-categories';
import { SubscriptionForm } from '@/components/subscription-form';


const categoryFiltersElement =
  document.querySelector<HTMLElement>('.js-category-filters');
const breadcrumbsElement = document.querySelector<HTMLElement>('.js-breadcrumbs');
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
  FilterCategory.Muscles
);

const pageSize = 12; // TODO: Set to 9 on mobile

const exerciseCategories = new ExerciseCategories(
  exercisesCategoriesGallery!,
  breadcrumbs.getCategory(),
  pageSize,
  paginationContainer!
);

breadcrumbs.onFilterChange(category => {
  console.log('Filter changed for category', category);
  exerciseCategories.setCategory(category);
});

exerciseCategories.onCategoryChange(category => {
  console.log('exerciseCategories changed for category', category);
  breadcrumbs.setFilter(category);
});



const subscriptionFormElement = document.querySelector<HTMLFormElement>('.subscribe-form')
new SubscriptionForm(subscriptionFormElement!);
