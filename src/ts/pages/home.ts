import { getExercises } from '../api/exersises.api';
import generateExerciseMarkup from '@/components/exercises/exercises';
import { Pagination } from '@/components/pagination';

const container = document.querySelector<HTMLElement>('.pagination-wrapper');
const exerciseContainer =
  document.querySelector<HTMLElement>('.exercise-cards');

const pagination = new Pagination(container!, 5, 12);

pagination.onPageChange((page, pageSize) => {
  console.log('Make API request here', page, pageSize);
  const renderExercises = (page: number) => {
    // Отримання вправ для певної сторінки
    getExercises({ page: page })
      .then(paginatedResponse => {
        const {
          page: currPage,
          perPage: perPage,
          totalPages: totalPages,
          results: exercises,
        } = paginatedResponse;

        // Генерація розмітки вправ
        const markup = generateExerciseMarkup(exercises);
        if (!exerciseContainer) {
          console.error('exerciseContainer was not found');
          return;
        }
        exerciseContainer.innerHTML = markup;
      })
      .catch(error => {
        console.error('Failed to fetch exercises:', error);
        if (!exerciseContainer) {
          console.error('exerciseContainer was not found');
          return;
        }
        exerciseContainer.innerHTML = `<p class="error-message">Failed to load exercises. Please try again later.</p>`;
      });
  };
  renderExercises(page);
});
