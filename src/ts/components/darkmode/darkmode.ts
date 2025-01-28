export class DarkMode {
  private static readonly LOCAL_STORAGE_KEY = 'isDarkMode';
  private static readonly darkModeClass = 'dark-mode';
  private toggleElements: NodeListOf<HTMLElement>;

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
      document.body.classList.add(DarkMode.darkModeClass);
      this.updateButtonsState(true);
    }

    this.toggleElements.forEach(button =>
      button.addEventListener('click', () => this.toggleDarkMode())
    );
  }

  private getDarkModePreference(): boolean {
    return localStorage.getItem(DarkMode.LOCAL_STORAGE_KEY) === 'true';
  }

  private toggleDarkMode(): void {
    const isDarkMode = document.body.classList.contains(DarkMode.darkModeClass);

    if (isDarkMode) {
      document.body.classList.remove(DarkMode.darkModeClass);
      this.updateButtonsState(false);
      localStorage.setItem(DarkMode.LOCAL_STORAGE_KEY, 'false');
    } else {
      document.body.classList.add(DarkMode.darkModeClass);
      this.updateButtonsState(true);
      localStorage.setItem(DarkMode.LOCAL_STORAGE_KEY, 'true');
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
