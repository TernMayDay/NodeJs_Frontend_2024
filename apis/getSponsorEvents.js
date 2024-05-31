// apis/getSponsorEvents.js
import { useHttp } from '~/composables/useHttp';

export async function getSponsorEvents(sponsorId, params) {
  const config = useRuntimeConfig();
  const apiUrl = `${config.public.apiBase}/api/v1/event/sponsor/${sponsorId}`;
  try {
    const response = await useHttp.get(apiUrl, params);
    console.log('API Response:', response); // 添加日志检查 API 响应
    return response;
  } catch (error) {
    console.error('Error in getSponsorEvents:', error);
    throw error;
  }
}
