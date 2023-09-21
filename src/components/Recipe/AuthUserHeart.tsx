import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/useAppDispatch";
import { addToFavoriteRecipes } from "../../utils/api/addToFavoriteRecipes";
import { deleteFromFavoriteRecipes } from "../../utils/api/deleteFromFavoriteRecipes";
import { fetchUserLikes } from "../../redux/actions/UserActions";

import "./Recipe.scss";
import { Tooltip } from "antd";

interface Props {
  likesCount: number;
}

const AuthUserHeart = ({ likesCount }: Props) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { likes } = useAppSelector((state) => state.userReducer);
  const { recipe } = useAppSelector((state) => state.selectedRecipeReducer);
  const { decodedToken, token } = useAppSelector((state) => state.authReducer);

  const addToFavorite = async () => {
    if (!decodedToken || !recipe) return;
    const isAdded = await addToFavoriteRecipes(decodedToken.id, recipe.id, token);
    dispatch(fetchUserLikes(decodedToken.id, token));
    setIsLiked(isAdded);
  };

  const deleteFromFavorite = async () => {
    if (!decodedToken || !recipe) return;
    const isDeleted = await deleteFromFavoriteRecipes(decodedToken.id, recipe.id, token);
    dispatch(fetchUserLikes(decodedToken.id, token));

    /** Тут мы убираем выделение лайка, при успешном запросе, иначе оставлем лайк */
    setIsLiked(!isDeleted);
  };

  /** Функция проверки, находится ли данный рецепт в избранном */
  const checkisLiked = () => {
    if (recipe && likes.includes(recipe.id.toString())) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  };

  useEffect(() => {
    checkisLiked();
  }, [likes]);
  return (
    <Tooltip title={likesCount}>
      <div className="recipe-page-like">
        {!isLiked && <HeartOutlined onClick={addToFavorite} />}
        {isLiked && <HeartFilled className="liked" onClick={deleteFromFavorite} />}
      </div>
    </Tooltip>
  );
};

export default AuthUserHeart;
