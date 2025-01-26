import { yourEnergyApi } from './base';
import { PaginatedResponse } from '../types/pagination';
import {
  GetExercisesParams,
  Exercise,
  ExerciseRatingRequest,
  ExerciseRatingResponse,
} from '../types/exercise';

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
  id: string,
  rating: ExerciseRatingRequest
): Promise<ExerciseRatingResponse> => {
  const response = await yourEnergyApi.patch<ExerciseRatingResponse>(
    `/exercises/${id}/rating`,
    rating
  );
  return response.data;
};

export { getExercises, getExerciseById, updateExerciseRating };
