import { Exercise } from '../../types/exercise';

const FAVORITE_KEY = 'favoriteExcercise';

export class AddToFavorite {
  private button: HTMLButtonElement;
  private buttonTitle!: HTMLElement;
  private buttonIcon!: SVGElement;
  private id!: Exercise['_id'];
  private hasFavorite: boolean = false;

  constructor(buttonElement: HTMLButtonElement) {
    this.button = buttonElement;
    this.buttonTitle = buttonElement.querySelector(
      '[data-favorite-title]'
    ) as HTMLElement;
    this.buttonIcon = buttonElement.querySelector(
      '[data-favorite-icon]'
    ) as SVGElement;

    buttonElement.addEventListener('click', this.handleFavorite);
  }

  public update(id: Exercise['_id']) {
    this.id = id;
    this.hasFavorite = AddToFavorite.hasFavorite(id);
    if (this.hasFavorite) {
      this.buttonTitle.innerHTML = 'Remove from favorites';
      this.buttonIcon.setAttribute('href', '/images/sprite.svg#icon-trash');
    } else {
      this.buttonTitle.innerHTML = 'Add to favorites';
      this.buttonIcon.setAttribute('href', '/images/sprite.svg#icon-heart');
    }
  }

  private handleFavorite = () => {
    if (this.hasFavorite) AddToFavorite.removeFavorite(this.id);
    else AddToFavorite.addFavorite(this.id);
    this.update(this.id);
  };

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
