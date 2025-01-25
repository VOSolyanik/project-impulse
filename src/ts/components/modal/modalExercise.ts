import { getExerciseById } from '../../api/exersises.api';
import { Exercise } from '../../types/exercise';
import { AddToFavorite } from './addToFavorite';
import Modal from './modal';
import { ModalRating } from './modalRating';

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

export class ModalExercise extends Modal {
  private excercise: Exercise;
  private ratingModal: ModalRating;

  constructor(selector: string, excercise: Exercise) {
    super(selector);
    this.excercise = excercise;
    this.ratingModal = new ModalRating('[data-modal-rating]', this.excercise);
  }

  public show = (callbackOnClose?: CallableFunction): void => {
    this.render();
    super.show(callbackOnClose);
  };

  private render(): void {
    const modalElement = this.dialogTemplate.cloneNode(
      true
    ) as HTMLDialogElement;
    modalElement.classList.remove('hidden');
    modalElement.removeAttribute('hidden');
    this.dialog = modalElement;

    const closeButton = modalElement.querySelector(
      '[data-close-element]'
    ) as HTMLButtonElement;

    closeButton.addEventListener('click', this.close);

    // find each element:
    const elements: ModalElements = {
      name: modalElement.querySelector(
        '[data-name-element]'
      ) as HTMLTitleElement,
      gifUrl: modalElement.querySelector(
        '[data-gif-element]'
      ) as HTMLImageElement,
      rating: modalElement.querySelector(
        '[data-rating-element]'
      ) as HTMLSpanElement,
      target: modalElement.querySelector(
        '[data-target-element]'
      ) as HTMLParagraphElement,
      bodyPart: modalElement.querySelector(
        '[data-bodyPart-element]'
      ) as HTMLParagraphElement,
      equipment: modalElement.querySelector(
        '[data-equipment-element]'
      ) as HTMLParagraphElement,
      popularity: modalElement.querySelector(
        '[data-popular-element]'
      ) as HTMLParagraphElement,
      burnedCalories: modalElement.querySelector(
        '[data-burnedCalories-element]'
      ) as HTMLSpanElement,
      time: modalElement.querySelector(
        '[data-time-element]'
      ) as HTMLSpanElement,
      description: modalElement.querySelector(
        '[data-description-element]'
      ) as HTMLParagraphElement,
    };

    const starPercent = modalElement.querySelector(
      '[data-cut-percent]'
    ) as SVGRectElement;

    starPercent.parentElement?.setAttribute('id', 'cut-off-star');

    const ratingStars = modalElement.querySelector(
      '[data-rating-list]'
    ) as HTMLSpanElement;

    modalElement.addEventListener('mousedown', event => {
      if (event.target === event.currentTarget) {
        this.close();
      }
    });

    // make changes in the elements
    for (const key in elements) {
      const element = elements[key as keyof ModalElements];
      const value = this.excercise[key as keyof Exercise];

      if (value) {
        element.classList.remove('hidden');

        if (element instanceof HTMLImageElement) {
          element.src = String(value);
        } else if (key === 'rating') {
          element.innerHTML = Number(value).toFixed(2);
          this.calculateStar(Number(value), starPercent, ratingStars);
        } else {
          element.innerHTML = String(value);
        }
      } else {
        element.classList.add('hidden');
      }
    }

    const buttonAddToFavorite = modalElement.querySelector(
      '[data-favorite-element]'
    ) as HTMLButtonElement;

    const buttonTitle = buttonAddToFavorite.querySelector(
      '[data-favorite-title]'
    ) as HTMLElement;

    const buttonIcon = buttonAddToFavorite.querySelector(
      '[data-favorite-icon]'
    ) as SVGElement;

    buttonAddToFavorite.addEventListener('click', () => {
      this.handleButtonFavorite(this.excercise._id, buttonTitle, buttonIcon);
    });

    const buttonGiveRating = modalElement.querySelector(
      '[data-add-rating-element]'
    ) as HTMLButtonElement;

    buttonGiveRating.addEventListener('click', () => {
      this.close();
      setTimeout(() => {
        this.dialog.remove();
      }, 300);
      this.ratingModal.show((excercise?: Exercise) => {
        // update rating if changed
        if (excercise) this.excercise;
        this.show();
      });
    });

    // update text and icon for favorite on init
    this.handleButtonFavorite(
      this.excercise._id,
      buttonTitle,
      buttonIcon,
      false
    );

    document.body.appendChild(modalElement);
    this.dialog.showModal();
    document.addEventListener('keydown', this.closeEvent);
  }

  private handleButtonFavorite(
    id: Exercise['_id'],
    buttonTitle: HTMLSpanElement,
    buttonIcon: SVGElement,
    isEvent = true
  ) {
    let hasFavorite = AddToFavorite.hasFavorite(id);
    if (!isEvent) hasFavorite = !hasFavorite;

    if (hasFavorite) {
      if (isEvent) AddToFavorite.removeFavorite(id);
      buttonTitle.innerHTML = 'Remove from favorites';
      buttonIcon.setAttribute('href', '/images/sprite.svg#icon-trash');
    } else {
      if (isEvent) AddToFavorite.addFavorite(id);
      buttonTitle.innerHTML = 'Add to favorites';
      buttonIcon.setAttribute('href', '/images/sprite.svg#icon-heart');
    }
  }

  private calculateStar(
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

export default ModalExercise;

// Code for testing the modal window

setTimeout(async () => {
  const response = await getExerciseById('64f389465ae26083f39b17b7');
  const modal = new ModalExercise('.modal', response);
  modal.show();
});
