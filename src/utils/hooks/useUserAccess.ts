import { useNavigate } from "react-router";
import { useAppSelector } from "./useAppDispatch";
import { useEffect, useRef } from "react";

export function useUserAccess() {
  const navigate = useNavigate();

  const {
    decodedToken,
    isAuthorized,
    isLoading: isAuthLoading,
  } = useAppSelector((state) => state.authReducer);

  const firstRender = useRef<boolean>(true);

  useEffect(() => {
    if (firstRender) {
      firstRender.current = false;
      return;
    }
    
    if ((!isAuthorized || !decodedToken) && !isAuthLoading) {
      navigate("/");
    }
  }, [isAuthorized, decodedToken, isAuthLoading])

  
}