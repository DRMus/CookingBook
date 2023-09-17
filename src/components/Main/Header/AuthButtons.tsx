import { Space, Button } from "antd";
import "./CBHeader.scss";
import { useLocation, useNavigate } from "react-router";

const AuthButtons = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const toSignIn = () => {
    navigate("/login", { state: location.pathname + location.search });
  };

  const toSignUp = () => {
    navigate("/registration", { state: location.pathname + location.search });
  };

  return (
    <Space className="header-container-auth-buttons">
      <Button size="middle" ghost style={{ border: "none" }} onClick={toSignUp}>
        Регистрация
      </Button>
      <Button type="primary" size="middle" onClick={toSignIn}>
        Вход
      </Button>
    </Space>
  );
};

export default AuthButtons;
