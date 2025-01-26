import { Pagination } from "./pagination";
import { DOTS, FIRST_PAGE, LAST_PAGE, NEXT_PAGE, PREV_PAGE, VISIBLE_PAGES } from "./constants";
import spriteUrl from "../../../images/sprite.svg";

export class PaginationView {
  constructor(
    private container: HTMLElement,
    private pagination: Pagination
  ) {
    this.initListeners();
  }

  render(): void {
    this.container.innerHTML = "";

    const pages = this.pagination.getPages();
    const currentPage = this.pagination.getCurrentPage();
    const totalPages = this.pagination.getTotalPages();
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;


    let template = "";

    // Add "First" and "Previous" buttons
    if (pages.length > VISIBLE_PAGES) {
      template += this.createPageTemplate(FIRST_PAGE, isFirstPage);
      template += this.createPageTemplate(PREV_PAGE, isFirstPage);
    }

    pages.forEach((page) => {
      if (typeof page === "number") {
        template += this.createPageTemplate(page, false, page === currentPage);
      } else {
        template += this.createPageTemplate(page, true);
      }
    });

    // Add "Next" and "Last" buttons
    if (pages.length > VISIBLE_PAGES) {
      template += this.createPageTemplate(NEXT_PAGE, isLastPage);
      template += this.createPageTemplate(LAST_PAGE, isLastPage);
    }

    this.container.innerHTML = `<ul class="pagination">${template}</ul>`;
  }

  clear(): void {
    this.container.innerHTML = "";
  }

  private initListeners(): void {
    this.container.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const btn = target.closest<HTMLElement>(".page-btn");
      if (btn) {
        if (btn.dataset.page === PREV_PAGE) {
          this.pagination.prevPage();
        } else if (btn.dataset.page === NEXT_PAGE) {
          this.pagination.nextPage();
        } else if (btn.dataset.page === FIRST_PAGE) {
          this.pagination.firstPage();
        } else if (btn.dataset.page === LAST_PAGE) {
          this.pagination.lastPage();
        } else {
          this.pagination.setPage(+btn.dataset.page!);
        }
      }
    });
  }

  private createPageTemplate(
    page: number | string,
    isDisabled: boolean = false,
    isActive: boolean= false
  ): string {
    const cssClasses = [];
    if (isActive) {
      cssClasses.push("page-btn--active");
    }
    if (typeof page === "string") {
      cssClasses.push(`page-btn--${page}`);
    }
    return `<li class="pagination__item">
      <button class="page-btn ${cssClasses.join(" ")}" ${isDisabled ? 'disabled="disabled"' : ''} data-page="${page}">${this.createPageContent(page)}</button>
    </li>`;
  }

  private createPageContent(page: number | string): string {
    if (typeof page === "number") {
      return page.toString();
    }
    if (page === DOTS) {
      return "...";
    }
    const icon = ({
      [FIRST_PAGE]: "icon-arw-2-left",
      [LAST_PAGE]: "icon-arw-2-right",
      [PREV_PAGE]: "icon-arw-left",
      [NEXT_PAGE]: "icon-arw-right",
    })[page] as string;
    return `<svg class="page-icon"><use href="${spriteUrl}#${icon}"></use></svg>`;
  }
}