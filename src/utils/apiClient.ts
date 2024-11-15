import type { ApiResponse } from "./types";
const BASE_URL = import.meta.env.API_BASE_URL;


interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  headers?: Record<string, string>;
}

export async function apiClient<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body = null, headers = {} } = options;
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
  };

  console.log('BASE_URL:', BASE_URL);

  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, config);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    
    // Intentamos analizar la respuesta como JSON
    try {
      return await response.json() as T;
    } catch (error) {
      throw new Error('Error al analizar el JSON de la respuesta');
    }
    
  } catch (error) {
    console.error('Error en la llamada a la API:', error);
    throw error;
  }
}

/* Métodos para obtener los datos Metodo Get */
export const getData = async (): Promise<ApiResponse> => {
    return await apiClient<ApiResponse>('products');
  };

/* Metodo "Post" usado para crear nuevos productos json */
export async function postData<T>(endpoint: string, body: any): Promise<T> {
    return apiClient<T>(endpoint, {
      method: 'POST',
      body,
    });
  }
/* metodo "Put" utilizado para actualizar  */
export async function putData<T>(endpoint: string, body: any): Promise<T> {
    return apiClient<T>(endpoint, {
      method: 'PUT',
      body,
    });
  }
/* Metodo "Patch"  usado para actualizar de forma parcial*/
export async function patchData<T>(endpoint: string, body: any): Promise<T> {
    return apiClient<T>(endpoint, {
      method: 'PATCH',
      body,
    });
  }
/* Metodo "Delete" usado para eliminar tablas de la base de datos uso con cuidado */
export async function deleteData<T>(endpoint: string): Promise<T> {
    return apiClient<T>(endpoint, {
      method: 'DELETE',
    });
  }
