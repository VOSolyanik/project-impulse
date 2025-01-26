import { PaginationParams } from './pagination';

type ExercisesParams = {
  bodypart?: string;
  muscles?: string;
  equipment?: string;
  keyword?: string;
}

type GetExercisesParams = PaginationParams & ExercisesParams;

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
  success: boolean;
  updatedExercise?: Exercise;
};

export {
  ExercisesParams,
  GetExercisesParams,
  Exercise,
  ExerciseRatingRequest,
  ExerciseRatingResponse,
};
