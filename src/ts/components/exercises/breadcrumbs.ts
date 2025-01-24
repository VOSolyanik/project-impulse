type BreadCrumbConfig = {
  filtersListElement: HTMLElement[];
  displayCategoryElement: HTMLElement;
  searchElement: HTMLElement;
};

class Breadcrumbs {
  private config: BreadCrumbConfig;
  private currentCategory: string = '';
  private onFilterChangeCallback?: (category: string) => void;

  constructor(config: BreadCrumbConfig) {
    this.config = config;
    this.init();
  }

  init(): void {
    // Set default category
    this.currentCategory = 'Muscles'; // наприклад, початкова категорія
    this.render();

    this.config.filtersListElement.forEach((elem: HTMLElement) => {
      elem.addEventListener('click', event => {
        const target = event.target as HTMLElement;

        if (target) {
          this.config.filtersListElement.forEach(listElement => {
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
    // Логіка для оновлення UI, наприклад, виділити активний фільтр
    // const filters = this.config.filtersListElement.querySelectorAll('.filter');
    // filters.forEach(filter => {
    //   const filterElement = filter as HTMLElement;
    //   filterElement.classList.toggle(
    //     'active',
    //     filterElement.dataset.category === this.currentCategory
    //   );
    // });
  }
}

export default Breadcrumbs;
