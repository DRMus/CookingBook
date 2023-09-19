import { useEffect } from "react";
import { AntFormFieldsFailed, AuthFormValues } from "../../interfaces";
import { loginUser } from "../../redux/reducers/ActionCreators";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/useAppDispatch";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router";

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthorizated, isLoading, error } = useAppSelector(
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
    if (isAuthorizated) {
      redirectToHomePage();
    }
  }, [isAuthorizated]);
  return (
    <AuthForm
      isLoading={isLoading}
      buttonLabel="Войти"
      title="Авторизация"
      redirectLink={{ to: "/registration", label: "Зарегистрироваться" }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    />
  );
};

export default SignInPage;
