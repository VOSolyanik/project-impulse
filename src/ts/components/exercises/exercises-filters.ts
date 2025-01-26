import { FilterCategory } from '@/enums/filter-category';

type ExercisesFiltersConfig = {
  categoryFiltersElement: HTMLElement;
  breadcrumbsElement: HTMLElement;
  searchElement: HTMLElement;
  searchInputElement?: HTMLInputElement | null;
  searchResetElement?: HTMLButtonElement | null;
};

type FiltersChangeCallback = (category: FilterCategory, filter: string, search: string) => void;

export class ExercisesFilters {
  private currentFilter: string = '';
  private currentSearch: string = '';
  private onChangeCallback?: FiltersChangeCallback;

  constructor(
    private config: ExercisesFiltersConfig,
    private currentCategory: FilterCategory
  ) {
    this.config.searchInputElement = this.config.searchElement.querySelector('input');
    this.config.searchResetElement = this.config.searchElement.querySelector('button[type="reset"]');
    this.init();
  }

  public onFilterChange(callback: FiltersChangeCallback): void {
    this.onChangeCallback = callback;
  }

  public setCategory(category: FilterCategory): void {
    this.currentCategory = category;
    this.currentFilter = '';
    this.currentSearch = ''
    this.render();
    this.updateBreadcrumbs();
    this.updateSearchForm();
    this.emitChange();
  }

  public getCategory(): FilterCategory {
    return this.currentCategory;
  }

  public setFilter(filter: string): void {
    this.currentFilter = filter;
    this.updateBreadcrumbs();
    this.updateSearchForm();
    this.emitChange();
  }

  private setSearch(search: string): void {
    this.currentSearch = search;
    this.emitChange();
  }

  private init(): void {
    this.render();
    this.initListeners();
  }

  private initListeners(): void {
    this.config.categoryFiltersElement.addEventListener('click', event => {
      this.handleCategoryClick(event);
    });

    this.config.searchElement.addEventListener('submit', event => {
      this.handleSearchSubmit(event);
    });

    this.config.searchElement.addEventListener('reset', () => {
      this.handleSearchReset();
    });

    this.config.searchInputElement
      ?.addEventListener('input', event => {
        this.handleSearchInput(event);
      });
  }

  private emitChange(): void {
    this.onChangeCallback?.(this.currentCategory, this.currentFilter, this.currentSearch);
  }

  private handleCategoryClick(event: Event): void {
    const target = event.target as HTMLElement;

    if (target.classList.contains('js-filter-btn')) {

      const dataType = target.dataset.type as FilterCategory;
      if (!dataType) {
        console.error('No data type found.');
        return;
      }

      this.setCategory(dataType);
    }
  }

  private handleSearchSubmit(event: Event): void {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const search = formData.get('search') as string;
    this.setSearch(search);
  }

  private handleSearchReset(): void {
    if (this.currentSearch === '') return;

    this.setSearch('');
    this.updateSearchInput('');
  }

  private handleSearchInput(event: Event): void {
    this.updateSearchInput((event.target as HTMLInputElement).value);
  }

  private updateSearchForm(): void {
    if(this.currentFilter) {
      this.config.searchElement.classList.remove('hidden');
    } else {
      this.config.searchElement.dispatchEvent(new Event('reset'));
      this.config.searchElement.classList.add('hidden');
    }
  }

  private updateSearchInput(value: string): void {
    if(value) {
      this.config.searchResetElement?.classList.remove('hidden');
    } else {
      this.config.searchResetElement?.classList.add('hidden');
    }
  }

  private updateBreadcrumbs(): void {
    const splitterElement = this.config.breadcrumbsElement
    .querySelector('.breadcrumbs-splitter');
    const filterValueElement =
      this.config.breadcrumbsElement.querySelector('.filter-value');

    if (splitterElement && filterValueElement) {
      if (this.currentFilter !== '') {
        splitterElement.classList.remove('hidden');
        filterValueElement.classList.remove('hidden');
        filterValueElement.innerHTML = this.currentFilter;
      } else {
        splitterElement.classList.add('hidden');
        filterValueElement.classList.add('hidden');
        filterValueElement.innerHTML = '';
      }
    }
  }

  private render(): void {
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
  }
}
