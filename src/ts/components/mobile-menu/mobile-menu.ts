

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

  private onMenuClose(): void {
    this.config.menu.classList.remove('mobile-menu-open');
    this.config.menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  private onMenuOpen(): void {
    this.config.menu.classList.add('mobile-menu-open');
    this.config.menu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}