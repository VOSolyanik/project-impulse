import { getFilters } from '@/api/filters.api';
import { Filter } from '@/types/filters';
import { Pagination } from '@/components/pagination';

class ExerciseCategories {
  private containerElement: HTMLElement;
  private category: string = '';
  private pagination?: Pagination;
  private onCategoryChangeCallback?: (category: string) => void;

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
    this.pagination = undefined; // Перевизначення пагінації
    this.loadData(1, this.itemsPerPage);
  }

  async loadData(
    currentPage: number = 1,
    itemsPerPage: number = this.itemsPerPage
  ): Promise<void> {
    try {
      const filters = await getFilters({
        filter: this.category,
        page: currentPage,
        limit: itemsPerPage,
      });

      this.setupPagination(filters.totalPages, filters.perPage);
      this.render(filters.results);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  private setupPagination(totalPages: number, perPage: number): void {
    if (!this.pagination) {
      this.pagination = new Pagination(
        this.paginationContainer,
        totalPages,
        perPage
      );
      this.pagination.onPageChange((page, itemsPerPage) => {
        this.loadData(page, itemsPerPage);
      });
    }
  }

  private createCategoryItem(category: Filter): string {
    const name = category.name
      ? category.name.charAt(0).toUpperCase() + category.name.slice(1)
      : '';

    return `
      <li class="exercise-category-card">
        <img
          class="exercise-category-image"
          src="${category.imgURL}"
          alt="${category.name || 'No name'}"
        />
        <div class="exercise-category-overlay" data-type="${name}">
          <h3 class="exercise-category-title">${name}</h3>
          <p class="exercise-category-subtitle">${category.filter}</p>
        </div>
      </li>
    `;
  }

  render(categories: Filter[]): void {
    this.containerElement.innerHTML = categories
      .filter(category => category.name) // Фільтруємо об'єкти без назви
      .map(this.createCategoryItem) // Генеруємо HTML для кожного елемента
      .join('');

    this.addClickEvent();
  }

  private addClickEvent(): void {
    this.containerElement.addEventListener('click', event => {
      const target = event.target as HTMLElement;
      const dataType = target.closest('[data-type]')?.getAttribute('data-type');
      if (this.onCategoryChangeCallback && dataType) {
        this.onCategoryChangeCallback(dataType);
      }
    });
  }

  onCategoryChange(callback: (category: string) => void): void {
    this.onCategoryChangeCallback = callback;
  }
}

export default ExerciseCategories;
