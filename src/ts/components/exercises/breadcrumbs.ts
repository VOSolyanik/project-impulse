import { FilterCategory } from '@/enums/filter-category';

type BreadCrumbConfig = {
  categoryFiltersElement: HTMLElement;
  breadcrumbsElement: HTMLElement;
  searchElement: HTMLElement;
};

class Breadcrumbs {
  private config: BreadCrumbConfig;
  private currentCategory: string = '';
  private currentFilter: string = '';
  private onFilterChangeCallback?: (category: string) => void;

  constructor(config: BreadCrumbConfig, currentCategory: string = '') {
    this.config = config;
    this.currentCategory = currentCategory;
    this.init();
  }

  private init(): void {
    this.render();
    this.addFilterClickListener();
  }

  private addFilterClickListener(): void {
    this.config.categoryFiltersElement.addEventListener('click', event => {
      const target = event.target as HTMLElement;

      if (target.classList.contains('js-filter-btn')) {
        this.clearActiveFilters();
        this.activateFilter(target);

        const dataType = target.dataset.type;
        if (!dataType) {
          console.error('No data type found.');
          return;
        }

        this.setCategory(dataType);
        this.onFilterChangeCallback?.(this.currentCategory);
      }
    });
  }

  private clearActiveFilters(): void {
    const buttonsElements =
      this.config.categoryFiltersElement.querySelectorAll<HTMLElement>(
        '.js-filter-btn'
      );
    buttonsElements.forEach(button => button.classList.remove('active'));
  }

  private activateFilter(target: HTMLElement): void {
    target.classList.add('active');
  }

  public onFilterChange(callback: (category: string) => void): void {
    this.onFilterChangeCallback = callback;
  }

  public setCategory(category: string): void {
    this.currentCategory = category;
    this.currentFilter = '';
    this.render();
  }

  public setFilter(filter: string): void {
    this.currentFilter = filter;
    this.render();
  }

  public getCategory(): string {
    return this.currentCategory;
  }

  private renderBreadcrumbs(): void {
    const splitter = this.config.breadcrumbsElement.querySelector(
      '#breadcrumbs-splitter'
    );
    const breadcrumbs =
      this.config.breadcrumbsElement.querySelector('.filter-value');

    if (splitter && breadcrumbs) {
      if (this.currentFilter !== '') {
        splitter.classList.remove('hidden');
        breadcrumbs.classList.remove('hidden');
        breadcrumbs.innerHTML = this.currentFilter;
      } else {
        splitter.classList.add('hidden');
        breadcrumbs.classList.add('hidden');
        breadcrumbs.innerHTML = '';
      }
    }
  }

  public render(): void {
    this.config.categoryFiltersElement.innerHTML = Object.values(FilterCategory)
      .map(value => {
        const isActive = value === this.currentCategory ? 'active' : '';
        const name = value.charAt(0).toUpperCase() + value.slice(1);
        return `
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
      })
      .join('');

    this.renderBreadcrumbs();
  }
}

export default Breadcrumbs;
