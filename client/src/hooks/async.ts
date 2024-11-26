import { useCallback, useState } from "react";

export type AsyncStatuses = "idle" | "pending" | "success" | "error";

export interface UseAsyncReturnType<T, E> {
  status: AsyncStatuses;
  value?: T;
  error?: E;
}

type UseAsyncWrappedFunctResult<T, E> = Promise<{ result: T; error: E }>;

const useAsync = <T = any, A extends any[] = [], E = Error>(
  asyncFunction: (...arg: A) => Promise<T>,
): UseAsyncReturnType<T, E> & {
  execute: (...args: A) => UseAsyncWrappedFunctResult<T, E>;
} => {
  const [status, setStatus] = useState<AsyncStatuses>("idle");
  const [value, setValue] = useState<T>();
  const [error, setError] = useState<E>();
  const execute = useCallback<(...args: A) => UseAsyncWrappedFunctResult<T, E>>(
    async (...args: A) => {
      setStatus("pending");
      setValue(undefined);
      setError(undefined);
      return (await asyncFunction(...args)
        .then((response: any) => {
          setValue(response);
          setStatus("success");
          return { result: response, error: null };
        })
        .catch((error: any) => {
          console.log(error);
          setError(error);
          setStatus("error");
          return { result: null, error };
        })) as { result: T; error: E };
    },
    [asyncFunction],
  );
  return { execute, status, value, error };
};

export default useAsync;
