import { useEffect } from "react";
import { AuthFormValues } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/useAppDispatch";
import AuthForm from "./AuthForm";
import { useLocation, useNavigate } from "react-router";
import { message } from "antd";
import { authSlice } from "../../redux/reducers/AuthSlice";
import { loginUser } from "../../redux/actions/AuthActions";

const SignInPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();
  const { isAuthorized, isLoading, error } = useAppSelector(
    (state) => state.authReducer
  );

  const onFinish = (data: AuthFormValues) => {
    dispatch(loginUser(data));
    console.log("Done: ", data);
  };

  const redirectToHomePage = () => {
    navigate(location.state || "/");
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
      />
    </>
  );
};

export default SignInPage;
