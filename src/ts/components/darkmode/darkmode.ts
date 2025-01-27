import { DarkModeConfig } from './constants';

export class DarkMode {
  private toggleElements: NodeListOf<HTMLElement>;
  private darkModeClass: string = DarkModeConfig.Class;
  private storageKey: string = DarkModeConfig.StorageKey;

  constructor(toggleSelector: string) {
    this.toggleElements = document.querySelectorAll(toggleSelector);

    if (this.toggleElements.length === 0) {
      throw new Error(`No elements found with selector "${toggleSelector}".`);
    }

    this.init();
  }

  private init(): void {
    const isDarkMode = this.getDarkModePreference();
    if (isDarkMode) {
      document.body.classList.add(this.darkModeClass);
      this.updateButtonsState(true);
    }

    this.toggleElements.forEach(button =>
      button.addEventListener('click', () => this.toggleDarkMode())
    );
  }

  private getDarkModePreference(): boolean {
    return localStorage.getItem(this.storageKey) === 'true';
  }

  private toggleDarkMode(): void {
    const isDarkMode = document.body.classList.contains(this.darkModeClass);

    if (isDarkMode) {
      document.body.classList.remove(this.darkModeClass);
      this.updateButtonsState(false);
      localStorage.setItem(this.storageKey, 'false');
    } else {
      document.body.classList.add(this.darkModeClass);
      this.updateButtonsState(true);
      localStorage.setItem(this.storageKey, 'true');
    }
  }

  private updateButtonsState(isDarkMode: boolean): void {
    this.toggleElements.forEach(button => {
      if (isDarkMode) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }
}
