import axios from "../../core/axios";
import { AuthFormValues } from "../../interfaces";
import { authSlice } from "../reducers/AuthSlice";
import { AppDispatch } from "../store";
import Cookies from "js-cookie";

/** Action регистрации пользователя */
export const registrateUser = (data: AuthFormValues) => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.authPending());

    const response = await axios.post<{ token: string }>("/auth/registration", data);

    const { token } = response.data;
    Cookies.set("token", token, { expires: new Date().setHours(5) });
    dispatch(authSlice.actions.authSuccess(token));
  } catch (e: any) {
    dispatch(authSlice.actions.authFailed(e.response.data.message));
  }
};

/** Action авторизации пользователя */
export const loginUser = (data: AuthFormValues) => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.authPending());

    const response = await axios.post<{ token: string }>("/auth/login", data);

    const { token } = response.data;
    Cookies.set("token", token, { expires: new Date().setHours(5) });
    dispatch(authSlice.actions.authSuccess(token));
  } catch (e: any) {
    dispatch(authSlice.actions.authFailed(e.response.data.message));
  }
};

/** Action выхода пользователя */
export const logoutUser = () => async (dispatch: AppDispatch) => {
  Cookies.remove("token");
  dispatch(authSlice.actions.authNotAuthorizated());
};

/** Action проверки токена пользователя */
export const verifyUser = () => async (dispatch: AppDispatch) => {
  try {
    const token = Cookies.get("token");
    if (!token) {
      dispatch(authSlice.actions.authNotAuthorizated());
      return;
    }
    dispatch(authSlice.actions.authSuccess(token));
    await axios.get<boolean>("/auth/verify", {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (e: any) {
    Cookies.remove("token");
    dispatch(authSlice.actions.authNotAuthorizated());
  }
};