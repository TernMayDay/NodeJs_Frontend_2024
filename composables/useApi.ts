import { FetchOptions } from 'ohmyfetch';

// 定義返回類型的泛型接口
interface ApiResponse<T> {
  data: T;
  error: string | null;
}

export function useApi() {
  const config = useRuntimeConfig();

  async function fetchData<T>(url: string, options: FetchOptions = {}): Promise<ApiResponse<T>> {
    try {
      const fullUrl = `${config.public.apiBase}${url}`;
      const data = await $fetch<T>(fullUrl, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`,
        },
      });
      return { data, error: null };
    } catch (error) {
      return { data: null as unknown as T, error: error.message };
    }
  }

  async function createData<T>(url: string, body: any, options: FetchOptions = {}): Promise<ApiResponse<T>> {
    try {
      const fullUrl = `${config.public.apiBase}${url}`;
      const data = await $fetch<T>(fullUrl, {
        method: 'POST',
        body,
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
          Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`,
        },
      });
      return { data, error: null };
    } catch (error) {
      return { data: null as unknown as T, error: error.message };
    }
  }

  async function updateData<T>(url: string, body: any, options: FetchOptions = {}): Promise<ApiResponse<T>> {
    try {
      const fullUrl = `${config.public.apiBase}${url}`;
      const data = await $fetch<T>(fullUrl, {
        method: 'PUT',
        body,
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
          Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`,
        },
      });
      return { data, error: null };
    } catch (error) {
      return { data: null as unknown as T, error: error.message };
    }
  }

  async function deleteData<T>(url: string, options: FetchOptions = {}): Promise<ApiResponse<T>> {
    try {
      const fullUrl = `${config.public.apiBase}${url}`;
      const data = await $fetch<T>(fullUrl, {
        method: 'DELETE',
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`,
        },
      });
      return { data, error: null };
    } catch (error) {
      return { data: null as unknown as T, error: error.message };
    }
  }

  return { fetchData, createData, updateData, deleteData };
}
