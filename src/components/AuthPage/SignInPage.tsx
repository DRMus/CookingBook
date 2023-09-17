import { Button, Form, Input, Layout, Space } from "antd";
import "./SignInPage.scss";
import Title from "antd/es/typography/Title";

const SignInPage = () => {
  return (
    <Layout className="login-page-main">
      <section className="login-page-content">
        <div className="login-page-content-title">
          <Title level={3}>Авторизация</Title>
        </div>
        <Form>

          <Form.Item name="username">
            <Input placeholder="Логин" size="large" />
          </Form.Item>
          <Form.Item name="password">
            <Input type="password" placeholder="Пароль" size="large" />
          </Form.Item>

          <Space className="login-page-content-buttons">
            <Form.Item className="login-page-content-buttons-item">
              <Button size="large" htmlType="button">
                Назад
              </Button>
            </Form.Item>
            <Form.Item className="login-page-content-buttons-item">
              <Button type="primary" size="large">
                Войти
              </Button>
            </Form.Item>
          </Space>

        </Form>
      </section>
    </Layout>
  );
};

export default SignInPage;
