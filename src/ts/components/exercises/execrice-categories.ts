import { getFilters } from '@/api/filters.api';
import { Filter } from '@/types/filters';
import { Pagination } from '@/components/pagination';

class ExerciseCategories {
  private containerElement: HTMLElement;
  private category: string = '';
  private onCategoryChangeCallback?: (category: string) => void;
  private pagination?: Pagination;

  constructor(
    containerElement: HTMLElement,
    category: string,
    private itemsPerPage: number,
    private paginationContainer: HTMLElement
  ) {
    this.containerElement = containerElement;
    this.category = category;
    this.loadData(1, this.itemsPerPage);
  }

  setCategory(category: string): void {
    this.category = category;
    this.pagination = undefined;
    this.loadData(1, this.itemsPerPage);
  }

  async loadData(
    currentPage: number | undefined = undefined,
    itemsPerPage: number | undefined = undefined
  ): Promise<void> {
    const filters = await getFilters({
      filter: this.category,
      page: currentPage,
      limit: itemsPerPage,
    });
    if (!this.pagination) {
      this.pagination = new Pagination(
        this.paginationContainer,
        filters.totalPages,
        filters.perPage
      );
      this.pagination.onPageChange((page, itemsPerPage) => {
        this.loadData(page, itemsPerPage);
      });
    }

    this.render(filters.results);
  }

  render(categories: Filter[]): void {
    this.containerElement.innerHTML = ''; // Очищуємо контейнер перед рендером
    categories.forEach(category => {
      if (!category.name) {
        return;
      }
      const name =
        category.name.charAt(0).toUpperCase() + category.name.slice(1);

      const categoryItem = `
        <div class="exercise-category-card">
          <img
            class="exercise-category-image"
            src="${category.imgURL}"
            alt="${category.name}"
          />
          <div class="exercise-category-overlay">
            <h3 class="exercise-category-title">${name}</h3>
            <p class="exercise-category-subtitle">${category.filter}</p>
          </div>
        </div>`;
      this.containerElement.innerHTML += categoryItem;
    });
  }

  onCategoryChange(callback: (category: string) => void): void {
    this.onCategoryChangeCallback = callback;
  }
}

export default ExerciseCategories;
