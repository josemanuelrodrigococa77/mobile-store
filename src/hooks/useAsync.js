import { useEffect, useState } from "react";

export function useAsync(fetchFn) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    queueMicrotask(() => {
      if (!cancelled) {
        setState((currentState) => ({
          ...currentState,
          loading: true,
          error: null,
        }));
      }
    });

    Promise.resolve()
      .then(fetchFn)
      .then((data) => {
        if (!cancelled) {
          setState({ data, loading: false, error: null });
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setState({ data: null, loading: false, error });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [fetchFn]);

  return state;
}
