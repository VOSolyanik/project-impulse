import { AxiosError } from 'axios';
import iziToast from 'izitoast';
import { updateExerciseRating } from '@/api/exercises.api';
import { Exercise } from '@/types/exercise';
import { Modal } from './modal';

export class ExerciseRatingModal extends Modal<Exercise> {
  private exercise: Exercise | null = null;
  private email: string = '';
  private comment: string = '';
  private rating: string = '0';

  private ratingTitle!: HTMLSpanElement;
  private stars!: HTMLInputElement[];

  public show(exercise: Exercise): void {
    this.exercise = exercise;

    this.render();
    this.showDialog();

    this.renderStars();
  };

  private render(): void {
    const modalContent = this.dialogContentTemplate.cloneNode(
      true
    ) as HTMLTemplateElement;

    const form = modalContent.content.querySelector(
      '.exercise-rating__form'
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

  private inputHandler = (event: Event): void => {
    const target = event.target as HTMLInputElement;

    if (target.name in this) {
      (this as any)[target.name] = target.value;
    }
    if (target.name === 'rating') this.renderStars();
  };

  private submitHandler = async (event: SubmitEvent): Promise<void> => {
    event.preventDefault();

    try {
      await updateExerciseRating(this.exercise!._id, {
        rate: Number(this.rating),
        email: this.email,
        review: this.comment,
      });

      this.successToast();
      this.close();
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        this.errorToast(error.response.data.message);
      } else {
        this.errorToast('An unexpected error occurred');
      }
    }
  };

  private successToast(): void {
    iziToast.success({
      title: 'Feedback sent',
      message: 'Thank you for the feedback.',
      position: 'topRight',
      close: false,
    });
  }

  private errorToast(message: string): void {
    iziToast.error({
      title: 'Error',
      message,
      position: 'topRight',
      close: false,
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
