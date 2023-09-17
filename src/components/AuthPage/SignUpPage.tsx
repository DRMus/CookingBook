import { AuthFormValues, AntFormFieldsFailed } from '../../interfaces';
import AuthForm from './AuthForm';

const SignUpPage = () => {
  const onFinish = (data: AuthFormValues) => {
    console.log("Done: ", data);
  };
  const onFinishFailed = (data: AntFormFieldsFailed<AuthFormValues>) => {
    console.log("Failed: ", data);
  };
  return (
    <AuthForm
      buttonLabel="Зарегистрироваться"
      title="Регистрация"
      redirectLink={{ to: "/login", label: "Войти в аккаунт" }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    />
  );
}

export default SignUpPage