import { Header } from "antd/es/layout/layout";
import AuthButtons from "./AuthButtons";

import "./CBHeader.scss";
import UserActionButtons from "./UserActionButtons";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../../utils/hooks/useAppDispatch";

const CBHeader = () => {
  const navigate = useNavigate();

  const { isAuthorizated } = useAppSelector((state) => state.authReducer);

  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <Header className="header-container">
      <div className="header-container-title">
        <Title level={2} className="header-container-title-text" onClick={goToHomePage}>
          Cooking Book
        </Title>
      </div>
      {!isAuthorizated && <AuthButtons />}
      {isAuthorizated && <UserActionButtons />}
    </Header>
  );
};

export default CBHeader;
