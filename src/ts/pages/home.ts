import { FilterCategory } from '@/enums/filter-category';
import { ExercisesParams } from '@/types/exercise';
import { getExerciseById } from '@/api/exercises.api';
import { isMobileScreen } from '@/utils/is-mobile-screen';
import { ExercisesFilters } from '@/components/exercises/exercises-filters';
import { ExerciseCategories } from '@/components/exercises/exercise-categories';
import { HomeExerciseItems } from '@/components/exercises/home-exercise-items';
import { SubscriptionForm } from '@/components/subscription-form';
import { ExerciseModal } from '@/components/modal/exercise-modal';

const filters = initFilters();

const exerciseCategories = initCategories();

const exerciseItems = initItems();

const form = initForm()

const modal = new ExerciseModal('#exercise-modal-content');

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

exerciseItems.onExerciseSelect(async id => {
  const exercise = await getExerciseById(id);
  modal.show(exercise);
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
  const pageSize = isMobileScreen() ? 9 : 12;

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
  const pageSize = isMobileScreen() ? 8 : 10;

  const exerciseItemsContainer = document
    .querySelector<HTMLElement>('.exercise-cards-list');
  const exerciseItemsPaginationContainer = document
    .querySelector<HTMLElement>('.js-items-pagination');

  return new HomeExerciseItems(
    exerciseItemsContainer!,
    exerciseItemsPaginationContainer!,
    pageSize,
    `It appears that there are no any exercises for selected filters. Try to change filters or search criteria.`
  );
}

function initForm(): SubscriptionForm {
  const subscriptionFormElement = document.querySelector<HTMLFormElement>('.subscribe-form')
  return new SubscriptionForm(subscriptionFormElement!);
}
