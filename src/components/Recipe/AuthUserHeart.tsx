import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useState } from "react";
import "./Recipe.scss"

const AuthUserHeart = () => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const addToFavorite = () => {
    setIsLiked(!isLiked);
};
  return (
    <div className="recipe-page-like" onClick={addToFavorite}>
      {!isLiked && <HeartOutlined />}
      {isLiked && <HeartFilled className="liked" />}
    </div>
  );
};

export default AuthUserHeart;
