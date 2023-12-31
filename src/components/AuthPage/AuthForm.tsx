import { Layout, Input, Space, Button, Form } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AntFormFieldsFailed, AuthFormValues } from "../../interfaces";
import Title from "antd/es/typography/Title";

import "./AuthForm.scss";

interface Props {
  title: string;
  redirectLink: { to: string; label: string };
  buttonLabel: string;
  isLoading: boolean;
  onFinish: (value: AuthFormValues) => void;
  onFinishFailed?: (value: AntFormFieldsFailed<AuthFormValues>) => void;
}

const AuthForm = ({
  buttonLabel,
  isLoading,
  redirectLink,
  title,
  onFinish,
  onFinishFailed,
}: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  /** Возвращение на прошлую страницу.
   *  Получается из стейта из-за вероятности пользователя
   *  несколько раз переходить со страницы авторизации на регистрацию
   */
  const goBack = () => {
    navigate(location.state);
  };

  return (
    <Layout className="login-page-main">
      <section className="login-page-content">
        <div className="login-page-content-title">
          <Title level={3}>{title}</Title>
        </div>
        <Form<AuthFormValues> layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            name="username"
            label="Логин"
            className="login-page-content-input"
            rules={[{ required: true, message: "Это обязательное поле" }]}
          >
            <Input placeholder="Логин" size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Пароль"
            className="login-page-content-input"
            rules={[{ required: true, message: "Это обязательное поле" }]}
          >
            <Input type="password" placeholder="Пароль" size="large" />
          </Form.Item>

          <Space className="login-page-content-buttons" direction="vertical">
            <Form.Item className="login-page-content-buttons-item">
              <Button type="primary" size="large" htmlType="submit" loading={isLoading}>
                {buttonLabel}
              </Button>
            </Form.Item>
            <Form.Item className="login-page-content-buttons-item">
              <Button size="large" htmlType="button" onClick={goBack} >
                Назад
              </Button>
            </Form.Item>
          </Space>

          <Space className="login-page-content-link" align="center" direction="vertical">
            <Link to={redirectLink.to} state={location.state}>
              {redirectLink.label}
            </Link>
          </Space>
        </Form>
      </section>
    </Layout>
  );
};

export default AuthForm;
