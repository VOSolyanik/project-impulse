import { Exercise } from '../../types/exercise';

const generateExerciseMarkup = (exercises: Exercise[]): string => {
  return exercises.reduce((acc, exercise) => {
    const {
      _id,
      bodyPart,
      equipment,
      gifUrl,
      name,
      target,
      description,
      rating,
      burnedCalories,
      time,
      popularity,
    } = exercise;

    return (
      acc +
      `<li class="exercise-card" id="${_id}">
        <div class="exercise-card-top-bar">
          <a class="exercise-badge" href="#">WORKOUT</a>
          <span class="rating-wrapper">
            <p class="exercise-rating">${rating.toFixed(1)}</p>
            <svg
              class="icon fill-icon exercise-rating-icon"
              width="14"
              height="14"
            >
              <use href="/images/sprite.svg#icon-star"></use>
            </svg>
          </span>
          <a class="exercise-card-btn" href="#">
            Start
            <svg class="icon fill-icon arrow-icon" width="16" height="16">
              <use href="/images/sprite.svg#icon-arw-scroll"></use>
            </svg>
          </a>
        </div>
        <div class="main-block">
          <div class="icon-runningman-bg">
            <svg class="icon fill-icon icon-runningman" width="16" height="16">
              <use href="/images/sprite.svg#icon-runningman"></use>
            </svg>
          </div>
          <h3 class="exercise-card-title">${name}</h3>
        </div>

        <ul class="exercise-card-bottom-bar">
          <li class="bottom-bar-item">
            <p class="bottom-bar-item-label">Burned calories:</p>
            <p class="bottom-bar-item-content">${burnedCalories}</p>
          </li>
          <li class="bottom-bar-item">
            <p class="bottom-bar-item-label">Body part:</p>
            <p class="bottom-bar-item-content">${bodyPart}</p>
          </li>
          <li class="bottom-bar-item">
            <p class="bottom-bar-item-label">Target:</p>
            <p class="bottom-bar-item-content">${target}</p>
          </li>
        </ul>
      </li>`
    );
  }, '');
};

export default generateExerciseMarkup;
