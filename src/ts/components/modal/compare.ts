import { AxiosError } from 'axios';
import { getExerciseById, updateExerciseRating } from '../../api/exersises.api';
import { Exercise } from '../../types/exercise';
import { AddToFavorite } from './addToFavorite';
import Modal from './modal';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export class ModalRating extends Modal {
  private exerciseID: Exercise['_id'];
  private email: string = '';
  private comment: string = '';
  private rating: number = 0;

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
    this.stars = Array.from(
      this.form.elements.namedItem('rating') as RadioNodeList
    ) as HTMLInputElement[];

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
    if (!target || !target.name) return;

    if (target.name === 'rating') {
      this.rating = Number(target.value);
      this.render();
    } else if (target.name === 'email') {
      this.email = target.value;
    } else if (target.name === 'comment') {
      this.comment = target.value;
    }
  };

  private submitHandler = async (event: SubmitEvent) => {
    event.preventDefault();

    try {
      await updateExerciseRating(this.exerciseID, {
        rate: this.rating,
        email: this.email,
        review: this.comment,
      });

      this.successToast();
      this.close();
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
      gravity: 'top',
      position: 'center',
      stopOnFocus: true,
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

    // Очистка всіх зірочок
    this.stars.forEach(element =>
      element.nextElementSibling?.classList.remove('icon-star-filled')
    );

    // Додавання заповнених зірочок
    this.stars.forEach((element, index) => {
      if (index < this.rating) {
        setTimeout(
          () => element.nextElementSibling?.classList.add('icon-star-filled'),
          index * 50
        );
      }
    });

    this.ratingTitle.textContent = `${this.rating}.0`;
  }
}
