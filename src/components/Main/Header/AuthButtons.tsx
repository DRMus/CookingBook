import { Space, Button } from "antd";
import "./CBHeader.scss";
import { useNavigate } from "react-router";
import { usePathLocation } from "../../../utils/hooks/usePathLocation";

const AuthButtons = () => {
  const navigate = useNavigate();
  const pathLocation = usePathLocation();

  const toSignIn = () => {
    navigate("/login", { state: pathLocation });
  };

  const toSignUp = () => {
    navigate("/registration", { state: pathLocation });
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
