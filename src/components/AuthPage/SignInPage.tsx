import { useEffect } from "react";
import { AntFormFieldsFailed, AuthFormValues } from "../../interfaces";
import { loginUser } from "../../redux/reducers/ActionCreators";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/useAppDispatch";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router";
import { message } from "antd";
import { authSlice } from "../../redux/reducers/AuthSlice";

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthorized, isLoading, error } = useAppSelector(
    (state) => state.authReducer
  );

  const onFinish = (data: AuthFormValues) => {
    dispatch(loginUser(data));
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
    <>
      <AuthForm
        isLoading={isLoading}
        buttonLabel="Войти"
        title="Авторизация"
        redirectLink={{ to: "/registration", label: "Зарегистрироваться" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      />
    </>
  );
};

export default SignInPage;
