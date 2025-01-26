
import { favoritesState } from "@/favorites-state";
import { getExerciseById } from "@/api/exercises.api";
import { FavoritesExerciseItems } from "@/components/exercises/favorites-exercise-items";
import { ExerciseModal } from "@/components/modal/exercise-modal";

const exerciseItemsContainer = document
    .querySelector<HTMLElement>('.exercise-cards-list');

exerciseItemsContainer!.classList.add('custom-scroll-bar');

const exerciseItems = new FavoritesExerciseItems(
  exerciseItemsContainer!,
  favoritesState.gerFavorites(),
  `It appears that you haven't added any exercises to your favorites yet. To get started, you can add exercises that you like to your favorites for easier access in the future.`
);


const modal = new ExerciseModal('#exercise-modal-content');

exerciseItems.onExerciseDelete((id) => {
  favoritesState.removeFavorite(id);
  exerciseItems.setFavoriteIds(favoritesState.gerFavorites());
})

exerciseItems.onExerciseSelect(async id => {
  const exercise = await getExerciseById(id);
  modal.show(exercise);
});

modal.onFavoriteToggle(() => {
  exerciseItems.setFavoriteIds(favoritesState.gerFavorites());
});