import { useLocation } from "react-router";

/** Хук для создания строки path.
 *  Используется для корректного редиректа со следующей страницы */
export function usePathLocation() {
  const location = useLocation();

  return location.pathname + location.search;
}
