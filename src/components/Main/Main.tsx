import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";

import CBFooter from "./Footer/CBFooter";
import CBHeader from "./Header/CBHeader";

import "./Main.scss";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <Layout className="main-layout">
      <CBHeader />

      <Content className="main-layout-container">
        <Layout className="container-layout" hasSider>
          <Outlet/>
        </Layout>
      </Content>

      <CBFooter />
    </Layout>
  );
};

export default Main;
