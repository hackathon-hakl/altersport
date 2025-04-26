"use client";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface FetchOptions<TData = unknown> extends RequestInit {
  method?: RequestMethod;
  data?: TData;
}

/**
 * Wrapper around fetch for making API requests
 */
export async function apiClient<TResponse, TData = unknown>(
  endpoint: string,
  options: FetchOptions<TData> = {}
): Promise<TResponse> {
  const { method = "GET", data, ...customConfig } = options;
  
  // Ensure the API URL always has a leading slash
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  
  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...customConfig.headers,
    },
    ...customConfig,
  };

  // Add request body if data is provided
  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return Promise.reject(
        new Error(
          errorData.message || `API error: ${response.status} ${response.statusText}`
        )
      );
    }

    // For responses with no content
    if (response.status === 204) {
      return {} as TResponse;
    }

    // Parse JSON response
    return await response.json();
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * API client methods
 */
export const api = {
  get: <TResponse>(endpoint: string, options?: Omit<FetchOptions, "method" | "data">) =>
    apiClient<TResponse>(endpoint, { ...options, method: "GET" }),
    
  post: <TResponse, TData = unknown>(endpoint: string, data: TData, options?: Omit<FetchOptions<TData>, "method" | "data">) =>
    apiClient<TResponse, TData>(endpoint, { ...options, method: "POST", data }),
    
  put: <TResponse, TData = unknown>(endpoint: string, data: TData, options?: Omit<FetchOptions<TData>, "method" | "data">) =>
    apiClient<TResponse, TData>(endpoint, { ...options, method: "PUT", data }),
    
  patch: <TResponse, TData = unknown>(endpoint: string, data: TData, options?: Omit<FetchOptions<TData>, "method" | "data">) =>
    apiClient<TResponse, TData>(endpoint, { ...options, method: "PATCH", data }),
    
  delete: <TResponse>(endpoint: string, options?: Omit<FetchOptions, "method">) =>
    apiClient<TResponse>(endpoint, { ...options, method: "DELETE" }),
}; 