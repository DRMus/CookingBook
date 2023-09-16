import { useState } from "react";
import { Input, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import AuthButtons from "./AuthButtons";

import "./CBHeader.scss";
import UserActionButtons from "./UserActionButtons";


const CBHeader = () => {

  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);

  return (
    <Header className="header-container">
      <Space className="header-container-search">
        <Input.Search placeholder="Поиск" className="header-container-search-input"/>
      </Space>
      {!isAuthorized && <AuthButtons/>}
      {isAuthorized && <UserActionButtons/>}
    </Header>
  );
};

export default CBHeader;
