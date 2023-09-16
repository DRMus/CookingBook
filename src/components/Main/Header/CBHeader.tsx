import { useState } from "react";
import { Header } from "antd/es/layout/layout";
import AuthButtons from "./AuthButtons";

import "./CBHeader.scss";
import UserActionButtons from "./UserActionButtons";


const CBHeader = () => {

  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);

  return (
    <Header className="header-container">
      {!isAuthorized && <AuthButtons/>}
      {isAuthorized && <UserActionButtons/>}
    </Header>
  );
};

export default CBHeader;
