import { Exercise } from '@/types/exercise';
import { getExercises } from '@/api/exercises.api';
import { ExerciseItems } from './exercise-items';

export class FavoritesExerciseItems extends ExerciseItems {
  private allItems: Exercise[] = [];

  constructor(
    protected containerElement: HTMLElement,
    private ids: string[],
    emptyStateMessage: string = 'No favorite exercises found',
  ) {
    super(containerElement, true, emptyStateMessage);
    this.loadData();
  }

  setFavoriteIds(ids: string[]): void {
    this.ids = ids;
    const favSet = new Set(ids);
    const favorite = this.allItems.filter(item => favSet.has(item._id));
    this.render(favorite);
  }

  private async loadData(): Promise<void> {
    try {
      const result = await getExercises({
        page: 1,
        limit: 999999
      });

      this.allItems = result.results;
      this.setFavoriteIds(this.ids);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }
}
