

type MobileMenuConfig = {
  openMenuBtn: HTMLElement;
  closeMenuBtn: HTMLElement;
  menu: HTMLElement;
  backdrop?: HTMLElement;
}

export class MobileMenu {
  constructor(private readonly config: MobileMenuConfig) {
    this.init();
  }

  init(): void {
    this.toggleItemsVisibility(false);

    this.config.openMenuBtn?.addEventListener('click', () => {
      this.onMenuOpen();
    });

    this.config.closeMenuBtn?.addEventListener('click', () => {
      this.onMenuClose();
    });

    this.config.backdrop?.addEventListener('click', () => {
      this.onMenuClose();
    });
  }

  private toggleItemsVisibility(isVisible: boolean): void {
    this.config.menu.setAttribute('aria-hidden',  isVisible ? 'false' : 'true');
    this.config.menu.querySelectorAll('button, a').forEach((element) => {
      element.setAttribute('tabindex', isVisible ? '0' : '-1');
      element.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
    })
  }

  private onMenuClose(): void {
    this.config.menu.classList.remove('mobile-menu-open');
    this.toggleItemsVisibility(false)
    document.body.style.overflow = '';
  }

  private onMenuOpen(): void {
    this.config.menu.classList.add('mobile-menu-open');
    this.toggleItemsVisibility(true)
    document.body.style.overflow = 'hidden';
  }
}