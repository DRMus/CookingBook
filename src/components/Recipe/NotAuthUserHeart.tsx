import { HeartOutlined } from "@ant-design/icons";
import { Popover } from "antd";

const NotAuthUserHeart = () => {
  return (
    <Popover title="Вы не авторизованы!" trigger="click">
      <div className="recipe-page-like">
        <HeartOutlined />
      </div>
    </Popover>
  );
};

export default NotAuthUserHeart;
