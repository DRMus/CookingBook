import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/useAppDispatch";
import { addToFavoriteRecipes } from "../../utils/api/addToFavoriteRecipes";
import { fetchUserLikes } from "../../redux/reducers/ActionCreators";
import { deleteFromFavoriteRecipes } from "../../utils/api/deleteFromFavoriteRecipes";

import "./Recipe.scss";

const AuthUserHeart = () => {
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
    setIsLiked(!isDeleted);
  };

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
    <div className="recipe-page-like">
      {!isLiked && <HeartOutlined onClick={addToFavorite} />}
      {isLiked && <HeartFilled className="liked" onClick={deleteFromFavorite} />}
    </div>
  );
};

export default AuthUserHeart;
