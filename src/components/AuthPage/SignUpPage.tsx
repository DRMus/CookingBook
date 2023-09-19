import { useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthFormValues, AntFormFieldsFailed } from "../../interfaces";
import { registrateUser } from "../../redux/reducers/ActionCreators";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/useAppDispatch";
import AuthForm from "./AuthForm";
import { message } from "antd";
import { authSlice } from "../../redux/reducers/AuthSlice";

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

  const onFinishFailed = (data: AntFormFieldsFailed<AuthFormValues>) => {
    console.log("Failed: ", data);
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
      onFinishFailed={onFinishFailed}
    />
  );
};

export default SignUpPage;
