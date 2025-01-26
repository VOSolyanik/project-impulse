import { Exercise, ExercisesParams } from '@/types/exercise';
import { getExercises } from '@/api/exercises.api';
import { Pagination } from '@/components/pagination';

type ExerciseSelectCallback = (id: string) => void;

export class ExerciseItems {
  private onExerciseSelectCallback?: ExerciseSelectCallback;
  private onExerciseDeleteCallback?: ExerciseSelectCallback;

  constructor(
    protected containerElement: HTMLElement,
    private withDelete: boolean = false
  ) {
    this.init();
  }

  clear(): void {
    this.containerElement.innerHTML = '';
  }

  onExerciseSelect(callback: ExerciseSelectCallback): void {
    this.onExerciseSelectCallback = callback;
  }

  onExerciseDelete(callback: ExerciseSelectCallback): void {
    this.onExerciseDeleteCallback = callback;
  }

  protected render(categories: Exercise[]): void {
    // TODO: render empty state;
    this.containerElement.innerHTML = categories
      .filter(category => category.name)
      .map(this.createItemTemplate)
      .join('');
  }

  private init(): void {
    this.initListeners();
  }

  private initListeners(): void {
    this.containerElement.addEventListener('click', event => {
      const target = event.target as HTMLElement;
      const startBtn = target.closest('[data-start-id]');
      const deleteBtn = target.closest('[data-delete-id]');

      if(startBtn) {
        const id = startBtn.getAttribute('data-start-id');
        if(this.onExerciseSelectCallback && id) {
          this.onExerciseSelectCallback(id);
        }
      }

      if(deleteBtn) {
        const id = deleteBtn.getAttribute('data-delete-id');
        if(this.onExerciseDeleteCallback && id) {
          this.onExerciseDeleteCallback(id);
        }
      }
    });
  }

  private createItemTemplate = (item: Exercise): string => {
    const name = item.name
      ? item.name.charAt(0).toUpperCase() + item.name.slice(1)
      : '';

    return `
      <li class="exercise-card">
        <div class="exercise-card__heading">
          <p class="exercise-badge">WORKOUT</p>

          ${this.withDelete
            ? `
            <button class="btn-icon" type="button" data-delete-id="${item._id}">
              <svg class="icon stroke-icon" width="16" height="16">
                <use href="/images/sprite.svg#icon-trash"></use>
              </svg>
            </button>`
            : `
            <span class="rating-wrapper">
              <p class="exercise-rating">${item.rating.toFixed(1)}</p>
              <svg class="icon fill-icon exercise-rating-icon" width="14" height="14">
                <use href="/images/sprite.svg#icon-star"></use>
              </svg>
            </span>`
          }
          <button class="exercise-card__btn" type="button" data-start-id="${item._id}">
            Start
            <svg class="icon fill-icon arrow-icon" width="16" height="16">
              <use href="/images/sprite.svg#icon-arw-scroll"></use>
            </svg>
          </button>
        </div>
        <div class="exercise-card__main">
          <div class="icon-runningman-bg">
            <svg class="icon fill-icon icon-runningman" width="16" height="16">
              <use href="/images/sprite.svg#icon-runningman"></use>
            </svg>
          </div>
          <h3 class="exercise-card__title">${name}</h3>
        </div>

        <ul class="exercise-card__info">
          <li class="exercise-card__info-item">
            <span class="exercise-card__item-label">Burned calories: </span>
            <span class="exercise-card__item-content ellipsis">${item.burnedCalories} / ${item.time} minutes</span>
          </li>
          <li class="exercise-card__info-item">
            <span class="exercise-card__item-label">Body part: </span>
            <span class="exercise-card__item-content">${item.bodyPart}</span>
          </li>
          <li class="exercise-card__info-item">
            <span class="exercise-card__item-label">Target: </span>
            <span class="exercise-card__item-content">${item.target}</span>
          </li>
        </ul>
      </li>
    `;
  }
}
