class FavoritesState {
  private static readonly LOCAL_STORAGE_KEY = 'yourEnergy.favorites';

  private favorites: string[] = [];

  constructor() {
    this.getFromStorage();
  }

  gerFavorites(): string[] {
    return this.favorites;
  }

  addFavorite(id: string): void {
    this.favorites.push(id);
    this.setToStorage();
  }

  removeFavorite(id: string): void {
    this.favorites = this.favorites.filter((f) => f !== id);
    this.setToStorage();
  }

  isFavorite(id: string): boolean {
    return this.favorites.includes(id);
  }

  private setToStorage(): void {
    localStorage.setItem(FavoritesState.LOCAL_STORAGE_KEY, JSON.stringify(this.favorites));
  }

  private getFromStorage(): void {
    const favorites = localStorage.getItem(FavoritesState.LOCAL_STORAGE_KEY);
    if (favorites) {
      this.favorites = JSON.parse(favorites);
    }
  }
}

export const favoritesState = new FavoritesState();