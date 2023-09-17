import { useState } from "react";
import { Header } from "antd/es/layout/layout";
import AuthButtons from "./AuthButtons";

import "./CBHeader.scss";
import UserActionButtons from "./UserActionButtons";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router";

const CBHeader = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <Header className="header-container">
      <div className="header-container-title">
        <Title
          level={2}
          className="header-container-title-text"
          onClick={goToHomePage}
        >
          Cooking Book
        </Title>
      </div>
      {!isAuthorized && <AuthButtons />}
      {isAuthorized && <UserActionButtons />}
    </Header>
  );
};

export default CBHeader;
