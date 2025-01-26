import { yourEnergyApi } from './base';
import { SubscriptionResponse } from '../types/subscription';

const sendSubscriptionRequest = async (
  email: string,
): Promise<SubscriptionResponse> => {
  const response = await yourEnergyApi.post<SubscriptionResponse>(
    '/subscription',
    { email }
  );
  return response.data;
};

export { sendSubscriptionRequest };
