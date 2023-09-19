import { useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthFormValues, AntFormFieldsFailed } from "../../interfaces";
import { registrateUser } from "../../redux/reducers/ActionCreators";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/useAppDispatch";
import AuthForm from "./AuthForm";

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthorizated, isLoading, error } = useAppSelector(
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
    if (isAuthorizated) {
      redirectToHomePage();
    }
  }, [isAuthorizated]);
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
