import { yourEnergyApi } from './base';
import {
  GetExercisesParams,
  Exercise,
  ExerciseRatingRequest,
  ExerciseRatingResponse,
} from '../types/exercise';
import PaginatedResponse from '../types/response.api';

const getExercises = async (
  params: GetExercisesParams
): Promise<PaginatedResponse<Exercise>> => {
  const response = await yourEnergyApi.get<PaginatedResponse<Exercise>>(
    '/exercises',
    {
      params,
    }
  );
  return response.data;
};

const getExerciseById = async (id: string): Promise<Exercise> => {
  const response = await yourEnergyApi.get<Exercise>(`/exercises/${id}`);
  return response.data;
};

const updateExerciseRating = async (
  id: string, // Ідентифікатор вправи
  rating: ExerciseRatingRequest // Тіло запиту
): Promise<ExerciseRatingResponse> => {
  const response = await yourEnergyApi.patch<ExerciseRatingResponse>(
    `/exercises/${id}/rating`,
    rating
  );
  return response.data;
};

export { getExercises, getExerciseById, updateExerciseRating };
