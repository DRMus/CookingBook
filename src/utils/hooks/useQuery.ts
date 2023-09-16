import { useCallback, useMemo } from "react";
import { useLocation } from "react-router";

export type QueryObject = {
  [key: string]: string;
};

export function useQuery<T>(): T | QueryObject {
  const location = useLocation();

  const parseSearchString = useCallback((search: string): T | QueryObject => {
    const splitedSearch: string[] = search.replace("?", "").split("&");
    const queryParams: T | QueryObject = splitedSearch.reduce((acum, str) => {
      const [key, value] = str.split("=");
      acum[key] = value;
      return acum;
    }, {} as QueryObject);

    return queryParams;
  }, []);

  const queryObject = useMemo(() => parseSearchString(location.search), [location]);

  return queryObject;
}
