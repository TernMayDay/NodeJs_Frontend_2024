// apis/getEventList.js
import { useHttp } from '~/composables/useHttp';

export async function getEventList(params) {
  const config = useRuntimeConfig();
  const apiUrl = `${config.public.apiBase}/api/v1/event/list`;
  try {
    const response = await useHttp.get(apiUrl, params);
    console.log('API Response:', response);
    return response;
  } catch (error) {
    console.error('Error in getEventList:', error);
    throw error;
  }
}
