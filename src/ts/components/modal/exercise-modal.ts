import { Exercise } from '@/types/exercise';
import { Modal } from './modal';
import { favoritesState } from '@/favorites-state';

type ModalElements = {
  name: HTMLTitleElement;
  gifUrl: HTMLImageElement;
  rating: HTMLSpanElement;
  target: HTMLParagraphElement;
  bodyPart: HTMLParagraphElement;
  equipment: HTMLParagraphElement;
  popularity: HTMLParagraphElement;
  burnedCalories: HTMLSpanElement;
  time: HTMLSpanElement;
  description: HTMLParagraphElement;
};

export class ExerciseModal extends Modal<Exercise> {
  constructor(selector: string) {
    super(selector);
  }

  public show(props: Exercise): void {
    this.render(props);
    this.showDialog();
  };

  private render(props: Exercise): void {
    const modalContent = this.dialogContentTemplate.cloneNode(
      true
    ) as HTMLTemplateElement;

    // find each element:
    const elements: ModalElements = {
      name: modalContent.content.querySelector(
        '[data-name-element]'
      ) as HTMLTitleElement,
      gifUrl: modalContent.content.querySelector(
        '[data-gif-element]'
      ) as HTMLImageElement,
      rating: modalContent.content.querySelector(
        '[data-rating-element]'
      ) as HTMLSpanElement,
      target: modalContent.content.querySelector(
        '[data-target-element]'
      ) as HTMLParagraphElement,
      bodyPart: modalContent.content.querySelector(
        '[data-bodyPart-element]'
      ) as HTMLParagraphElement,
      equipment: modalContent.content.querySelector(
        '[data-equipment-element]'
      ) as HTMLParagraphElement,
      popularity: modalContent.content.querySelector(
        '[data-popular-element]'
      ) as HTMLParagraphElement,
      burnedCalories: modalContent.content.querySelector(
        '[data-burnedCalories-element]'
      ) as HTMLSpanElement,
      time: modalContent.content.querySelector(
        '[data-time-element]'
      ) as HTMLSpanElement,
      description: modalContent.content.querySelector(
        '[data-description-element]'
      ) as HTMLParagraphElement,
    };

    const starPercent = modalContent.content.querySelector(
      '[data-cut-percent]'
    ) as SVGRectElement;

    starPercent.parentElement?.setAttribute('id', 'cut-off-star');

    const ratingStars = modalContent.content.querySelector(
      '[data-rating-list]'
    ) as HTMLSpanElement;

    // make changes in the elements
    for (const key in elements) {
      const element = elements[key as keyof ModalElements];
      const value = props[key as keyof Exercise];

      if (value) {
        element.classList.remove('hidden');

        if (element instanceof HTMLImageElement) {
          element.src = String(value);
        } else if (key === 'rating') {
          element.innerHTML = Number(value).toFixed(2);
          this.renderStars(Number(value), starPercent, ratingStars);
        } else {
          element.innerHTML = String(value);
        }
      } else {
        element.classList.add('hidden');
      }
    }

    const buttonAddToFavorite = modalContent.content.querySelector(
      '[data-favorite-element]'
    ) as HTMLButtonElement;

    const buttonTitle = buttonAddToFavorite.querySelector(
      '[data-favorite-title]'
    ) as HTMLElement;

    const buttonIcon = buttonAddToFavorite.querySelector(
      '[data-favorite-icon]'
    ) as SVGElement;

    buttonAddToFavorite.addEventListener('click', () => {
      this.handleButtonFavorite(props._id, buttonTitle, buttonIcon);
    });

    // update text and icon for favorite on init
    this.handleButtonFavorite(props._id, buttonTitle, buttonIcon, false);

    this.dialogContent.innerHTML = '';
    this.dialogContent.appendChild(modalContent.content);
  }

  private handleButtonFavorite(
    id: Exercise['_id'],
    buttonTitle: HTMLSpanElement,
    buttonIcon: SVGElement,
    isEvent = true
  ) {
    debugger;
    let isFavorite = favoritesState.isFavorite(id);
    if (isEvent) isFavorite = !isFavorite;

    if (isFavorite) {
      if (isEvent) favoritesState.addFavorite(id);
      buttonTitle.innerHTML = 'Remove from favorites';
      buttonIcon.setAttribute('href', '/images/sprite.svg#icon-trash');
    } else {
      if (isEvent) favoritesState.removeFavorite(id);
      buttonTitle.innerHTML = 'Add to favorites';
      buttonIcon.setAttribute('href', '/images/sprite.svg#icon-heart');
    }
  }

  private renderStars(
    rating: number,
    starPercent: SVGRectElement,
    ratingStars: HTMLSpanElement
  ): void {
    const num = Math.floor(rating);
    const decimal = rating % 1;

    Array.from(ratingStars.children).forEach(starEl => {
      starEl.classList.remove('icon-star-filled');
      starEl.lastElementChild?.classList.add('hidden');
    });

    for (let i = 0; i < num; i++) {
      ratingStars.children[i].classList.add('icon-star-filled');
    }

    if (decimal) {
      starPercent.setAttribute('width', (14 * decimal).toString());
      ratingStars.children[num].lastElementChild?.classList.remove('hidden');
    }
  }
}
