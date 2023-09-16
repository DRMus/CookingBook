import { Space, Button } from "antd";
import "./CBHeader.scss";

const AuthButtons = () => {
  return (
    <Space className="header-container-auth-buttons">
      <Button size="middle" ghost style={{ border: "none" }}>
        Регистрация
      </Button>
      <Button type="primary" size="middle">
        Вход
      </Button>
    </Space>
  );
};

export default AuthButtons;
