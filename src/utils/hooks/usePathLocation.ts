import { useLocation } from "react-router";

export function usePathLocation() {
  const location = useLocation();

  return location.pathname + location.search
}