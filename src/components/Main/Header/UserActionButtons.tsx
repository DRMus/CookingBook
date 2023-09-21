import { Space } from "antd";
import { BookOutlined, HeartOutlined, LogoutOutlined } from "@ant-design/icons";
import ClickableIcon from "../../ui/ClickableIcon";
import { useAppDispatch } from "../../../utils/hooks/useAppDispatch";
import { logoutUser } from "../../../redux/reducers/ActionCreators";
import { useNavigate } from "react-router";

const UserActionButtons = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const goToFavorite = () => {
    navigate("/favorites");
  };

  const goToMyRecipes = () => {
    navigate("/my");
  };

  const logout = () => {
    dispatch(logoutUser());
  };
  return (
    <Space style={{ color: "#adadad" }} size={"middle"}>
      <ClickableIcon
        icon={<HeartOutlined />}
        title="Избранные"
        style={{ border: "none" }}
        onClick={goToFavorite}
      />
      <ClickableIcon
        icon={<BookOutlined />}
        title="Мои рецепты"
        style={{ border: "none" }}
        onClick={goToMyRecipes}
      />
      <ClickableIcon icon={<LogoutOutlined />} title="Выход" danger onClick={logout} />
    </Space>
  );
};

export default UserActionButtons;
