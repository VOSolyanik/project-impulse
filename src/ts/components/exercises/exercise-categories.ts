import { getFilters } from '@/api/filters.api';
import { Filter } from '@/types/filters';
import { FilterCategory } from '@/enums/filter-category';
import { Pagination } from '@/components/pagination';

export class ExerciseCategories {
  private pagination?: Pagination;
  private onCategorySelectCallback?: (category: string) => void;

  constructor(
    private containerElement: HTMLElement,
    private paginationContainer: HTMLElement,
    private filter: FilterCategory,
    private itemsPerPage: number,
  ) {
    this.init();
  }

  setFilter(filter: FilterCategory): void {
    this.filter = filter;
    this.loadData();
  }

  clear(): void {
    this.containerElement.innerHTML = '';
    this.pagination?.clear();
  }

  onCategorySelect(callback: (category: string) => void): void {
    this.onCategorySelectCallback = callback;
  }

  private init(): void {
    this.loadData();
    this.initListeners();
  }

  private initListeners(): void {
    this.containerElement.addEventListener('click', event => {
      const target = event.target as HTMLElement;
      const dataType = target.closest('[data-type]')?.getAttribute('data-type');
      if (this.onCategorySelectCallback && dataType) {
        this.onCategorySelectCallback(dataType);
      }
    });
  }

  private async loadData(
    page: number = 1,
    itemsPerPage: number = this.itemsPerPage
  ): Promise<void> {
    try {
      const result = await getFilters({
        filter: this.filter,
        page,
        limit: itemsPerPage,
      });

      this.updatePagination(result.totalPages, +result.page, +result.perPage);
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
        debugger;
        this.loadData(page, itemsPerPage);
      });
    } else {
      this.pagination.setTotalPages(totalPages);
      this.pagination.setPage(page);
    }
  }

  private createCategoryItem(category: Filter): string {
    return `
      <li class="exercise-category-card" data-type="${category.name}">
        <img
          class="exercise-category-image"
          src="${category.imgURL}"
          alt="${category.name || 'No name'}"
        />
        <div class="exercise-category-overlay">
          <h3 class="exercise-category-title">${category.name}</h3>
          <p class="exercise-category-subtitle">${category.filter}</p>
        </div>
      </li>
    `;
  }

  private render(categories: Filter[]): void {
    this.containerElement.innerHTML = categories
      .filter(category => category.name) // Фільтруємо об'єкти без назви
      .map(this.createCategoryItem) // Генеруємо HTML для кожного елемента
      .join('');
  }
}
