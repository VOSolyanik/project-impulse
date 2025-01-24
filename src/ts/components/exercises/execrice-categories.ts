import { getFilters } from '@/api/filters.api';
import { Filter } from '@/types/filters';

class ExerciseCategories {
  private containerElement: HTMLElement;
  private category: string = '';
  private onCategoryChangeCallback?: (category: string) => void;

  constructor(containerElement: HTMLElement, category: string) {
    this.containerElement = containerElement;
    this.category = category;
    this.loadData();
  }

  setCategory(category: string): void {
    this.category = category;
    this.loadData();
  }

  async loadData(): Promise<void> {
    console.log('Load Exercises Categories');
    const filters = await getFilters({ filter: this.category });
    console.log('Loaded Exercises Categories', filters);
    this.render(filters.results);
  }

  render(categories: Filter[]): void {
    this.containerElement.innerHTML = ''; // Очищуємо контейнер перед рендером
    categories.forEach(category => {
      const categoryItem = `
        <div class="exercise-category-card">
          <img
            class="exercise-category-image"
            src="${category.imgURL}"
            alt="${category.name}"
          />
          <div class="exercise-category-overlay">
            <h3 class="exercise-category-title">${category.name}</h3>
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
