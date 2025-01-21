import { axiosGoit } from './axiosConfig';
import {
  GetExercisesQueryParams,
  ExercisesResponse,
  Exercise,
  ExerciseRatingRequest,
  ExerciseRatingResponse,
} from '../types/exercise';

const getExercises = async (
  params: GetExercisesQueryParams
): Promise<ExercisesResponse> => {
  const response = await axiosGoit.get<ExercisesResponse>('/exercises', {
    params,
  });
  return response.data;
};

const getExerciseById = async (id: string): Promise<Exercise> => {
  const response = await axiosGoit.get<Exercise>(`/exercises/${id}`);
  return response.data;
};

const updateExerciseRating = async (
  id: string, // Ідентифікатор вправи
  rating: ExerciseRatingRequest // Тіло запиту
): Promise<ExerciseRatingResponse> => {
  const response = await axiosGoit.patch<ExerciseRatingResponse>(
    `/exercises/${id}/rating`,
    rating
  );
  return response.data;
};

export { getExercises, getExerciseById, updateExerciseRating };
