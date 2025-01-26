
import { FavoritesExerciseItems } from "@/components/exercises/favorites-exercise-items";
import { favoritesState } from "@/components/favorites/favorites-state";

const exerciseItemsContainer = document
    .querySelector<HTMLElement>('.exercise-cards-list');

const exerciseItems = new FavoritesExerciseItems(
  exerciseItemsContainer!,
  favoritesState.gerFavorites()
);

exerciseItems.onExerciseDelete((id) => {
  favoritesState.removeFavorite(id);
  exerciseItems.setFavoriteIds(favoritesState.gerFavorites());
})