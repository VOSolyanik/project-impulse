import { PaginationParams } from './pagination';

type GetExercisesParams = PaginationParams & {
  bodypart?: string;
  muscles?: string;
  equipment?: string;
  keyword?: string;
};

type ExercisesResponse = {
  page: number;
  perPage: number;
  totalPages: number;
  results: Exercise[];
};

type Exercise = {
  _id: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  name: string;
  target: string;
  description: string;
  rating: number;
  burnedCalories: number;
  time: number;
  popularity: number;
};

type ExerciseRatingRequest = {
  rate: number;
  email: string;
  review: string;
};

type ExerciseRatingResponse = {
  success: boolean; // Чи успішно оновлено
  updatedExercise?: Exercise; // Оновлений об'єкт вправи
};

export {
  GetExercisesParams,
  ExercisesResponse,
  Exercise,
  ExerciseRatingRequest,
  ExerciseRatingResponse,
};
