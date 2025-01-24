import { FilterCategory } from '@/enums/filter-category';

type BreadCrumbConfig = {
  filtersListElement: HTMLElement;
  displayCategoryElement: HTMLElement;
  searchElement: HTMLElement;
};
class Breadcrumbs {
  private config: BreadCrumbConfig;
  private currentCategory: string = '';
  private onFilterChangeCallback?: (category: string) => void;

  constructor(config: BreadCrumbConfig, currentCategory: string = '') {
    this.config = config;
    this.currentCategory = currentCategory;
    this.init();
  }

  init(): void {
    this.render();
    this.config.filtersListElement.addEventListener('click', event => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('js-filter-btn')) {
        const buttonsElements =
          this.config.filtersListElement.querySelectorAll<HTMLElement>(
            '.js-filter-btn'
          );
        buttonsElements.forEach(listElement => {
          listElement.classList.remove('active');
        });
        target.classList.add('active');
        const dataType = target.dataset.type;
        if (!dataType) {
          console.error('No data type found.');
          return;
        }
        this.setCategory(target.dataset.type!);
        if (this.onFilterChangeCallback) {
          this.onFilterChangeCallback(this.currentCategory);
        }
      }
    });
  }

  onFilterChange(callback: (category: string) => void): void {
    this.onFilterChangeCallback = callback;
  }

  setCategory(category: string): void {
    this.currentCategory = category;
    this.render();
  }

  getCategory(): string {
    return this.currentCategory;
  }

  render(): void {
    this.config.filtersListElement.innerHTML = '';
    Object.values(FilterCategory).forEach(value => {
      const isActive = value === this.currentCategory ? 'active' : '';
      const name = value.charAt(0).toUpperCase() + value.slice(1);
      this.config.filtersListElement.innerHTML += `
        <li>
        <button
          class="filter-btn js-filter-btn ${isActive}"
          data-type="${value}"
          type="button"
        >
          ${name}
        </button>
      </li>
      `;
    });
  }
}

export default Breadcrumbs;
