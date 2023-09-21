import { HeartOutlined } from "@ant-design/icons";
import { Popover, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { usePathLocation } from "../../utils/hooks/usePathLocation";

import "./Recipe.scss";

interface Props {
  likesCount: number;
}

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

const NotAuthUserHeart = ({ likesCount }: Props) => {
  return (
    <Popover content={<PopoverContent />} trigger="click">
      <Tooltip title={likesCount}>
        <div className="recipe-page-like">
          <HeartOutlined />
        </div>
      </Tooltip>
    </Popover>
  );
};

export default NotAuthUserHeart;
