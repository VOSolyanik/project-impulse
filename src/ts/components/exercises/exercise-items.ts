import { Exercise } from '@/types/exercise';
import spriteUrl from "../../../images/sprite.svg";

type ExerciseSelectCallback = (id: string) => void;
export class ExerciseItems {
  private emptyStateElement: HTMLElement | null = null;
  private onExerciseSelectCallback?: ExerciseSelectCallback;
  private onExerciseDeleteCallback?: ExerciseSelectCallback;

  constructor(
    protected containerElement: HTMLElement,
    private withDelete: boolean = false,
    private emptyStateMessage: string
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

  protected render(items: Exercise[]): void {
    if (!items.length) {
      this.renderEmptyState();
    } else {
      this.removeEmptyState();
    }

    this.containerElement.innerHTML = items
      .filter(item => item.name)
      .map(this.createItemTemplate)
      .join('');
  }

  protected renderEmptyState(): void {
    if(this.emptyStateElement) return;

    this.emptyStateElement = document.createElement('p');
    this.emptyStateElement.className = 'exercises-empty-message';
    this.emptyStateElement.innerHTML = this.emptyStateMessage;
    this.containerElement.parentElement!
      .insertBefore(this.emptyStateElement, this.containerElement.parentElement!.firstChild);
  }

  private removeEmptyState(): void {
    if(!this.emptyStateElement) return;

    this.emptyStateElement.remove();
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
      <li class="exercise-card" role="button" tabindex="0">
        <div class="exercise-card__heading">
          <p class="exercise-badge">WORKOUT</p>

          ${this.withDelete
            ? `
            <button class="btn-icon" type="button" data-delete-id="${item._id}">
              <svg class="icon stroke-icon" width="16" height="16">
                <use href="${spriteUrl}#icon-trash"></use>
              </svg>
            </button>`
            : `
            <span class="rating-wrapper">
              <p class="exercise-rating">${item.rating.toFixed(1)}</p>
              <svg class="icon fill-icon exercise-rating-icon" width="14" height="14">
                <use href="${spriteUrl}#icon-star"></use>
              </svg>
            </span>`
          }
          <button class="exercise-card__btn" type="button" data-start-id="${item._id}">
            Start
            <svg class="icon fill-icon arrow-icon" width="16" height="16">
              <use href="${spriteUrl}#icon-arw-scroll"></use>
            </svg>
          </button>
        </div>
        <div class="exercise-card__main">
          <div class="icon-runningman-bg">
            <svg class="icon fill-icon icon-runningman" width="16" height="16">
              <use href="${spriteUrl}#icon-runningman"></use>
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
