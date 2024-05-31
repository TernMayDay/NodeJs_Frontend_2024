// apis/getSponsorEvents.js
import { useHttp } from '~/composables/useHttp';

export async function getSponsorEvents(params) {
  const config = useRuntimeConfig();
  const sponsorId = '664e8f0713276632c8bb4e0b';
  const apiUrl = `${config.public.apiBase}/api/v1/event/sponsor/${sponsorId}`;
  try {
    const response = await useHttp.get(apiUrl, params);
    console.log('API Response:', response);
    return response;
  } catch (error) {
    console.error('Error in getSponsorEvents:', error);
    throw error;
  }
}
