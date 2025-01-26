import { FilterCategory } from '@/enums/filter-category';
import { ExercisesParams } from '@/types/exercise';
import { ExercisesFilters } from '@/components/exercises/exercises-filters';
import { ExerciseCategories } from '@/components/exercises/exercise-categories';
import { HomeExerciseItems } from '@/components/exercises/home-exercise-items';
import { SubscriptionForm } from '@/components/subscription-form';
import { favoritesState } from '@/components/favorites/favorites-state';

const filters = initFilters();

const exerciseCategories = initCategories();

const exerciseItems = initItems();

const form = initForm()

const paramNmeMap: Record<FilterCategory, keyof ExercisesParams> = {
  [FilterCategory.Muscles]: 'muscles',
  [FilterCategory.Equipment]: 'equipment',
  [FilterCategory.BodyParts]: 'bodypart',
}

filters.onFilterChange((category, filter, search) => {
  if(!filter) {
    exerciseCategories.setFilter(category);
    exerciseItems.clear()
  } else {
    exerciseItems.setParams({
      [paramNmeMap[category]]: filter,
      keyword: search,
    });
    exerciseCategories.clear();
  }
});

exerciseCategories.onCategorySelect(category => {
  filters.setFilter(category);
});

exerciseItems.onExerciseSelect(id => {
  console.log('Selected exercise id:', id);
  if (favoritesState.isFavorite(id)) {
    favoritesState.removeFavorite(id);
  } else {
    favoritesState.addFavorite(id);
  }
  // TODO: Open dialog with exercise details
});

function initFilters(): ExercisesFilters {
  const categoryFiltersElement =
  document.querySelector<HTMLElement>('.js-category-filters');
  const breadcrumbsElement = document
    .querySelector<HTMLElement>('.js-breadcrumbs');
  const searchFormElement = document
    .querySelector<HTMLElement>('#search-form');
  return new ExercisesFilters(
    {
      categoryFiltersElement: categoryFiltersElement!,
      breadcrumbsElement: breadcrumbsElement!,
      searchElement: searchFormElement!,
    },
    FilterCategory.Muscles
  );
}

function initCategories(): ExerciseCategories {
  const pageSize = window.screen.width < 768 ? 9 : 12;

  const exerciseCategoriesContainer = document
    .querySelector<HTMLElement>('.exercise-categories-list');
  const exerciseCategoriesPaginationContainer = document
      .querySelector<HTMLElement>('.js-categories-pagination');

  return new ExerciseCategories(
    exerciseCategoriesContainer!,
    exerciseCategoriesPaginationContainer!,
    filters.getCategory(),
    pageSize,
  );
}

function initItems(): HomeExerciseItems {
  const pageSize = window.screen.width < 768 ? 8 : 10;

  const exerciseItemsContainer = document
    .querySelector<HTMLElement>('.exercise-cards-list');
  const exerciseItemsPaginationContainer = document
    .querySelector<HTMLElement>('.js-items-pagination');

  return new HomeExerciseItems(
    exerciseItemsContainer!,
    exerciseItemsPaginationContainer!,
    pageSize
  );
}

function initForm(): SubscriptionForm {
  const subscriptionFormElement = document.querySelector<HTMLFormElement>('.subscribe-form')
  return new SubscriptionForm(subscriptionFormElement!);
}
