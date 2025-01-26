import { AxiosError } from 'axios';
import { updateExerciseRating } from '../../api/exercises.api';
import { Exercise } from '../../types/exercise';
import { Modal } from './modal';
import iziToast from 'izitoast';

export class ModalRating extends Modal {
  private exerciseID: Exercise['_id'];
  private email: string = '';
  private comment: string = '';
  private rating: string = '0';

  private ratingTitle!: HTMLSpanElement;
  private stars!: HTMLInputElement[];

  constructor(selector: string, exercise: Exercise) {
    super(selector);
    this.exerciseID = exercise._id;
  }

  public show = (callbackOnClose?: CallableFunction): void => {
    this.render();
    this.showDialog(callbackOnClose);

    this.renderStars();
  };

  private render(): void {
    const modalContent = this.dialogContentTemplate.cloneNode(
      true
    ) as HTMLTemplateElement;

    const form = modalContent.content.querySelector(
      '.modal-form'
    ) as HTMLFormElement;

    this.ratingTitle = form.querySelector(
      '[data-rating-title]'
    ) as HTMLSpanElement;

    const ratingElements = form.elements.namedItem('rating');

    if (ratingElements instanceof RadioNodeList) {
      this.stars = Array.from(ratingElements) as HTMLInputElement[];
    } else {
      this.stars = [];
    }

    form.addEventListener('change', this.inputHandler);
    form.addEventListener('input', this.inputHandler);
    form.addEventListener('submit', this.submitHandler);

    this.dialogContent.innerHTML = '';
    this.dialogContent.appendChild(modalContent.content);
  }

  private inputHandler = (event: Event) => {
    const target = event.target as HTMLInputElement;

    if (target.name in this) {
      (this as any)[target.name] = target.value;
    }
    if (target.name === 'rating') this.renderStars();
  };

  private submitHandler = async (event: SubmitEvent) => {
    event.preventDefault();

    try {
      const response = await updateExerciseRating(this.exerciseID, {
        rate: Number(this.rating),
        email: this.email,
        review: this.comment,
      });

      this.successToast();
      this.close(response);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        this.errorToast('Error: ' + error.response.data.message);
      } else {
        this.errorToast('An unexpected error occurred');
      }
    }
  };

  private successToast() {
    iziToast.success({
      message: 'Thank you for the feedback.',
      position: 'topRight',
      close: false,
    });
  }

  private errorToast(message: string) {
    iziToast.error({
      message,
      position: 'topRight',
      close: false,
      // backgroundColor: 'var(--primary-text-color)',
    });
  }

  private renderStars(): void {
    if (!this.stars.length) return;
    // rating
    this.stars.forEach(element =>
      element.nextElementSibling?.classList.remove('icon-star-filled')
    );

    for (let i = 0; i < this.stars.length; i++) {
      const element = this.stars[i];
      if (i < Number(this.rating)) {
        setTimeout(
          () => element.nextElementSibling?.classList.add('icon-star-filled'),
          i * 120
        );
      }
    }
    this.ratingTitle.innerHTML = this.rating + '.0';
  }
}
