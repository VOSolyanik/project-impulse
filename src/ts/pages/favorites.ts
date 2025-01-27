import { getExerciseById } from '@/api/exercises.api';
import { FavoritesExerciseItems } from '@/components/exercises/favorites-exercise-items';
import { ExerciseModal } from '@/components/modal/exercise-modal';
import { ExerciseRatingModal } from '@/components/modal/rating-modal';
import { favoritesState } from '@/favorites-state';
import { Exercise } from '@/types/exercise';
import { initializeScrollToTopButton } from '@/utils/scroll-to-top';

const EMPTY_STATE_MESSAGE = `It appears that you haven't added any exercises to your favorites yet.
To get started, you can add exercises that you like to your favorites for easier access in the future.`;

const exerciseItemsContainer = document.querySelector<HTMLElement>(
  '.exercise-cards-list'
);

exerciseItemsContainer!.classList.add('custom-scroll-bar');

const exerciseItems = new FavoritesExerciseItems(
  exerciseItemsContainer!,
  favoritesState.gerFavorites(),
  EMPTY_STATE_MESSAGE
);

const exerciseModal = new ExerciseModal('#exercise-modal-content');
const ratingModal = new ExerciseRatingModal('#exercise-rating-content');

exerciseItems.onExerciseDelete(id => {
  favoritesState.removeFavorite(id);
  exerciseItems.setFavoriteIds(favoritesState.gerFavorites());
});

const openExerciseModal = async (exercise: Exercise) => {
  exerciseModal.show(exercise);
  exerciseModal.onRatingOpen(item => {
    debugger;
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

exerciseModal.onFavoriteToggle(() => {
  exerciseItems.setFavoriteIds(favoritesState.gerFavorites());
});

initializeScrollToTopButton();
