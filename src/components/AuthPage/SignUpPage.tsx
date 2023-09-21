import { useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthFormValues } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/useAppDispatch";
import AuthForm from "./AuthForm";
import { message } from "antd";
import { authSlice } from "../../redux/reducers/AuthSlice";
import { registrateUser } from "../../redux/actions/AuthActions";

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthorized, isLoading, error } = useAppSelector(
    (state) => state.authReducer
  );

  const onFinish = (data: AuthFormValues) => {
    dispatch(registrateUser(data));
    console.log("Done: ", data);
  };

  const redirectToHomePage = () => {
    navigate("/");
  };

  useEffect(() => {
    if (isAuthorized) {
      redirectToHomePage();
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (error && !isLoading) {
      message.error(error);

      dispatch(authSlice.actions.authNotAuthorizated());
    }
  }, [error, isLoading]);
  return (
    <AuthForm
      isLoading={isLoading}
      buttonLabel="Зарегистрироваться"
      title="Регистрация"
      redirectLink={{ to: "/login", label: "Войти в аккаунт" }}
      onFinish={onFinish}
    />
  );
};

export default SignUpPage;
