import { Space } from "antd";
import { BookOutlined, HeartOutlined, LogoutOutlined } from "@ant-design/icons";
import ClickableIcon from "../../ui/ClickableIcon";

const UserActionButtons = () => {
  return (
    <Space style={{ color: "#adadad" }} size={"middle"}>
      <ClickableIcon icon={<HeartOutlined />} title="Избранные" style={{border: "none"}}/>
      <ClickableIcon icon={<BookOutlined />} title="Мои рецепты" style={{border: "none"}}/>
      <ClickableIcon icon={<LogoutOutlined />} title="Выход" danger />
    </Space>
  );
};

export default UserActionButtons;
