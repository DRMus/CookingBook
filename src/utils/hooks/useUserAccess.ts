import { useNavigate } from "react-router";
import { useAppSelector } from "./useAppDispatch";
import { useEffect, useRef } from "react";

/** Хук проверки авторизации пользователя и возможности его доступа к данной странице */
export function useUserAccess() {
  const navigate = useNavigate();

  const {
    decodedToken,
    isAuthorized,
    isLoading: isAuthLoading,
  } = useAppSelector((state) => state.authReducer);

  /** Переменная первого рендера.
   *  Используется для предотвращенния редирект пользователя,
   *  пока мы не проверили его авторизацию
   */
  const firstRender = useRef<boolean>(true);

  useEffect(() => {
    if (firstRender) {
      firstRender.current = false;
      return;
    }

    if ((!isAuthorized || !decodedToken) && !isAuthLoading) {
      navigate("/");
    }
  }, [isAuthorized, decodedToken, isAuthLoading]);
}
