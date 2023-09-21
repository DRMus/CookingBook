import { useEffect, useState } from "react";
import RecipesTable from "../common/RecipesTable";
import { useAppSelector } from "../../utils/hooks/useAppDispatch";
import { IRecipe } from "../../interfaces/IRecipe";
import { getFavorites } from "../../utils/api/getFavorites";
import { useUserAccess } from "../../utils/hooks/useUserAccess";

const FavoriteRecipes = () => {
  useUserAccess();

  const { token, decodedToken } = useAppSelector((state) => state.authReducer);

  const [isTableLoading, setIsTableLoading] = useState<boolean>(true);
  const [favoriteRecipesList, setFavoriteRecipesList] = useState<IRecipe[]>([]);

  const getFavoriteRecipes = async () => {
    if (!decodedToken) return;

    setIsTableLoading(true);
    const response = await getFavorites(decodedToken.id, token);
    setFavoriteRecipesList(response || []);
    setIsTableLoading(false);
  };

  useEffect(() => {
    getFavoriteRecipes();
  }, [decodedToken]);

  return (
    <RecipesTable
      title={() => "Избранное"}
      recipesList={favoriteRecipesList}
      isLoading={isTableLoading}
      isSiderBrokeen={true}
    />
  );
};

export default FavoriteRecipes;
