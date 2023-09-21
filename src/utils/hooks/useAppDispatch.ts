import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useSelector } from "react-redux";

/** Хук для использования типизированного диспатча и для работы с thunk */
export const useAppDispatch = () => useDispatch<AppDispatch>();
/** Хук для использования типизированного селектора */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
