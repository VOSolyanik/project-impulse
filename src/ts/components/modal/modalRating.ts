import { AxiosError } from 'axios';
import { updateExerciseRating } from '../../api/exersises.api';
import { Exercise } from '../../types/exercise';
import Modal from './modal';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export class ModalRating extends Modal {
  private exerciseID: Exercise['_id'];
  private email: string = '';
  private comment: string = '';
  private rating: string = '0';

  private form: HTMLFormElement;
  private ratingTitle: HTMLSpanElement;
  private stars: HTMLInputElement[];

  constructor(selector: string, exercise: Exercise) {
    super(selector);
    this.exerciseID = exercise._id;
    this.dialog = this.dialogTemplate;
    this.form = this.dialog.querySelector('.modal-form') as HTMLFormElement;

    this.ratingTitle = this.form.querySelector(
      '[data-rating-title]'
    ) as HTMLSpanElement;

    const ratingElements = this.form.elements.namedItem('rating');

    if (ratingElements instanceof RadioNodeList) {
      this.stars = Array.from(ratingElements) as HTMLInputElement[];
    } else {
      this.stars = [];
    }

    this.form.addEventListener('change', this.inputHandler);
    this.form.addEventListener('input', this.inputHandler);
    this.form.addEventListener('submit', this.submitHandler);

    const closeButton = this.dialog.querySelector(
      '[data-close-element]'
    ) as HTMLButtonElement;

    closeButton.addEventListener('click', this.close);

    this.dialog.addEventListener('mousedown', event => {
      if (event.target === event.currentTarget) {
        this.close();
      }
    });
  }

  public show = (callbackOnClose?: CallableFunction): void => {
    super.show(callbackOnClose);
    this.render();
  };

  private inputHandler = (event: Event) => {
    const target = event.target as HTMLInputElement;

    if (target.name in this) {
      (this as any)[target.name] = target.value;
    }
    if (target.name === 'rating') this.render();
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

  private showToast(message: string) {
    Toastify({
      text: message,
      duration: 5000,
      gravity: 'top', // `top` or `bottom`
      position: 'center', // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        'border-radius': '10px',
        background: 'var(--primary-text-color)',
        padding: '20px',
      },
    }).showToast();
  }

  private successToast() {
    this.showToast('Success');
  }

  private errorToast(message: string) {
    this.showToast(message);
  }

  private render(): void {
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
