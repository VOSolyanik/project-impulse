import { getExerciseById } from '../../api/exersises.api';
import { Exercise } from '../../types/exercise';
import { AddToFavorite } from './addToFavorite';

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

export class ModalExercise {
  private elements: ModalElements;
  private dialog: HTMLDialogElement;
  private starPercent: SVGRectElement;
  private ratingStars: HTMLSpanElement;
  private favorite: AddToFavorite;
  private closeButton: HTMLButtonElement;

  constructor(selector: string) {
    const modalElement = document.querySelector(selector);
    if (!(modalElement instanceof HTMLDialogElement)) {
      throw new Error('Modal element not found or is not a dialog');
    }
    this.dialog = modalElement;
    this.closeButton = modalElement.querySelector(
      '[data-close-element]'
    ) as HTMLButtonElement;

    this.closeButton.addEventListener('click', this.close);

    this.elements = {
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

    this.starPercent = modalElement.querySelector(
      '[data-cut-percent]'
    ) as SVGRectElement;
    this.ratingStars = modalElement.querySelector(
      '[data-rating-list]'
    ) as HTMLSpanElement;
    this.favorite = new AddToFavorite(
      modalElement.querySelector('[data-favorite-element]') as HTMLButtonElement
    );

    modalElement.addEventListener('mousedown', event => {
      if (event.target === event.currentTarget) {
        this.close();
      }
    });
  }

  public show(props: Exercise): void {
    for (const key in this.elements) {
      const element = this.elements[key as keyof ModalElements];
      const value = props[key as keyof Exercise];

      if (value) {
        element.classList.remove('hidden');

        if (element instanceof HTMLImageElement) {
          element.src = String(value);
        } else if (key === 'rating') {
          element.innerHTML = Number(value).toFixed(2);
          this.calculateStar(Number(value));
        } else {
          element.innerHTML = String(value);
        }
      } else {
        element.classList.add('hidden');
      }
    }
    this.favorite.update(props._id);
    this.dialog.showModal();
    document.addEventListener('keydown', this.closeEvent);
  }

  public close = (): void => {
    this.dialog.close();
    document.removeEventListener('keydown', this.closeEvent);
  };

  private closeEvent = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') this.close();
  };

  private calculateStar(rating: number): void {
    const num = Math.floor(rating);
    const decimal = rating % 1;

    Array.from(this.ratingStars.children).forEach(starEl => {
      starEl.classList.remove('icon-star-filled');
      starEl.lastElementChild?.classList.add('hidden');
    });

    for (let i = 0; i < num; i++) {
      this.ratingStars.children[i].classList.add('icon-star-filled');
    }

    if (decimal) {
      this.starPercent.setAttribute('width', (14 * decimal).toString());
      this.ratingStars.children[num].lastElementChild?.classList.remove(
        'hidden'
      );
    }
  }
}

const modal = new ModalExercise('.modal');
export default modal;

// Code for testing the modal window

// setTimeout(async () => {
//   const response = await getExerciseById('64f389465ae26083f39b17b7');
//   modal.show(response);
// });
