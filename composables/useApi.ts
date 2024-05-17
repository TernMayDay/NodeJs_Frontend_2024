import type { FetchOptions } from 'ohmyfetch';

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export function useApi() {
  const fetchData = async <T>(url: string, options?: FetchOptions): Promise<ApiResponse<T>> => {
    try {
      const fullUrl = `${config.public.apiBase}${url}`;
      const data = await $fetch<T>(fullUrl, {
        ...options,
        headers: {
          ...options?.headers,
          Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`,
        },
      });
      return { data, error: null };
    } catch (error: any) {
      return { data: null as unknown as T, error: error.message };
    }
  };

  const createData = async <T>(url: string, body: any, options?: FetchOptions): Promise<ApiResponse<T>> => {
    try {
      const fullUrl = `${config.public.apiBase}${url}`;
      const data = await $fetch<T>(fullUrl, {
        method: 'POST',
        body,
        ...options,
        headers: {
          ...options?.headers,
          Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`,
        },
      });
      return { data, error: null };
    } catch (error: any) {
      return { data: null as unknown as T, error: error.message };
    }
  };

  const updateData = async <T>(url: string, body: any, options?: FetchOptions): Promise<ApiResponse<T>> => {
    try {
      const fullUrl = `${config.public.apiBase}${url}`;
      const data = await $fetch<T>(fullUrl, {
        method: 'PUT',
        body,
        ...options,
        headers: {
          ...options?.headers,
          Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`,
        },
      });
      return { data, error: null };
    } catch (error: any) {
      return { data: null as unknown as T, error: error.message };
    }
  };

  const deleteData = async <T>(url: string, options?: FetchOptions): Promise<ApiResponse<T>> => {
    try {
      const fullUrl = `${config.public.apiBase}${url}`;
      const data = await $fetch<T>(fullUrl, {
        method: 'DELETE',
        ...options,
        headers: {
          ...options?.headers,
          Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`,
        },
      });
      return { data, error: null };
    } catch (error: any) {
      return { data: null as unknown as T, error: error.message };
    }
  };

  return {
    fetchData,
    createData,
    updateData,
    deleteData,
  };
}
