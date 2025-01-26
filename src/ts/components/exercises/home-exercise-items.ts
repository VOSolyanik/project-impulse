import { ExercisesParams } from '@/types/exercise';
import { getExercises } from '@/api/exercises.api';
import { Pagination } from '@/components/pagination';
import { ExerciseItems } from './exercise-items';

export class HomeExerciseItems extends ExerciseItems {
  private params: ExercisesParams = {};
  private pagination?: Pagination;

  constructor(
    protected containerElement: HTMLElement,
    private paginationContainer: HTMLElement,
    private itemsPerPage: number,
    emptyStateMessage: string = 'No exercises found',

  ) {
    super(containerElement, false, emptyStateMessage);
  }

  setParams(params: ExercisesParams): void {
    this.params = params;
    this.loadData(1, this.itemsPerPage);
  }

  clear(): void {
    super.clear();
    this.pagination?.clear();
  }

  private async loadData(
    page: number = 1,
    itemsPerPage: number = this.itemsPerPage
  ): Promise<void> {
    try {
      const result = await getExercises({
        ...this.params,
        page,
        limit: itemsPerPage,
      });

      this.updatePagination(result.totalPages, result.page, result.perPage);
      this.render(result.results);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  private updatePagination(totalPages: number, page: number, perPage: number): void {
    if (!this.pagination) {
      this.pagination = new Pagination(
        this.paginationContainer,
        totalPages,
        perPage
      );
      this.pagination.onPageChange((page, itemsPerPage) => {
        this.loadData(page, itemsPerPage);
      });
    } else {
      this.pagination.setTotalPages(totalPages);
      this.pagination.setPage(page);
    }
  }
}
