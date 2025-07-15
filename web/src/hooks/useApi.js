import { useEffect, useRef, useState } from "react";
import { useAuth } from "../AuthContext";

const cache = {};

export function useApi(resource, options = {}) {
  const { token } = useAuth();
  const [data, setData] = useState(cache[resource]);
  const [loading, setLoading] = useState(!cache[resource]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    if (cache[resource]) {
      setData(cache[resource]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    fetch(resource, {
      ...options,
      headers: {
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((json) => {
        if (!ignore) {
          cache[resource] = json;
          setData(json);
        }
      })
      .catch((err) => {
        if (!ignore) setError(err);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => { ignore = true; };
  }, [resource, token]);

  return { data, loading, error };
}
