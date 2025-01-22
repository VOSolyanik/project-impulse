import { PaginationParams } from './pagination';

type GetExercisesParams = PaginationParams & {
  bodypart?: string;
  muscles?: string;
  equipment?: string;
  keyword?: string;
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
  Exercise,
  ExerciseRatingRequest,
  ExerciseRatingResponse,
};
