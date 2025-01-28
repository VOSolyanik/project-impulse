import { Exercise } from '@/types/exercise';
import { getExercises } from '@/api/exercises.api';
import { Pagination } from '@/components/pagination';
import { ExerciseItems } from './exercise-items';

export class FavoritesExerciseItems extends ExerciseItems {
  private allItems: Exercise[] = [];
  private favorites: Exercise[] = [];
  private pagination?: Pagination;
  private currentPage: number = 1;
  private totalPages: number = 0;

  constructor(
    protected containerElement: HTMLElement,
    private paginationContainer: HTMLElement,
    private itemsPerPage: number | null,
    private ids: string[],
    emptyStateMessage: string = 'No favorite exercises found',
  ) {
    super(containerElement, true, emptyStateMessage);
    if (ids.length) {
      this.loadData();
    } else {
      this.renderEmptyState();
    }
  }

  setFavoriteIds(ids: string[]): void {
    this.ids = ids;
    if (this.itemsPerPage) {
      this.totalPages = Math.ceil(this.ids.length / this.itemsPerPage);
      this.currentPage = this.totalPages < this.currentPage
        ? this.totalPages : this.currentPage;
    }
    const favSet = new Set(ids);
    this.favorites = this.allItems.filter(item => favSet.has(item._id));
    this.updatePagination(this.totalPages, this.currentPage);
    this.renderWithPagination();
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

  private renderWithPagination(): void {
    this.render(this.favorites.slice((this.currentPage - 1) * (this.itemsPerPage ?? 999999), this.currentPage * (this.itemsPerPage ?? 999999)));
  }

  private updatePagination(totalPages: number, page: number): void {
    if (!this.itemsPerPage) return;

    if (!this.pagination) {
      this.pagination = new Pagination(
        this.paginationContainer,
        totalPages,
        this.itemsPerPage
      );
      this.pagination.onPageChange((page) => {
        this.currentPage = page;
        this.renderWithPagination();
      });
    } else {
      this.pagination.setTotalPages(totalPages);
      this.pagination.setPage(page);
    }
  }
}
