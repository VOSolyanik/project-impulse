import { getExerciseById } from '@/api/exercises.api';
import { ExerciseCategories } from '@/components/exercises/exercise-categories';
import { ExercisesFilters } from '@/components/exercises/exercises-filters';
import { HomeExerciseItems } from '@/components/exercises/home-exercise-items';
import { ExerciseModal } from '@/components/modal/exercise-modal';
import { ExerciseRatingModal } from '@/components/modal/rating-modal';
import { SubscriptionForm } from '@/components/subscription-form';
import { FilterCategory } from '@/enums/filter-category';
import { Exercise, ExercisesParams } from '@/types/exercise';
import { isMobileScreen } from '@/utils/screen-size';

const EMPTY_STATE_MESSAGE = `It appears that there are no any exercises for selected filters.
Try to change filters or search criteria.`;

const filters = initFilters();

const exerciseCategories = initCategories();

const exerciseItems = initItems();

initSubscriptionForm();

const exerciseModal = new ExerciseModal('#exercise-modal-content');
const ratingModal = new ExerciseRatingModal('#exercise-rating-content');

const paramNmeMap: Record<FilterCategory, keyof ExercisesParams> = {
  [FilterCategory.Muscles]: 'muscles',
  [FilterCategory.Equipment]: 'equipment',
  [FilterCategory.BodyParts]: 'bodypart',
};

filters.onFilterChange((category, filter, search) => {
  if (!filter) {
    exerciseCategories.setFilter(category);
    exerciseItems.clear();
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

const openExerciseModal = (exercise: Exercise): void => {
  exerciseModal.show(exercise);
  exerciseModal.onRatingOpen(item => {
    ratingModal.show(item);
    ratingModal.onDialogClose(() => {
      openExerciseModal(exercise);
    });
  });
};

exerciseItems.onExerciseSelect(async id => {
  const exercise = await getExerciseById(id);
  openExerciseModal(exercise);
});

function initFilters(): ExercisesFilters {
  const categoryFiltersElement = document.querySelector<HTMLElement>(
    '.js-category-filters'
  );
  const breadcrumbsElement =
    document.querySelector<HTMLElement>('.js-breadcrumbs');
  const searchFormElement = document.querySelector<HTMLElement>('#search-form');
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

  const exerciseCategoriesContainer = document.querySelector<HTMLElement>(
    '.exercise-categories-list'
  );
  const exerciseCategoriesPaginationContainer =
    document.querySelector<HTMLElement>('.js-categories-pagination');

  return new ExerciseCategories(
    exerciseCategoriesContainer!,
    exerciseCategoriesPaginationContainer!,
    filters.getCategory(),
    pageSize
  );
}

function initItems(): HomeExerciseItems {
  const pageSize = isMobileScreen() ? 8 : 10;

  const exerciseItemsContainer = document.querySelector<HTMLElement>(
    '.exercise-cards-list'
  );
  const exerciseItemsPaginationContainer = document.querySelector<HTMLElement>(
    '.js-items-pagination'
  );

  return new HomeExerciseItems(
    exerciseItemsContainer!,
    exerciseItemsPaginationContainer!,
    pageSize,
    EMPTY_STATE_MESSAGE
  );
}

function initSubscriptionForm(): SubscriptionForm {
  const subscriptionFormElement =
    document.querySelector<HTMLFormElement>('.subscribe-form');
  return new SubscriptionForm(subscriptionFormElement!);
}
