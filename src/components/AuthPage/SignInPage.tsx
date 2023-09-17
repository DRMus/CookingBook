import { AntFormFieldsFailed, AuthFormValues } from "../../interfaces";
import AuthForm from "./AuthForm";

const SignInPage = () => {
  const onFinish = (data: AuthFormValues) => {
    console.log("Done: ", data);
  };
  const onFinishFailed = (data: AntFormFieldsFailed<AuthFormValues>) => {
    console.log("Failed: ", data);
  };
  return (
    <AuthForm
      buttonLabel="Войти"
      title="Авторизация"
      redirectLink={{ to: "/registration", label: "Зарегистрироваться" }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    />
  );
};

export default SignInPage;
