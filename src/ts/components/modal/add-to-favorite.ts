import { Exercise } from '../../types/exercise';

const FAVORITE_KEY = 'favoriteExcercise';

export class AddToFavorite {
  constructor() {}

  static addFavorite(id: string): void {
    const favoriteArray = AddToFavorite.getAllFavorites();
    favoriteArray.push(id);
    localStorage.setItem(FAVORITE_KEY, JSON.stringify(favoriteArray));
  }

  static removeFavorite(id: string): void {
    const favoriteArray = AddToFavorite.getAllFavorites();
    localStorage.setItem(
      FAVORITE_KEY,
      JSON.stringify(favoriteArray.filter(idSaved => idSaved !== id))
    );
  }
  static hasFavorite(id: string): boolean {
    const favoriteArray = AddToFavorite.getAllFavorites();
    return favoriteArray.includes(id);
  }
  static getAllFavorites(): Exercise['_id'][] {
    return JSON.parse(localStorage.getItem(FAVORITE_KEY) || '[]');
  }
}
