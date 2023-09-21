import { HeartOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import { Link } from "react-router-dom";
import { usePathLocation } from "../../utils/hooks/usePathLocation";

import "./Recipe.scss";

const PopoverContent = () => {
  const pathLocation = usePathLocation();
  return (
    <div>
      Для совершения данного действия требуется{" "}
      <Link to="/login" state={pathLocation}>
        авторизация
      </Link>
    </div>
  );
};

const NotAuthUserHeart = () => {
  return (
    <Popover content={<PopoverContent/>} trigger="click">
      <div className="recipe-page-like">
        <HeartOutlined />
      </div>
    </Popover>
  );
};

export default NotAuthUserHeart;
