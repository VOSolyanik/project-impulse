import { DOTS, VISIBLE_PAGES } from "./constants";
import { PaginationView } from "./pagination.view";

type PageChangeCallback = (page: number, itemsPerPage: number) => void;

export class Pagination {
  private view!: PaginationView;
  private listeners: (PageChangeCallback)[] = [];

  constructor(
    container: HTMLElement,
    private totalPages: number,
    private itemsPerPage: number,
    private currentPage: number = 1
  ) {
    this.view = new PaginationView(container, this);

    this.view.render();
  }

  setPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.notifyListeners();
  }

  setTotalPages(totalPages: number): void {
    this.totalPages = totalPages;
    this.view.render();
  }

  nextPage(): void {
    this.setPage(this.currentPage + 1);
  }

  prevPage(): void {
    this.setPage(this.currentPage - 1);
  }

  lastPage(): void {
    this.setPage(this.totalPages);
  }

  firstPage(): void {
    this.setPage(1);
  }

  getPages(): (number | string)[] {
    if (this.totalPages <= 1) return [];

    const pages: (number | string)[] = [];

    if (this.totalPages <= VISIBLE_PAGES) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (this.currentPage > VISIBLE_PAGES - 1) {
        pages.push(DOTS);
      }
      const start = Math.max(1, Math.min(this.currentPage - 1, this.totalPages - VISIBLE_PAGES + 1));
      const end = Math.min(this.totalPages, Math.max(this.currentPage + 1, VISIBLE_PAGES));

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (this.currentPage < this.totalPages - 1) {
        pages.push(DOTS);
      }
    }
    return pages;
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  getTotalPages(): number {
    return this.totalPages;
  }

  clear(): void {
    this.view.clear();
  }

  onPageChange(listener: PageChangeCallback): void {
    this.listeners.push(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this.currentPage, this.itemsPerPage));
    this.view.render();
  }
}