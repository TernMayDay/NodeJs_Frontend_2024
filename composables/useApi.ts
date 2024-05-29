import { type FetchOptions, $fetch } from 'ohmyfetch';

// 定義返回類型的泛型接口
interface ApiResponse<T> {
  data: T;
  error: string | null;
}

export function useApi() {
  const { public: { apiBase } } = useRuntimeConfig()

  async function fetchData<T>(url: string, options: FetchOptions<"json"> = {}): Promise<ApiResponse<T>> {
    try {
      const fullUrl = `${apiBase}${url}`;
      const data = await $fetch<T>(fullUrl, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`,
        },
      });
      return { data, error: null };
    } catch (error) {
      if (typeof error === 'string') {
        return { data: null as unknown as T, error };
      } else if (error instanceof Error) {
        return { data: null as unknown as T, error: error.message };
      } else {
        return { data: null as unknown as T, error: 'Unknown error occurred' };
      }
    }
  }

  async function createData<T>(url: string, body: any, options: FetchOptions<"json"> = {}): Promise<ApiResponse<T>> {
    try {
      const fullUrl = `${apiBase}${url}`;
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
      if (typeof error === 'string') {
        return { data: null as unknown as T, error };
      } else if (error instanceof Error) {
        return { data: null as unknown as T, error: error.message };
      } else {
        return { data: null as unknown as T, error: 'Unknown error occurred' };
      }
    }
  }

  async function updateData<T>(url: string, body: any, options: FetchOptions<"json"> = {}): Promise<ApiResponse<T>> {
    try {
      const fullUrl = `${apiBase}${url}`;
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
      if (typeof error === 'string') {
        return { data: null as unknown as T, error };
      } else if (error instanceof Error) {
        return { data: null as unknown as T, error: error.message };
      } else {
        return { data: null as unknown as T, error: 'Unknown error occurred' };
      }
    }
  }

  async function deleteData<T>(url: string, options: FetchOptions<"json"> = {}): Promise<ApiResponse<T>> {
    try {
      const fullUrl = `${apiBase}${url}`;
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
       if (typeof error === 'string') {
        return { data: null as unknown as T, error };
      } else if (error instanceof Error) {
        return { data: null as unknown as T, error: error.message };
      } else {
        if (typeof error === 'string') {
          return { data: null as unknown as T, error };
        } else if (error instanceof Error) {
          return { data: null as unknown as T, error: error.message };
        } else {
          return { data: null as unknown as T, error: 'Unknown error occurred' };
        }
    }
  }
  }

  return { fetchData, createData, updateData, deleteData };
}
