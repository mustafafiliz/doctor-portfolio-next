'use client';

import { useState, useCallback } from 'react';
import { ApiError } from '@/lib/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (...args: unknown[]) => Promise<T | null>;
  setData: (data: T | null) => void;
  reset: () => void;
}

export function useApi<T>(
  apiFunction: (...args: unknown[]) => Promise<T>,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: string) => void;
  }
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: unknown[]): Promise<T | null> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const result = await apiFunction(...args);
        setState({ data: result, loading: false, error: null });
        options?.onSuccess?.(result);
        return result;
      } catch (err) {
        const errorMessage = err instanceof ApiError 
          ? err.message 
          : 'Bir hata oluştu';
        
        setState((prev) => ({ ...prev, loading: false, error: errorMessage }));
        options?.onError?.(errorMessage);
        return null;
      }
    },
    [apiFunction, options]
  );

  const setData = useCallback((data: T | null) => {
    setState((prev) => ({ ...prev, data }));
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    setData,
    reset,
  };
}

// Hook for mutations (POST, PUT, DELETE)
interface UseMutationReturn<T, TVariables> {
  mutate: (variables: TVariables) => Promise<T | null>;
  data: T | null;
  loading: boolean;
  error: string | null;
  reset: () => void;
}

export function useMutation<T, TVariables = void>(
  mutationFunction: (variables: TVariables) => Promise<T>,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: string) => void;
  }
): UseMutationReturn<T, TVariables> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const mutate = useCallback(
    async (variables: TVariables): Promise<T | null> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const result = await mutationFunction(variables);
        setState({ data: result, loading: false, error: null });
        options?.onSuccess?.(result);
        return result;
      } catch (err) {
        const errorMessage = err instanceof ApiError 
          ? err.message 
          : 'Bir hata oluştu';
        
        setState((prev) => ({ ...prev, loading: false, error: errorMessage }));
        options?.onError?.(errorMessage);
        return null;
      }
    },
    [mutationFunction, options]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    mutate,
    reset,
  };
}






